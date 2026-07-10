import { useEffect, useContext, useState } from "react";
import axios from "axios";
import ExecutionContext from "../../context/ExecutionContext";
import Editor from "@monaco-editor/react";

function CodeEditor({ problemSlug, isBattleMode, problemData: passedProblemData }) {
  // 🟢 CRITICAL FIX: Extract context object reference defensively to prevent blank reference page crashes
  const context = useContext(ExecutionContext);
  
  const language = context?.language || "cpp";
  const setLanguage = context?.setLanguage || (() => {});
  const code = context?.code || "";
  const setCode = context?.setCode || (() => {});

  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editorCache, setEditorCache] = useState({});

  useEffect(() => {
    const syncProblemAndCode = async () => {
      let activeData = null;
      if (isBattleMode && passedProblemData) {
        activeData = passedProblemData;
        setProblemData(passedProblemData);
      } else {
        if (!problemSlug) return;
        try {
          setIsLoading(true);
          const probRes = await axios.get(`http://localhost:5000/api/problems/${problemSlug}`);
          activeData = probRes.data?.data || probRes.data;
          setProblemData(activeData);
        } catch (err) {
          console.error("Critical error fetching single-player specifications:", err);
          setIsLoading(false);
          return;
        }
      }

      const currentSlug = isBattleMode ? activeData?.slug : problemSlug;
      const cacheKey = `${currentSlug}:${language}`;
      if (editorCache[cacheKey]) {
        setCode(editorCache[cacheKey]);
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!isBattleMode && token && currentSlug) {
        try {
          const subRes = await axios.get("http://localhost:5000/api/submissions/user/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const submissions = subRes.data?.data || subRes.data || [];
          const passedRecord = submissions.find(
            (sub) => 
              (sub.problem?.slug === currentSlug || sub.problem?._id === activeData?._id) && 
              sub.verdict === "Accepted" && 
              sub.language === language
          );

          if (passedRecord && passedRecord.sourceCode) {
            setCode(passedRecord.sourceCode);
            setIsLoading(false);
            return;
          }
        } catch (subErr) {
          console.warn("Could not parse user history logs, running clean fallback configurations.", subErr);
        }
      }

      const matchingTemplate = activeData?.starterCode?.find((item) => item.language === language);
      if (matchingTemplate && matchingTemplate.code) {
        setCode(matchingTemplate.code);
      } else {
        setCode(`// Write your solution class for ${activeData?.title || "this problem"} here\n`);
      }
      setIsLoading(false);
    };

    syncProblemAndCode();
  }, [problemSlug, isBattleMode, passedProblemData, language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    const currentSlug = isBattleMode ? problemData?.slug : problemSlug;
    const currentCacheKey = `${currentSlug}:${language}`;
    setEditorCache((prev) => ({ ...prev, [currentCacheKey]: code }));
    setLanguage(selectedLanguage);
  };

  const handleEditorChange = (value) => {
    const newCodeValue = value || "";
    setCode(newCodeValue);
    const currentSlug = isBattleMode ? problemData?.slug : problemSlug;
    const cacheKey = `${currentSlug}:${language}`;
    setEditorCache((prev) => ({ ...prev, [cacheKey]: newCodeValue }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#181818] text-gray-500 font-mono text-sm">
        <div className="animate-pulse tracking-wider">Syncing challenge profile context...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#181818]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-5 py-3">
        <h3 className="font-semibold text-white tracking-wide text-sm">
          Code Editor &mdash; <span className="text-[#A3FF12] text-xs font-mono">{problemData?.title}</span>
        </h3>

        <select
          value={language}
          onChange={handleLanguageChange}
          className="rounded-lg border border-white/10 bg-[#1E1E1E] px-3 py-2 text-xs font-medium text-gray-200 outline-none cursor-pointer transition hover:border-white/20"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 4,
            roundedSelection: true,
            padding: { top: 20 },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;