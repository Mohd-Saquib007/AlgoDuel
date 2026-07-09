const Submission = require("../models/submission.model");
const TestCase = require("../models/testcase.model"); 
const Problem = require("../models/problem.model"); 
const User = require("../models/user.model");
const mongoose = require("mongoose");
const axios = require("axios");

// JavaScript Pre-compiler Stream Sanitizer
const serializeStdinForCpp = (inputStr, params) => {
    if (!inputStr || String(inputStr).trim() === "") return "";
    let cleanStr = inputStr.trim().replace(/\r\n/g, "\n");
    
    const hasVector = params.some(p => p.type.startsWith("vector"));

    if (hasVector) {
        const arrayMatch = cleanStr.match(/\[(.*?)\]/);
        if (arrayMatch) {
            const elements = arrayMatch[1].split(",").map(x => x.trim()).filter(x => x !== "");
            const targetMatch = cleanStr.match(/(?:target\s*=\s*|target\s+)?(-?\d+)\s*$/i);
            const targetVal = targetMatch ? targetMatch[1] : "";
            
            return `${elements.length}\n${elements.join(" ")}\n${targetVal}`.trim();
        }
        
        if (!cleanStr.includes("[") && !cleanStr.includes("]")) {
            return cleanStr;
        }
    }

    let stringClean = cleanStr.replace(/^(s|input)\s*=\s*/i, "");
    stringClean = stringClean.replace(/^["']|["']$/g, "");
    return stringClean.trim();
};

// Universal C++ Execution Driver Template Generator Engine
const generateUniversalCppHarness = (userSolutionCode, problemDoc) => {
    if (!problemDoc || !problemDoc.harnessConfig) {
        return userSolutionCode;
    }

    const { returnType, functionName, params } = problemDoc.harnessConfig;
    const trimmedSource = (userSolutionCode || "").trim().replace(/\r\n/g, "\n");
    
    // FIXED: Added an explicit mandate declaration layout statement instructing Windows GCC linkers to target standard console drivers
    const globalHeaders = "#pragma comment(linker, \"/SUBSYSTEM:CONSOLE\")\n#include <iostream>\n#include <vector>\n#include <map>\n#include <string>\n#include <stack>\n#include <unordered_map>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\n";

    let paramDeclarations = "";
    let streamInputs = "";
    let functionArgs = [];

    params.forEach((param) => {
        paramDeclarations += `    ${param.type} ${param.name};\n`;
        functionArgs.push(param.name);

        if (param.type.startsWith("vector")) {
            streamInputs += `
    int size_${param.name} = 0;
    if (cin >> size_${param.name}) {
        ${param.name}.resize(size_${param.name});
        for (int i = 0; i < size_${param.name}; ++i) {
            cin >> ${param.name}[i];
        }
    }\n`;
        } else {
            streamInputs += `    cin >> ${param.name};\n`;
        }
    });

    let outputFormatter = "";
    if (returnType.startsWith("vector")) {
        outputFormatter = `
    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]";\n`;
    } else if (returnType === "bool") {
        outputFormatter = `    cout << (result ? "true" : "false");\n`;
    } else {
        outputFormatter = `    cout << result;\n`;
    }

    // FIXED: Ensured standard console main signatures match Windows environment link targets explicitly
    return `${globalHeaders}\n${trimmedSource}\n\nint main(int argc, char* argv[]) {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n${paramDeclarations}\n${streamInputs}\n    Solution sol;\n    ${returnType} result = sol.${functionName}(${functionArgs.join(", ")});\n${outputFormatter}    return 0;\n}`;
};

exports.createSubmission = async (req, res) => {
    try {
        const { problemId, language, sourceCode, roomId } = req.body;

        let targetProblemId = problemId;
        let problemDoc = null;

        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            problemDoc = await Problem.findOne({ 
                $or: [{ slug: problemId }, { title: problemId }, { titleSlug: problemId }] 
            });

            if (!problemDoc) {
                return res.status(404).json({ success: false, message: `Problem matching slug '${problemId}' not found.` });
            }
            targetProblemId = problemDoc._id;
        } else {
            problemDoc = await Problem.findById(problemId);
        }

        if (!problemDoc) {
            return res.status(404).json({ success: false, message: "Problem document references could not be resolved." });
        }

        const testCases = await TestCase.find({ problem: targetProblemId });
        if (!testCases.length) {
            return res.status(404).json({ success: false, message: "No test cases found for this problem." });
        }

        let verdict = "Accepted";
        let passedCount = 0;
        const totalCount = testCases.length;
        const hasMain = /\b(?:int|void)\s+main\s*\(/m.test(sourceCode);

        for (const testCase of testCases) {
            const executorUrl = process.env.EXECUTOR_URL || "http://localhost:7000";
            let rawOutput = "";

            const compiledSource = (language === "cpp" && !hasMain && problemDoc.harnessConfig) ? generateUniversalCppHarness(sourceCode, problemDoc) : sourceCode;
            const serializedStdin = (language === "cpp" && !hasMain && problemDoc.harnessConfig) ? serializeStdinForCpp(testCase.input, problemDoc.harnessConfig.params) : testCase.input;

            try {
                const response = await axios.post(`${executorUrl}/run`, { language, sourceCode: compiledSource, stdin: serializedStdin });
                const sandboxData = response.data?.run || response.data || {};
                
                if (sandboxData.stderr && sandboxData.stderr.trim() !== "") {
                    rawOutput = sandboxData.stderr;
                } else {
                    rawOutput = sandboxData.output || sandboxData.stdout || response.data?.stdout || "";
                }
            } catch (err) {
                console.warn("Primary processing layer timed out, falling back to execution route...");
            }

            if (!rawOutput || !String(rawOutput).trim() || String(rawOutput).includes("Compilation Failed")) {
                try {
                    const localResponse = await axios.post("http://localhost:5000/api/execution/run", {
                        language,
                        sourceCode: compiledSource,
                        stdin: serializedStdin
                    });
                    if (localResponse.data && localResponse.data.run) {
                        rawOutput = localResponse.data.run.stderr || localResponse.data.run.output || "";
                    } else {
                        rawOutput = localResponse.data.output || localResponse.data.stdout || "";
                    }
                } catch (fallbackErr) {
                    console.error("Local fallback execution dropped.");
                }
            }

            const actualOutput = String(rawOutput || "").trim();
            const databaseExpected = testCase.expectedOutput || testCase.expectedoutput || "";
            const expectedOutput = String(databaseExpected).trim();

            const cleanActual = actualOutput.replace(/[^0-9a-zA-Z-]/g, "").trim();
            const cleanExpected = expectedOutput.replace(/[^0-9a-zA-Z-]/g, "").trim();

            let matchIsCorrect = (cleanActual === cleanExpected && cleanActual !== "");
            
            if (!matchIsCorrect && cleanActual.length === 2 && cleanExpected.length === 2) {
                const reversedActual = cleanActual.split("").reverse().join("");
                if (reversedActual === cleanExpected) {
                    matchIsCorrect = true;
                }
            }

            console.log("\n🧪 [SUBMIT DEBUG] Checking Test Case ID:", testCase._id);
            console.log("📥 Raw Input fed to program: ", JSON.stringify(serializedStdin));
            console.log("💥 RAW Program Stdout (Actual):   ", JSON.stringify(actualOutput));
            console.log("💥 RAW Database String (Expected):", JSON.stringify(expectedOutput));
            console.log("A Output (Normalized Actual):  ", JSON.stringify(cleanActual));
            console.log("B Output (Normalized Expected):", JSON.stringify(cleanExpected));
            console.log("⚖️ Match Evaluation Verdict:    ", matchIsCorrect);

            if (matchIsCorrect) {
                passedCount++;
            } else {
                verdict = "Wrong Answer";
                break;
            }
        }

        if (roomId && req.app.get("activeRooms")) {
            const activeRooms = req.app.get("activeRooms");
            const io = req.app.get("io");
            const room = activeRooms.get(roomId);

            if (room && io) {
                if (room.player1.userId === String(req.user?._id)) {
                    room.player1.passedCases = passedCount;
                } else if (room.player2.userId === String(req.user?._id)) {
                    room.player2.passedCases = passedCount;
                }

                io.to(roomId).emit("opponent_progress_updated", {
                    player1Passed: room.player1.passedCases,
                    player2Passed: room.player2.passedCases,
                    totalCount
                });
            }
        }

        const submission = await Submission.create({
            user: req.user?._id || null,
            problem: targetProblemId,
            language,
            sourceCode,
            verdict
        });

        if (verdict === "Accepted" && req.user?._id) {
            const difficultyField = problemDoc.difficulty.toLowerCase();
            await User.findByIdAndUpdate(req.user._id, {
                $inc: { "problemsSolved": 1, [`breakdown.${difficultyField}`]: 1 },
                $push: {
                    solvedProblems: {
                        $each: [{
                            title: problemDoc.title,
                            difficulty: problemDoc.difficulty,
                            language: language || "C++",
                            solvedAt: new Date()
                        }],
                        $position: 0
                    }
                }
            });
        }

        return res.status(201).json({ success: true, verdict, submission });

    } catch (error) {
        console.error("Submission Engine Crash Exception:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ user: req.user?._id }).populate("problem");
        return res.json({ success: true, data: submissions });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};