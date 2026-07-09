import React, { createContext, useCallback, useEffect, useState } from "react";
import { runCode as apiRunCode } from "../api/execution";

export const starterCode = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {

    }
};`,

  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {

    }
}`,

  python: `class Solution:
    def two_sum(self, nums, target):
        pass`,

  javascript: `function twoSum(nums, target) {

}`,
};

const STORAGE_KEY = "algoduel:workspace";

const readStoredWorkspace = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const ExecutionContext = createContext({});

export const ExecutionProvider = ({ children }) => {
  const initialWorkspace = readStoredWorkspace();
  const initialLanguage = initialWorkspace?.language || "cpp";
  const initialCode = initialWorkspace?.code || starterCode[initialLanguage] || "";

  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ language, code })
      );
    }
  }, [language, code]);

  const reset = useCallback(() => {
    const nextCode = starterCode[language] || "";
    setCode(nextCode);
    setResult(null);
  }, [language]);

  // FIXED: Destructures problemSlug from call signature arguments cleanly
  const run = useCallback(
    async ({ stdin = "", problemSlug = "" } = {}) => {
      setLoading(true);
      try {
        const payload = {
          language,
          sourceCode: code,
          stdin,
          problemSlug, // FIXED: Sent straight down to the Port 5000 API controller body
        };

        const res = await apiRunCode(payload);

        if (res?.success === false) {
          const errorMsg = res.message || res.output || "Execution failed";
          setResult({ error: errorMsg });
          setLoading(false);
          throw new Error(errorMsg);
        }

        const output = res?.result !== undefined ? res.result : res?.output !== undefined ? res.output : res;

        setResult(output ?? "");
        setLoading(false);
        return output;
      } catch (err) {
        const msg = err.response?.data?.message || err.response?.data?.output || err.message;
        setResult({ error: msg });
        setLoading(false);
        throw err;
      }
    },
    [language, code]
  );

  return (
    <ExecutionContext.Provider
      value={{ language, setLanguage, code, setCode, result, setResult, run, loading, reset }}
    >
      {children}
    </ExecutionContext.Provider>
  );
};

export default ExecutionContext;