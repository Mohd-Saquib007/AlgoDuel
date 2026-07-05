const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware"); // Ensure this matches your JWT middleware filename

// FIXED: Maps endpoint to /profile matching your frontend axios call layout
router.get("/profile", auth, async (req, res) => {
    try {
        // req.user.id is attached safely by your auth middleware token verification step
        const user = await User.findById(req.user.id || req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account document not found in database."
            });
        }

        res.status(200).json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
                rating: user.rating || 1200,
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
        console.error("Profile Fetch Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server internal profile query crash."
        });
    }
});

module.exports = router;