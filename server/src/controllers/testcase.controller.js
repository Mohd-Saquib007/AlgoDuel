const TestCase = require("../models/testCase.model");

exports.createTestCase = async (req, res) => {

    try {

        const testCase = await TestCase.create(req.body);

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

exports.getProblemTestCases = async (req, res) => {

    try {

        const testCases = await TestCase.find({

            problem: req.params.problemId

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