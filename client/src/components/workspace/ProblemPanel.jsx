import { useState, useEffect } from "react";
import axios from "axios";

function ProblemPanel({ problemSlug }) {
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [problemSlug]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1E1E1E] text-gray-400">
        <div className="text-sm font-medium animate-pulse">Loading specifications...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1E1E1E] text-red-400 p-6 text-center">
        Problem data offline or slug unmapped.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#1E1E1E] p-8">
      <h1 className="text-4xl font-bold">
        {problem.title}
      </h1>

      <div className="mt-5 flex gap-3">
        <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
          problem.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
          problem.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
        }`}>
          {problem.difficulty}
        </span>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400 text-xs font-bold uppercase tracking-wide">
          {problem.topic || "General"}
        </span>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="mt-4 leading-8 text-gray-300 whitespace-pre-wrap">
          {problem.statement || problem.description}
        </p>
      </section>

      {/* Dynamically Render Examples array if present, else fallback to free text */}
      {problem.examples && problem.examples.length > 0 ? (
        problem.examples.map((ex, idx) => (
          <section key={idx} className="mt-10">
            <h2 className="text-2xl font-semibold">Example {idx + 1}</h2>
            <pre className="mt-4 rounded-xl bg-[#252526] p-5 text-gray-300 font-mono text-sm border border-white/5 whitespace-pre-wrap">
              <strong>Input: </strong>{ex.input}{"\n"}
              <strong>Output: </strong>{ex.output}
              {ex.explanation && <>{"\n"}<strong>Explanation: </strong>{ex.explanation}</>}
            </pre>
          </section>
        ))
      ) : problem.example ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Example</h2>
          <pre className="mt-4 rounded-xl bg-[#252526] p-5 text-gray-300 font-mono text-sm border border-white/5 whitespace-pre-wrap">
            {problem.example}
          </pre>
        </section>
      ) : null}

      {problem.constraints && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Constraints</h2>
          {Array.isArray(problem.constraints) ? (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">
              {problem.constraints.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <pre className="mt-4 rounded-xl bg-[#252526] p-5 text-gray-300 font-mono text-sm border border-white/5 whitespace-pre-wrap">
              {problem.constraints}
            </pre>
          )}
        </section>
      )}
    </div>
  );
}

export default ProblemPanel;