const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        profilePicture: {
            type: String,
            default: ""
        },

        // --- NEW METRICS INTEGRATED FOR DYNAMIC PROFILES ---
        title: { 
            type: String, 
            default: "Full Stack Developer • Competitive Programmer" 
        },
        
        location: { 
            type: String, 
            default: "India" 
        },

        rating: {
            type: Number,
            default: 1200
        },

        highestRating: { 
            type: Number, 
            default: 1200 
        },

        globalRank: { 
            type: Number, 
            default: 0 
        },

        contestsPlayed: { 
            type: Number, 
            default: 0 
        },

        problemsSolved: { 
            type: Number, 
            default: 0 
        },

        battleWins: { 
            type: Number, 
            default: 0 
        },

        battleLosses: { 
            type: Number, 
            default: 0 
        },

        currentStreak: { 
            type: Number, 
            default: 0 
        },

        // Nested structure for Easy, Medium, Hard problem tracking
        breakdown: {
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
        },

        // Tracks unique programming language metrics counts
        languages: [
            {
                name: { type: String }, // e.g., "C++", "Python"
                count: { type: Number, default: 0 }
            }
        ],

        // Sub-collection document log array to track standard submissions stream
        solvedProblems: [
            {
                title: { type: String, required: true },
                difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
                language: { type: String, required: true },
                solvedAt: { type: Date, default: Date.now }
            }
        ]
    },
    {
        timestamps: true
    }
);

// --- PRE-EXISTING AUTHENTICATION LOOPS (PRESERVED) ---

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

module.exports = mongoose.model("User", userSchema);