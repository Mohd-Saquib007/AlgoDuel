const fs = require("fs/promises");
const path = require("path");
const { execFile } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const TMP_DIR = path.join(__dirname, "..", "temp");

const writeFile = async (filePath, content) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
};

const execFileWithStdin = (file, args, options, stdinContent = "") => {
  return new Promise((resolve, reject) => {
    // Start high-resolution time calculation
    const startTime = process.hrtime();

    const child = execFile(file, args, options, (error, stdout, stderr) => {
      const diff = process.hrtime(startTime);
      // Convert high-res nanoseconds directly to milliseconds
      const durationMs = ((diff[0] * 1e9 + diff[1]) / 1e6).toFixed(0);

      if (error) {
        return reject({ error, stdout, stderr, durationMs });
      }
      resolve({ stdout, stderr, durationMs });
    });

    if (child.stdin && stdinContent) {
      child.stdin.write(stdinContent);
      child.stdin.end();
    }
  });
};

const hasMainFunction = (sourceCode) => {
  return /\b(?:int|void)\s+main\s*\(/m.test(sourceCode) || /\bWinMain\s*\(/m.test(sourceCode);
};

const prepareSourceCode = (sourceCode) => {
  const trimmed = (sourceCode || "").trim();

  if (!trimmed) {
    return `#include <iostream>\nint main() { return 0; }\n`;
  }

  if (hasMainFunction(trimmed)) {
    return trimmed;
  }

  return `
#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <sstream>
#include<bits/stdc++.h>

using namespace std;

${trimmed}

int main() {
    string token;
    string fullInput = "";
    
    while (cin >> token) {
        fullInput += token + " ";
    }

    for (char &c : fullInput) {
        if (c == '[' || c == ']' || c == ',' || c == '=') {
            c = ' ';
        }
    }

    stringstream ss(fullInput);
    string word;
    vector<int> nums;
    int target = 0;
    bool readingNums = false;

    while (ss >> word) {
        if (word == "nums") {
            readingNums = true;
            continue;
        }
        if (word == "target") {
            readingNums = false;
            ss >> target;
            continue;
        }
        if (readingNums) {
            stringstream numStream(word);
            int val;
            if (numStream >> val) {
                nums.push_back(val);
            }
        }
    }

    Solution solver;
    vector<int> res = solver.twoSum(nums, target);
    if(res.size() == 2) {
        cout << "[" << res[0] << "," << res[1] << "]";
    } else {
        cout << "[]";
    }
    return 0;
}
`;
};

const executeCpp = async (sourceCode, stdin = "") => {
  const id = uuidv4();
  const codePath = path.join(TMP_DIR, id, "Main.cpp");
  const binaryPath = path.join(TMP_DIR, id, "Main.exe"); 

  const preparedSource = prepareSourceCode(sourceCode);

  await writeFile(codePath, preparedSource);

  try {
    await execFileWithStdin("g++", [codePath, "-o", binaryPath], {
      cwd: path.dirname(codePath),
      timeout: 10000,
    });
  } catch (compileError) {
    return { 
      error: "Compilation Error",
      stdout: "", 
      stderr: `Compilation Failed: ${compileError.stderr || compileError.error?.message || "Check GCC path variables."}`,
      durationMs: 0
    };
  }

  try {
    const { stdout, stderr, durationMs } = await execFileWithStdin(binaryPath, [], {
      cwd: path.dirname(binaryPath),
      timeout: 5000,
    }, stdin);

    return {
      error: null,
      stdout: stdout.toString().trim(),
      stderr: stderr.toString().trim(),
      durationMs: durationMs
    };
  } catch (runtimeError) {
    return { 
      error: "Runtime Error",
      stdout: "", 
      stderr: `Runtime Error: ${runtimeError.stderr || runtimeError.error?.message}`,
      durationMs: runtimeError.durationMs || 0
    };
  }
};

module.exports = {
  executeCpp,
};