const axios = require("axios");
const Problem = require("../models/problem.model");
const TestCase = require("../models/testcase.model");
const PistonService = require("../services/piston.service");

// JavaScript Pre-compiler Stream Sanitizer
const serializeStdinForCpp = (inputStr, params) => {
    console.log("\n🧪 [DEBUG] Entering serializeStdinForCpp with input:", JSON.stringify(inputStr));
    if (!inputStr || String(inputStr).trim() === "") return "";
    let cleanStr = inputStr.trim();

    const hasVector = params.some(p => p.type.startsWith("vector"));

    if (hasVector) {
        // Isolate the bracket block elements
        const arrayMatch = cleanStr.match(/\[(.*?)\]/);
        if (arrayMatch) {
            const elements = arrayMatch[1].split(",").map(x => x.trim()).filter(x => x !== "");
            
            // Isolate trailing target variable properties
            const targetMatch = cleanStr.match(/(?:target\s*=\s*)?(-?\d+)\s*$/);
            const targetVal = targetMatch ? targetMatch[1] : "";

            // Format standard input stream structure: [Length] [Array Elements] [Scalar Value]
            const formatted = `${elements.length}\n${elements.join(" ")}\n${targetVal}`.trim();
            console.log("👉 [DEBUG] Vector Problem Serialized Input Stream:\n", JSON.stringify(formatted));
            return formatted;
        }
    }

    // Isolate single string values (like Valid Parentheses) from variable labels and quotes
    let stringClean = cleanStr.replace(/^(s|input)\s*=\s*/i, "");
    stringClean = stringClean.replace(/^["']|["']$/g, "");
    console.log("👉 [DEBUG] Primitive Problem Serialized Input Stream:", JSON.stringify(stringClean));
    return stringClean.trim();
};

// Universal C++ Execution Driver Template Generator Engine
const generateUniversalCppHarness = (userSolutionCode, problemDoc) => {
    if (!problemDoc || !problemDoc.harnessConfig) {
        return userSolutionCode;
    }

    const { returnType, functionName, params } = problemDoc.harnessConfig;
    const trimmedSource = (userSolutionCode || "").trim();
    
    // Pristine headers including both standard structures and optimized structures
    const globalHeaders = "#include <iostream>\n#include <vector>\n#include <map>\n#include <string>\n#include <stack>\n#include <unordered_map>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\n";

    let paramDeclarations = "";
    let streamInputs = "";
    let functionArgs = [];

    params.forEach((param) => {
        paramDeclarations += `    ${param.type} ${param.name};\n`;
        functionArgs.push(param.name);

        if (param.type.startsWith("vector")) {
            // Read array lengths cleanly before indexing elements sequentially
            streamInputs += `
    int size_${param.name};
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
    cout << "]";`;
    } else if (returnType === "bool") {
        outputFormatter = `    cout << (result ? "true" : "false");\n`;
    } else {
        outputFormatter = `    cout << result;\n`;
    }

    const completeHarness = `${globalHeaders}\n${trimmedSource}\n\nint main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
${paramDeclarations}
${streamInputs}
    Solution sol;
    ${returnType} result = sol.${functionName}(${functionArgs.join(", ")});
${outputFormatter}
    return 0;
}`;

    console.log("\n🛠️ [DEBUG] Auto-Generated Full C++ Driver Compilation Code Harness:");
    console.log("------------------------------------------------------------------");
    console.log(completeHarness);
    console.log("------------------------------------------------------------------\n");
    return completeHarness;
};

exports.runCode = async (req, res) => {
    try {
        const { language, sourceCode, stdin, problemSlug } = req.body;
        console.log("\n📥 [DEBUG] Incoming Request Body parameters map properties:", { language, problemSlug, stdinLength: stdin?.length });

        if (!language || !sourceCode) {
            return res.status(400).json({ success: false, message: "Language and sourceCode are required" });
        }

        const problem = await Problem.findOne({ slug: problemSlug || "two-sum" }).lean();
        console.log("🔍 [DEBUG] Database Lookup Result document matching slug token:", problem ? `Found: ${problem.title}` : "NOT FOUND / NULL");

        const hasMain = /\b(?:int|void)\s+main\s*\(/m.test(sourceCode);

        let compiledSource = sourceCode;
        let serializedStdin = stdin || "";

        if (language === "cpp" && !hasMain && problem && problem.harnessConfig) {
            compiledSource = generateUniversalCppHarness(sourceCode, problem);
            serializedStdin = serializeStdinForCpp(stdin, problem.harnessConfig.params);
        }

        try {
            console.log("⚡ [DEBUG] Dispatching tracking pass execution over to PistonService...");
            const result = await PistonService.executeCode(language, compiledSource, serializedStdin);
            
            console.log("📦 [DEBUG] Piston Service Raw Returned Object Payload Struct:\n", JSON.stringify(result, null, 2));

            let processedOutput = "";
            let finalStatus = "Executed";

            if (result && result.run) {
                if (result.run.stderr && result.run.stderr.trim() !== "") {
                    processedOutput = result.run.stderr.trim();
                    finalStatus = "Runtime Error";
                } else {
                    processedOutput = result.run.stdout || result.run.output || "";
                }
            } else if (result) {
                processedOutput = result.output || result.stdout || JSON.stringify(result);
            }

            return res.json({ 
                success: true, 
                run: { 
                    status: finalStatus, 
                    output: String(processedOutput).trim(), 
                    time: result?.run?.time || "12 ms", 
                    memory: result?.run?.memory || "4.0 MB" 
                } 
            });

        } catch (pistonError) {
            console.warn("\n❌ [DEBUG] Piston Service Error Catch Triggered. Reason:", pistonError.message);
            console.log("Cascading code payload processing immediately down to Port 7000 Sandbox microservice...");
            
            try {
                const executorUrl = process.env.EXECUTOR_URL || "http://localhost:7000";
                console.log(`🌐 [DEBUG] Hitting local sandbox microservice endpoint route: ${executorUrl}/run`);
                
                const response = await axios.post(`${executorUrl}/run`, {
                    language,
                    sourceCode: compiledSource,
                    stdin: serializedStdin
                });
                
                console.log("📦 [DEBUG] Port 7000 Sandbox Microservice Local Raw Response Payload Structure:\n", JSON.stringify(response.data, null, 2));
                
                const sandboxData = response.data?.run || response.data || {};
                let sandboxOutput = sandboxData.output || sandboxData.stdout || "";
                let sandboxStatus = sandboxData.status || "Executed";

                // ROBUST LAYER EXTRACTOR: If sandbox returns structural stderr errors, bubble them up safely
                if (sandboxData.stderr && sandboxData.stderr.trim() !== "") {
                    sandboxOutput = sandboxData.stderr.trim();
                    sandboxStatus = "Runtime Error";
                } else if (typeof sandboxOutput === "string" && sandboxOutput.toLowerCase().includes("runtime error")) {
                    sandboxStatus = "Runtime Error";
                }
                
                return res.json({ 
                    success: true, 
                    run: { 
                        status: sandboxStatus, 
                        output: String(sandboxOutput || "Execution finished.").trim(),
                        time: sandboxData.time || "14 ms",
                        memory: sandboxData.memory || "3.8 MB"
                    } 
                });
            } catch (axiosError) {
                console.error("\n💥 [DEBUG] Port 7000 Isolation Subprocess Execution Failed completely:");
                console.error("Message:", axiosError.message);

                return res.status(200).json({
                    success: true,
                    run: {
                        status: "Runtime Error",
                        output: `Both sandbox execution routes are offline. Local Runner Exception: ${axiosError.message}`,
                        time: "0 ms",
                        memory: "0 MB"
                    }
                });
            }
        }
    } catch (error) {
        console.error("🔥 [DEBUG] Top-level Controller Route Exception Trapped:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.runProblemTests = async (req, res) => {
    try {
        const { language, sourceCode, problemId, problemSlug } = req.body;

        if (!language || !sourceCode || (!problemId && !problemSlug)) {
            return res.status(400).json({ success: false, message: "language, sourceCode, and problemSlug/problemId are required" });
        }

        const query = problemId ? { _id: problemId } : { slug: problemSlug };
        const problem = await Problem.findOne(query).lean();
        if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });

        const testCases = await TestCase.find({ problem: problem._id }).sort({ order: 1 });
        if (!testCases.length) return res.status(404).json({ success: false, message: "No test cases configured." });

        const perTestResults = [];
        let verdict = "Accepted";
        const hasMain = /\b(?:int|void)\s+main\s*\(/m.test(sourceCode);

        for (const testCase of testCases) {
            const testResult = { id: testCase._id, input: testCase.input, expectedOutput: testCase.expectedOutput, actualOutput: null, status: "Unknown", stderr: null };
            
            try {
                const harnessSource = (language === "cpp" && !hasMain && problem && problem.harnessConfig) ? generateUniversalCppHarness(sourceCode, problem) : sourceCode;
                const serializedStdin = (language === "cpp" && !hasMain && problem && problem.harnessConfig) ? serializeStdinForCpp(testCase.input, problem.harnessConfig.params) : testCase.input;
                
                let response;
                try {
                    response = await PistonService.executeCode(language, harnessSource, serializedStdin);
                } catch (err) {
                    const executorUrl = process.env.EXECUTOR_URL || "http://localhost:7000";
                    response = await axios.post(`${executorUrl}/run`, { language, sourceCode: harnessSource, stdin: serializedStdin });
                }

                const runPayload = response.run || response.data?.run || response.data || response;
                let actualOutput = "";

                if (runPayload.stderr && runPayload.stderr.trim() !== "") {
                    actualOutput = runPayload.stderr.trim();
                    testResult.status = "Runtime Error";
                    testResult.stderr = actualOutput;
                    verdict = "Runtime Error";
                } else {
                    actualOutput = String(runPayload.stdout || runPayload.output || "").trim();
                    testResult.actualOutput = actualOutput;

                    if (actualOutput === testCase.expectedOutput.trim()) {
                        testResult.status = "Passed";
                    } else {
                        testResult.status = "Failed";
                        verdict = "Wrong Answer";
                    }
                }
            } catch (testError) {
                testResult.status = "Runtime Error";
                testResult.stderr = testError.message;
                if (verdict === "Accepted") verdict = "Runtime Error";
            }
            perTestResults.push(testResult);
            if (verdict !== "Accepted") break;
        }
        return res.json({ success: true, verdict, results: perTestResults });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};