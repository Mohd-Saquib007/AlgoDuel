import { useContext } from "react";
import ExecutionContext, { starterCode } from "../../context/ExecutionContext";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const { language, setLanguage, code, setCode } = useContext(ExecutionContext);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);
    setCode(starterCode[selectedLanguage]);
  };

  return (
    <div className="flex h-full flex-col bg-[#181818]">
      {/* Toolbar */}

      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-5 py-3">
        <h3 className="font-semibold">
          Code Editor
        </h3>

        <select
          value={language}
          onChange={handleLanguageChange}
          className="rounded-lg border border-white/10 bg-[#1E1E1E] px-3 py-2 text-sm outline-none"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      {/* Monaco */}

      <div className="flex-1">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 15,
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 4,
            roundedSelection: true,
            padding: {
              top: 20,
            },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;