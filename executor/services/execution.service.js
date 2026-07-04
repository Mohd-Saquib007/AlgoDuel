const cppRunner = require("../runners/cpp.runner");

exports.runCpp = async (sourceCode, stdin = "") => {
    return await cppRunner.executeCpp(sourceCode, stdin);
};