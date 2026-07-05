const User = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
    try {
        // req.user._id is populated securely by your JWT verification middleware
        const user = await User.findById(req.user._id)
            .select("-password") // Secure data constraint: remove hash records
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Profile registration entry not found."
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
                rating: user.rating || 1500,
                problemsSolved: user.problemsSolved || 0,
                breakdown: {
                    easy: user.breakdown?.easy || 0,
                    medium: user.breakdown?.medium || 0,
                    hard: user.breakdown?.hard || 0
                },
                solvedProblems: user.solvedProblems || []
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};