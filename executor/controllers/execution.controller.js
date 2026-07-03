const executionService = require("../services/execution.service");

exports.run = async (req, res) => {

    try {

        const {
            language,
            sourceCode,
            stdin
        } = req.body;

        if (language !== "cpp") {
            return res.status(400).json({
                success: false,
                message: "Only C++ is supported currently."
            });
        }

        const output = await executionService.runCpp(
            sourceCode,
            stdin
        );

        res.json({
            success: true,
            output
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.toString()
        });

    }

};