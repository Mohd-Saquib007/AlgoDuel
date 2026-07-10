import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ExecutionContext from "../../context/ExecutionContext";

function ConsolePanel({ problemSlug, isBattleMode, problemData }) {
  const [activeTab, setActiveTab] = useState("testcase");
  const [sampleInput, setSampleInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const { result } = useContext(ExecutionContext);

  useEffect(() => {
    // 🟢 MULTIPLAYER WAY: Parse inputs straight out of the socket payload
    if (isBattleMode && problemData) {
      if (problemData.examples && problemData.examples.length > 0) {
        setSampleInput(problemData.examples[0].input || "");
        setExpectedOutput(problemData.examples[0].output || "");
      } else {
        setSampleInput(problemData.example ? problemData.example : "No sample input defined.");
        setExpectedOutput("No expected output defined.");
      }
      return;
    }

    // 🔵 PRACTICE MODE WAY: Standard HTTP API fallback fetch
    const fetchSampleTestCase = async () => {
      if (!problemSlug) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/problems/${problemSlug}`);
        const data = res.data?.data || res.data;
        if (data) {
          if (data.examples && data.examples.length > 0) {
            setSampleInput(data.examples[0].input || "");
            setExpectedOutput(data.examples[0].output || "");
          } else {
            setSampleInput(data.example ? data.example : "No sample input defined.");
            setExpectedOutput("No expected output defined.");
          }
        }
      } catch (err) {
        console.error("Failed to sync example metrics fields:", err);
      }
    };
    fetchSampleTestCase();
  }, [problemSlug, isBattleMode, problemData]);

  const runData = result?.run || null;
  const outputText = runData?.output || "";
  const runtime = runData?.time || "--";
  const memory = runData?.memory || "--";

  const cleanActual = String(outputText).replace(/[^0-9a-zA-Z-]/g, "").toLowerCase().trim();
  const cleanExpected = String(expectedOutput).replace(/[^0-9a-zA-Z-]/g, "").toLowerCase().trim();
  const dynamicStatus = (cleanActual === cleanExpected && cleanActual !== "") ? "Accepted" : "Wrong Answer";

  const getStatusColor = (statusText) => {
    if (statusText === "Accepted" || statusText === "Executed") return "text-[#2cbb5d]";
    if (statusText === "Wrong Answer") return "text-[#ef4743]";
    return "text-white";
  };

  return (
    <div className="flex h-full flex-col bg-[#252526] text-white font-sans">
      <div className="flex border-b border-white/10 bg-[#1e1e1e]">
        <button
          onClick={() => setActiveTab("testcase")}
          className={`px-5 py-3 text-sm font-medium transition ${
            activeTab === "testcase" ? "border-b-2 border-[#A3FF12] text-[#A3FF12]" : "text-gray-400 hover:text-white"
          }`}
        >
          Test Case
        </button>
        <button
          onClick={() => setActiveTab("result")}
          className={`px-5 py-3 text-sm font-medium transition ${
            activeTab === "result" ? "border-b-2 border-[#A3FF12] text-[#A3FF12]" : "text-gray-400 hover:text-white"
          }`}
        >
          Result
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "testcase" ? (
          <>
            <h3 className="text-sm font-semibold text-gray-200">Sample Test Case</h3>
            <div className="mt-4">
              <p className="text-xs text-gray-400 font-medium">Input</p>
              <pre className="mt-2 rounded-xl bg-[#1E1E1E] p-4 text-sm font-mono text-gray-300 border border-white/5 whitespace-pre-wrap">
                {sampleInput}
              </pre>
            </div>
            <div className="mt-5">
              <p className="text-xs text-gray-400 font-medium">Expected Output</p>
              <pre className="mt-2 rounded-xl bg-[#1E1E1E] p-4 text-sm font-mono text-gray-300 border border-white/5 whitespace-pre-wrap">
                {expectedOutput}
              </pre>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-200">Execution Result</h3>
              {result && (
                <span className={`text-base font-bold uppercase tracking-wider ${getStatusColor(dynamicStatus)}`}>
                  {dynamicStatus === "Accepted" ? "ACCEPTED" : "WRONG ANSWER"}
                </span>
              )}
            </div>
            <div className="mt-4 rounded-xl bg-[#1E1E1E] p-4 border border-white/5 min-h-60px">
              {result !== null ? (
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2">Your Output</p>
                  <pre className="whitespace-pre-wrap text-sm font-mono text-[#00ff66]">
                    {outputText || "No output returned"}
                  </pre>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Press <span className="text-[#A3FF12] font-semibold">Run</span> to see output.
                </p>
              )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#1E1E1E] p-4 border border-white/5">
                <p className="text-xs text-gray-400 font-medium">Runtime</p>
                <p className="mt-2 text-lg font-semibold text-gray-200">{runtime}</p>
              </div>
              <div className="rounded-xl bg-[#1E1E1E] p-4 border border-white/5">
                <p className="text-xs text-gray-400 font-medium">Memory</p>
                <p className="mt-2 text-lg font-semibold text-gray-200">{memory}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConsolePanel;