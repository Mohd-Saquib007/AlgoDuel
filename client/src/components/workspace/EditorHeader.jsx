import { ArrowLeft, Play, RotateCcw, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ExecutionContext from "../../context/ExecutionContext";
import { submitSolution } from "../../api/submission";

// FIXED: Accepting problemSlug as a prop from Workspace.jsx
function EditorHeader({ problemSlug }) {
  const { run, loading, code, language, reset } = useContext(ExecutionContext);

  const handleRun = async () => {
    try {
      await run();
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

    // FIXED: Removed window.prompt entirely. 
    // Uses problemSlug from URL parameters with a safe fallback.
    const activeProblemId = problemSlug || "two-sum";

    try {
      const res = await submitSolution(token, {
        problemId: activeProblemId, // Pass the clean URL variable straight to the backend API wrapper
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
        <Link
          to="/problems"
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h2 className="text-xl font-semibold capitalize">
            {/* Formats visual title names matching slugs cleanly (e.g., "two-sum" -> "Two Sum") */}
            {problemSlug ? problemSlug.replace(/-/g, " ") : "Two Sum"}
          </h2>

          <p className="text-sm text-gray-400">
            Practice Match • Coding Arena
          </p>
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

        <button 
          onClick={reset} 
          className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2 transition hover:bg-white/10"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button 
          onClick={handleSubmit} 
          className="flex items-center gap-2 rounded-lg bg-[#A3FF12] px-5 py-2 font-semibold text-black transition hover:brightness-110 active:scale-95"
        >
          <Upload size={18} />
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;