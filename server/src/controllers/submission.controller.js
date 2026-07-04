const Submission = require("../models/submission.model");
const TestCase = require("../models/testCase.model");
const axios = require("axios");

exports.createSubmission = async (req, res) => {
    try {

        const { problemId, language, sourceCode } = req.body;

        // Fetch all test cases of the problem
        const testCases = await TestCase.find({
            problem: problemId
        });

        if (!testCases.length) {
            return res.status(404).json({
                success: false,
                message: "No test cases found for this problem."
            });
        }

        let verdict = "Accepted";

        for (const testCase of testCases) {

            const executorUrl = process.env.EXECUTOR_URL || "http://localhost:7000";

        const response = await axios.post(
            `${executorUrl}/run`,
            {
                language,
                sourceCode,
                stdin: testCase.input
            }
        );

        const actualOutput = response.data.output.trim();
        const expectedOutput = testCase.expectedOutput.trim();

            if (actualOutput !== expectedOutput) {
                verdict = "Wrong Answer";
                break;
            }
        }

        const submission = await Submission.create({
            user: req.user._id,
            problem: problemId,
            language,
            sourceCode,
            verdict
        });

        res.status(201).json({
            success: true,
            verdict,
            submission
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getUserSubmissions = async (req, res) => {

    try {

        const submissions = await Submission.find({
            user: req.user._id
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