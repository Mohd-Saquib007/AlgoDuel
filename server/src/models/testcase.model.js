const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
    {
        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        input: {
            type: String,
            required: true
        },

        expectedOutput: {
            type: String,
            required: true
        },

        isHidden: {
            type: Boolean,
            default: false
        },

        order: {
            type: Number,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

const TestCase = mongoose.models.TestCase || mongoose.model('TestCase', testCaseSchema);
module.exports = TestCase;