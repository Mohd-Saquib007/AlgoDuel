const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // FIXED: Explicitly fallback to checking both decoded property names
        const targetUserId = decoded.id || decoded._id;

        if (!targetUserId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload structure"
            });
        }

        const user = await User.findById(targetUserId).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User account no longer exists in database"
            });
        }

        // Attach user schema parameters cleanly to your request context pipeline
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token signature"
        });
    }
};