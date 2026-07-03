const pistonService = require("../services/piston.service");

exports.runCode = async (req, res) => {
    try {
        const {
            language,
            sourceCode,
            stdin,
        } = req.body;

        const result =
            await pistonService.executeCode(
                language,
                sourceCode,
                stdin
            );

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error(error.response?.data);

        res.status(500).json({
        success: false,
        message: error.response?.data || error.message
        });
    }
};