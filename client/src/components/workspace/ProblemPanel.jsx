import { useState, useEffect } from "react";
import axios from "axios";

function ProblemPanel({ problemSlug, problemData }) {
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🟢 MULTIPLAYER OVERRIDE WAY: If the socket already dropped the full object parameters, bypass Axios
    if (problemData) {
      setProblem(problemData);
      setIsLoading(false);
      return;
    }

    // 🔵 STANDARD PRACTICE MODE WAY: Fall back to native HTTP API fetch requests
    const fetchProblemData = async () => {
      if (!problemSlug) return;
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/problems/${problemSlug}`);
        if (res.data && res.data.data) {
          setProblem(res.data.data);
        } else {
          setProblem(res.data);
        }
      } catch (err) {
        console.error("Error pulling question descriptions:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblemData();
  }, [problemSlug, problemData]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1E1E1E] text-gray-500">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-[#A3FF12]" />
          <div className="text-xs font-semibold tracking-widest uppercase animate-pulse">Loading specifications...</div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1E1E1E] text-red-400 p-6 text-center font-medium text-sm">
        Problem data offline or slug unmapped.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#1E1E1E] p-6 sm:p-8 border-r border-white/5 custom-scrollbar">
      <h1 className="text-3xl font-black tracking-tight text-white uppercase">
        {problem.title}
      </h1>

      <div className="mt-4 flex gap-2">
        <span className={`rounded-md px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide border ${
          problem.difficulty?.toLowerCase() === "easy" ? "bg-green-500/5 border-green-500/10 text-green-400" :
          problem.difficulty?.toLowerCase() === "medium" ? "bg-yellow-500/5 border-yellow-500/10 text-yellow-400" : 
          "bg-red-500/5 border-red-500/10 text-red-400"
        }`}>
          {problem.difficulty}
        </span>

        <span className="rounded-md bg-[#252526] border border-white/5 px-2.5 py-0.5 text-gray-400 text-xs font-bold uppercase tracking-wide">
          {problem.topic || "General"}
        </span>
      </div>

      <section className="mt-10">
        <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase">Description</h2>
        <p className="mt-3 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
          {problem.statement || problem.description}
        </p>
      </section>

      {problem.examples && problem.examples.length > 0 ? (
        problem.examples.map((ex, idx) => (
          <section key={idx} className="mt-8">
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase">Example {idx + 1}</h2>
            <pre className="mt-3 rounded-xl bg-[#141414] p-5 text-gray-300 font-mono text-xs border border-white/5 whitespace-pre-wrap leading-relaxed">
              <strong className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Input:</strong> {ex.input}{"\n\n"}
              <strong className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Output:</strong> {ex.output}
              {ex.explanation && <>{"\n\n"}<strong className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Explanation:</strong> {ex.explanation}</>}
            </pre>
          </section>
        ))
      ) : problem.example ? (
        <section className="mt-8">
          <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase">Example</h2>
          <pre className="mt-3 rounded-xl bg-[#141414] p-5 text-gray-300 font-mono text-xs border border-white/5 whitespace-pre-wrap leading-relaxed">
            {problem.example}
          </pre>
        </section>
      ) : null}

      {problem.constraints && (
        <section className="mt-8 pb-6">
          <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-3">Constraints</h2>
          {Array.isArray(problem.constraints) ? (
            <ul className="list-none space-y-2 text-xs text-gray-400 font-medium">
              {problem.constraints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#A3FF12] select-none">•</span> {item}
                </li>
              ))}
            </ul>
          ) : (
            <pre className="rounded-xl bg-[#141414] p-5 text-gray-300 font-mono text-xs border border-white/5 whitespace-pre-wrap">
              {problem.constraints}
            </pre>
          )}
        </section>
      )}
    </div>
  );
}

export default ProblemPanel;