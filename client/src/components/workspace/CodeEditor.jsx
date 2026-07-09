import { useEffect, useContext, useState } from "react";
import axios from "axios";
import ExecutionContext from "../../context/ExecutionContext";
import Editor from "@monaco-editor/react";

function CodeEditor({ problemSlug }) {
  const { language, setLanguage, code, setCode } = useContext(ExecutionContext);
  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editorCache, setEditorCache] = useState({});

  useEffect(() => {
    const syncProblemAndCode = async () => {
      if (!problemSlug) return;
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        // 1. Fetch the general problem blueprint specifications
        const probRes = await axios.get(`http://localhost:5000/api/problems/${problemSlug}`);
        const data = probRes.data?.data || probRes.data;
        setProblemData(data);

        // 2. Check memory cache first for intermediate unsubmitted text modifications
        const cacheKey = `${problemSlug}:${language}`;
        if (editorCache[cacheKey]) {
          setCode(editorCache[cacheKey]);
          setIsLoading(false);
          return;
        }

        // 3. Fallback: Query submission records to see if the user previously passed this problem
        if (token) {
          try {
            const subRes = await axios.get("http://localhost:5000/api/submissions/user/me", {
              headers: { Authorization: `Bearer ${token}` }
            });
            const submissions = subRes.data?.data || subRes.data || [];
            
            // Find the latest successful submission matching this problem identifier
            const passedRecord = submissions.find(
              (sub) => 
                (sub.problem?.slug === problemSlug || sub.problem?._id === data._id) && 
                sub.verdict === "Accepted" && 
                sub.language === language
            );

            if (passedRecord && passedRecord.sourceCode) {
              setCode(passedRecord.sourceCode);
              setIsLoading(false);
              return;
            }
          } catch (subErr) {
            console.warn("Could not retrieve user history logs, falling back to clean template.", subErr);
          }
        }

        // 4. Default: Load the clean starter layout template out of MongoDB Atlas configurations
        const matchingTemplate = data?.starterCode?.find((item) => item.language === language);
        if (matchingTemplate && matchingTemplate.code) {
          setCode(matchingTemplate.code);
        } else {
          setCode(`// Write your solution class for ${data?.title || "this problem"} here\n`);
        }
      } catch (err) {
        console.error("Critical error mapping template workflows:", err);
      } finally {
        setIsLoading(false);
      }
    };

    syncProblemAndCode();
  }, [problemSlug, language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    const currentCacheKey = `${problemSlug}:${language}`;
    setEditorCache((prev) => ({ ...prev, [currentCacheKey]: code }));
    setLanguage(selectedLanguage);
  };

  const handleEditorChange = (value) => {
    const newCodeValue = value || "";
    setCode(newCodeValue);
    const cacheKey = `${problemSlug}:${language}`;
    setEditorCache((prev) => ({ ...prev, [cacheKey]: newCodeValue }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#181818] text-gray-400 font-mono text-sm">
        <div className="animate-pulse tracking-wider">Syncing challenge profile context...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#181818]">
      {/* Toolbar Controls */}
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

      {/* Monaco Sandbox View Area */}
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