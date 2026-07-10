import { ArrowLeft, Play, RotateCcw, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ExecutionContext from "../../context/ExecutionContext";
import { submitSolution } from "../../api/submission";
import axios from "axios";
import socket from "../../services/socket"; // Import your centralized frontend socket

function EditorHeader({ problemSlug, isBattleMode, roomId }) {
  const { run, loading, code, language, reset } = useContext(ExecutionContext);
  const [sampleTestCase, setSampleTestCase] = useState("");
  const navigate = useNavigate();
  
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = localUser._id || localUser.id;

  // Dynamically sync and hold the active sample test case from MongoDB Atlas
  useEffect(() => {
    const fetchSample = async () => {
      if (!problemSlug) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/problems/${problemSlug}`);
        const problemData = res.data?.data || res.data;
        if (problemData) {
          if (problemData.examples && problemData.examples.length > 0) {
            setSampleTestCase(problemData.examples[0].input || "");
          } else {
            setSampleTestCase(problemData.example || "");
          }
        }
      } catch (err) {
        console.error("Failed to fetch sample testcase inside head context:", err);
      }
    };
    fetchSample();
  }, [problemSlug]);

  const handleRun = async () => {
    try {
      console.log("🚀 Dispatching run wrapper with dynamic stdin:", sampleTestCase);
      await run({ stdin: sampleTestCase, problemSlug });
    } catch (err) {
      alert("Execution failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to submit.");
      return;
    }

    try {
      const res = await submitSolution(token, {
        problemId: problemSlug,
        language,
        sourceCode: code,
      });

      if (res) {
        const verdict = res.verdict || res.data?.verdict;
        
        if (isBattleMode && verdict === "Accepted") {
          // 🟢 MULTIPLAYER INTERCEPT GATE: Tell the socket orchestra this room has a clear winner
          socket.emit("submit_success", {
            roomId,
            userId: currentUserId,
            runtime: res.time || res.run?.time || "74 ms",
            memory: res.memory || res.run?.memory || "14.8 MB"
          });
        } else {
          // 🔵 STANDARD SINGLE-PLAYER POPUP: Default practice view alert
          alert("Submission result: " + (verdict || JSON.stringify(res)));
        }
      }
    } catch (err) {
      alert("Submit failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Adjust routing path if user decides to quit mid-battle
  const backRoutePath = isBattleMode ? "/battle" : "/problems";

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-6 py-4 select-none">
      <div className="flex items-center gap-4">
        <Link to={backRoutePath} className="rounded-lg p-2 transition hover:bg-white/10">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl font-['Sora']">
            {problemSlug ? problemSlug.replace(/-/g, " ") : "Code Arena"}
          </h2>
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase mt-0.5">
            {isBattleMode ? "🔴 Ranked Multi-Player Match" : "⚡ Single-Player Practice"}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleRun} 
          disabled={loading} 
          className="flex items-center gap-2 rounded-lg border border-[#A3FF12] px-5 py-2 text-[#A3FF12] font-semibold text-sm transition hover:bg-[#A3FF12] hover:text-black disabled:opacity-50 active:scale-[0.98]"
        >
          <Play size={16} />
          {loading ? "Running..." : "Run"}
        </button>

        <button onClick={reset} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-5 py-2 text-gray-300 font-semibold text-sm transition hover:bg-white/10 hover:text-white active:scale-[0.98]">
          <RotateCcw size={16} /> Reset
        </button>

        <button onClick={handleSubmit} className="flex items-center gap-2 rounded-lg bg-[#A3FF12] px-5 py-2 font-black text-sm text-black transition hover:brightness-110 active:scale-[0.97] uppercase tracking-wide shadow-[0_0_15px_rgba(163,255,18,0.15)]">
          <Upload size={16} /> Submit
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;