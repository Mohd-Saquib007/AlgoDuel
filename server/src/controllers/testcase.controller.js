const TestCase = require("../models/testCase.model");
const Problem = require("../models/problem.model"); // Links your problem schema definition

// POST /api/testcases
exports.createTestCase = async (req, res) => {
    try {
        const { problem: problemId, input, expectedOutput, isHidden, order } = req.body;

        // 1. Look up the problem document using the string ID/slug sent from the request body
        const problemDoc = await Problem.findOne({ 
            $or: [{ slug: problemId }, { title: problemId }] 
        });

        if (!problemDoc) {
            return res.status(404).json({
                success: false,
                message: `Cannot create test case. Problem '${problemId}' not found.`
            });
        }

        // 2. Create the testcase document using the real MongoDB ObjectId reference
        const testCase = await TestCase.create({
            problem: problemDoc._id, // Clean ObjectId assignment reference rule
            input,
            expectedOutput,
            isHidden,
            order
        });

        res.status(201).json({
            success: true,
            data: testCase
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET /api/testcases/problem/:problemId
exports.getProblemTestCases = async (req, res) => {
    try {
        const { problemId } = req.params; // Captures "two-sum" straight from the route parameters

        // 1. Translate the string name into a real database object ID match
        const problemDoc = await Problem.findOne({ 
            $or: [{ slug: problemId }, { title: problemId }] 
        });

        if (!problemDoc) {
            return res.status(404).json({
                success: false,
                message: `Problem matching '${problemId}' was not found.`
            });
        }

        // 2. Query the testcases securely using the mapped mongoose _id field element
        const testCases = await TestCase.find({
            problem: problemDoc._id
        }).sort("order");

        res.json({
            success: true,
            data: testCases
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};