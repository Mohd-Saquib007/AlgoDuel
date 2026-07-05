const Submission = require("../models/submission.model");
const TestCase = require("../models/testCase.model");
const mongoose = require("mongoose");
const Problem = require("../models/problem.model"); 
const User = require("../models/user.model");
const axios = require("axios");

exports.createSubmission = async (req, res) => {
    try {
        let { problemId, language, sourceCode, roomId } = req.body;

        // 1. CHECK IF problemId IS A VALID OBJECTID OR A SLUG STRINGS
        let targetProblemId = problemId;
        let problemDoc = null;
        
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            // It's a slug (e.g., "two-sum"). Find the problem to get the real _id
            problemDoc = await Problem.findOne({ 
                $or: [{ slug: problemId }, { title: problemId }, { titleSlug: problemId }] 
            });

            if (!problemDoc) {
                return res.status(404).json({
                    success: false,
                    message: `Problem matching slug '${problemId}' not found.`
                });
            }
            targetProblemId = problemDoc._id; // Swap slug for the real ObjectId
        } else {
            problemDoc = await Problem.findById(problemId);
        }

        if (!problemDoc) {
            return res.status(404).json({
                success: false,
                message: "Problem document references could not be resolved."
            });
        }

        // 2. Fetch all test cases using the verified ObjectId
        const testCases = await TestCase.find({
            problem: targetProblemId
        });

        if (!testCases.length) {
            return res.status(404).json({
                success: false,
                message: "No test cases found for this problem."
            });
        }

        let verdict = "Accepted";
        let passedCount = 0;
        const totalCount = testCases.length;

        for (const testCase of testCases) {
            const executorUrl = process.env.EXECUTOR_URL || "http://localhost:7000";
            let rawOutput = "";

            // Try the primary Piston/Sandbox executor first
            try {
                const response = await axios.post(
                    `${executorUrl}/run`,
                    {
                        language,
                        sourceCode,
                        stdin: testCase.input
                    }
                );
                rawOutput = response.data.output || response.data.stdout || response.data.run?.stdout || "";
            } catch (err) {
                // Primary runner failed or timed out, swallow error and hit fallback path
            }

            // Fallback: If primary executor failed or returned nothing, execute code via local route
            if (!rawOutput || !String(rawOutput).trim()) {
                try {
                    const localResponse = await axios.post("http://localhost:5000/api/execution/run", {
                        language,
                        sourceCode,
                        stdin: testCase.input
                    });
                    
                    if (localResponse.data && localResponse.data.run) {
                        rawOutput = localResponse.data.run.output;
                    } else {
                        rawOutput = 
                            localResponse.data.output || 
                            localResponse.data.stdout || 
                            localResponse.data.data?.stdout || 
                            "";
                    }
                } catch (fallbackErr) {
                    console.error("Local fallback runner failed as well:", fallbackErr.message);
                }
            }

            // SAFE EXTRACTION: Prevent calling methods on undefined elements
            const actualOutput = String(rawOutput || "").trim();
            const databaseExpected = testCase.expectedOutput || testCase.expectedoutput || "";
            const expectedOutput = String(databaseExpected).trim();

            // AGGRESSIVE NORMALIZATION: Remove non-alphanumeric punctuation and flatten spacing blocks
            const cleanActual = actualOutput.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, " ").trim();
            const cleanExpected = expectedOutput.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, " ").trim();

            console.log("\n================== SUBMISSION DEBUG ==================");
            console.log(`[RAW FIELD] Actual: "${actualOutput}" | Expected: "${expectedOutput}"`);
            console.log(`[NORMALIZED] Actual: "${cleanActual}" | Expected: "${cleanExpected}"`);
            console.log("======================================================\n");

            if (cleanActual === cleanExpected) {
                passedCount++;
            } else {
                verdict = "Wrong Answer";
                break;
            }
        }

        // 3. MULTIPLAYER SCOREBOARD INTERCEPTOR: Sync bars if roomId is passed
        if (roomId && req.app.get("activeRooms")) {
            const activeRooms = req.app.get("activeRooms");
            const io = req.app.get("io");
            const room = activeRooms.get(roomId);

            if (room && io) {
                if (room.player1.userId === String(req.user._id)) {
                    room.player1.passedCases = passedCount;
                } else if (room.player2.userId === String(req.user._id)) {
                    room.player2.passedCases = passedCount;
                }

                // Broadcast live metrics up to both screens simultaneously
                io.to(roomId).emit("opponent_progress_updated", {
                    player1Passed: room.player1.passedCases,
                    player2Passed: room.player2.passedCases,
                    totalCount
                });
            }
        }

        // 4. Create the database submission history document entry log
        const submission = await Submission.create({
            user: req.user?._id || null,
            problem: targetProblemId,
            language,
            sourceCode,
            verdict
        });

        // 5. Update user analytics milestones in case of an Accepted verdict
        if (verdict === "Accepted" && req.user?._id) {
            const difficultyField = problemDoc.difficulty.toLowerCase();

            await User.findByIdAndUpdate(req.user._id, {
                $inc: {
                    "problemsSolved": 1,
                    [`breakdown.${difficultyField}`]: 1
                },
                $push: {
                    solvedProblems: {
                        $each: [{
                            title: problemDoc.title,
                            difficulty: problemDoc.difficulty,
                            language: language || "C++",
                            solvedAt: new Date()
                        }],
                        $position: 0 // Forces newest solutions straight to front of visual dashboard
                    }
                }
            });
        }

        res.status(201).json({
            success: true,
            verdict,
            submission
        });

    } catch (error) {
        console.error("Submission Engine Crash:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({
            user: req.user?._id
        }).populate("problem");

        res.json({
            success: true,
            data: submissions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};