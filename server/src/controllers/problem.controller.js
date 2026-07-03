const Problem = require("../models/problem.model");

// Create Problem
exports.createProblem = async (req, res) => {
    try {
        const problem = await Problem.create(req.body);

        res.status(201).json({
            success: true,
            data: problem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Problems
exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .select("title slug difficulty tags");

        res.json({
            success: true,
            count: problems.length,
            data: problems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get One Problem
exports.getProblem = async (req, res) => {
    try {
        const problem = await Problem.findOne({
            slug: req.params.slug
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        res.json({
            success: true,
            data: problem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Problem
exports.updateProblem = async (req, res) => {
    try {

        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        res.json({
            success: true,
            data: problem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Problem
exports.deleteProblem = async (req, res) => {
    try {

        const problem = await Problem.findByIdAndDelete(req.params.id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        res.json({
            success: true,
            message: "Problem deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};