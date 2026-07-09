const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const TMP_DIR = path.join(__dirname, "..", "temp");

const writeFile = async (filePath, content) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
};

const executeShellCommand = (command, stdinContent = "") => {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    const child = exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
      const diff = process.hrtime(startTime);
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
  if (!trimmed) return `#include <iostream>\nint main() { return 0; }\n`;
  return trimmed; // Returns the injected harness verbatim
};

const executeCpp = async (sourceCode, stdin = "") => {
  const id = uuidv4();
  const folderPath = path.join(TMP_DIR, id);
  const codePath = path.join(folderPath, "Main.cpp");
  const binaryPath = path.join(folderPath, "Main.exe");

  const preparedSource = prepareSourceCode(sourceCode);
  await writeFile(codePath, preparedSource);

  const compileCmd = `g++ "${codePath}" -o "${binaryPath}"`;
  const runCmd = `"${binaryPath}"`;

  try {
    await executeShellCommand(compileCmd);
  } catch (compileError) {
    return { 
      error: "Compilation Error",
      stdout: "", 
      stderr: `Compilation Failed:\n${compileError.stderr || compileError.message}`,
      durationMs: 0
    };
  }

  try {
    const { stdout, stderr, durationMs } = await executeShellCommand(runCmd, stdin);
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
      stderr: `Runtime Error:\n${runtimeError.stderr || runtimeError.message}`,
      durationMs: runtimeError.durationMs || 0
    };
  } finally {
    setTimeout(async () => {
      try { await fs.rm(folderPath, { recursive: true, force: true }); } catch (e) {}
    }, 5000);
  }
};

module.exports = { executeCpp };