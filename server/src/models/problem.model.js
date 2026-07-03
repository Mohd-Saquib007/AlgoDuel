const mongoose = require("mongoose");

const starterCodeSchema = new mongoose.Schema(
    {
        language: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const referenceSolutionSchema = new mongoose.Schema(
    {
        language: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },

        statement: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        tags: [
            {
                type: String
            }
        ],

        constraints: {
            type: String
        },

        examples: [
            {
                input: String,
                output: String,
                explanation: String
            }
        ],

        starterCode: [starterCodeSchema],

        referenceSolutions: [referenceSolutionSchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Problem", problemSchema);