import { ArrowLeft, Play, RotateCcw, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ExecutionContext from "../../context/ExecutionContext";
import { submitSolution } from "../../api/submission";
import axios from "axios";

function EditorHeader({ problemSlug }) {
  const { run, loading, code, language, reset } = useContext(ExecutionContext);
  const [sampleTestCase, setSampleTestCase] = useState("");

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
      console.log("🚀 [FRONTEND] Dispatching run wrapper with dynamic stdin:", sampleTestCase);
      // FIXED: Forward the actual stored example string variable instead of hardcoded ""
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
        alert("Submission result: " + (res.verdict || JSON.stringify(res)));
      }
    } catch (err) {
      alert("Submit failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-6 py-4">
      <div className="flex items-center gap-4">
        <Link to="/problems" className="rounded-lg p-2 transition hover:bg-white/10">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <div>
          <h2 className="text-xl font-semibold capitalize text-white">
            {problemSlug ? problemSlug.replace(/-/g, " ") : "Two Sum"}
          </h2>
          <p className="text-sm text-gray-400">Practice Match • Coding Arena</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleRun} 
          disabled={loading} 
          className="flex items-center gap-2 rounded-lg border border-[#A3FF12] px-5 py-2 text-[#A3FF12] transition hover:bg-[#A3FF12] hover:text-black disabled:opacity-50"
        >
          <Play size={18} />
          {loading ? "Running..." : "Run"}
        </button>

        <button onClick={reset} className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2 text-white transition hover:bg-white/10">
          <RotateCcw size={18} /> Reset
        </button>

        <button onClick={handleSubmit} className="flex items-center gap-2 rounded-lg bg-[#A3FF12] px-5 py-2 font-semibold text-black transition hover:brightness-110 active:scale-95">
          <Upload size={18} /> Submit
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;