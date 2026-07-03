const piston = require("../config/piston");

const LANGUAGE_MAP = {
    cpp: {
        language: "c++",
        version: "10.2.0",
    },
    python: {
        language: "python",
        version: "3.10.0",
    },
    javascript: {
        language: "javascript",
        version: "18.15.0",
    },
    java: {
        language: "java",
        version: "15.0.2",
    },
};

exports.executeCode = async (
    language,
    sourceCode,
    stdin = ""
) => {
    const lang = LANGUAGE_MAP[language];

    if (!lang) {
        throw new Error("Unsupported language");
    }

    const response = await piston.post("/execute", {
        language: lang.language,
        version: lang.version,
        files: [
            {
                content: sourceCode,
            },
        ],
        stdin,
    });

    return response.data;
};