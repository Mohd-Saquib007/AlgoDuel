exports.runCpp = async (sourceCode, testCases) => {

    const results = [];

    for(const testCase of testCases){

        const output = await executeOne(
            sourceCode,
            testCase.input
        );

        results.push({
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: output.trim()
        });

    }

    return results;
}