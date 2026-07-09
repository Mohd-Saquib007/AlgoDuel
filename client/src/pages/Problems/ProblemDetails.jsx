import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

function ProblemDetails() {
  const { id } = useParams(); // Maps to the /problems/:id path token parameter
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/problems/${id}`);
        if (res.data && res.data.data) {
          setProblem(res.data.data);
        } else {
          setProblem(res.data);
        }
      } catch (err) {
        console.error("Error retrieving problem details record document:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1E1E1E] text-white">
        <div className="text-lg animate-pulse">Loading problem specifications...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1E1E1E] text-white">
        <div className="text-lg text-red-400">Problem specs offline or not found inside database index.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        
        {/* Back navigation */}
        <Link
          to="/problems"
          className="mb-8 inline-flex items-center gap-2 text-[#A3FF12] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Problems
        </Link>

        {/* Header content metadata grids */}
        <div className="mt-4">
          <h1 className="text-5xl font-bold">{problem.title}</h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-400 text-xs font-bold uppercase tracking-wide">
              {problem.difficulty}
            </span>

            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400 text-xs font-bold uppercase tracking-wide">
              {problem.topic || "General"}
            </span>

            {problem.acceptance && (
              <span className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-400 text-xs font-bold uppercase tracking-wide">
                Acceptance {problem.acceptance}
              </span>
            )}
          </div>
        </div>

        {/* Description section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Description</h2>
          <p className="mt-5 leading-8 text-gray-300 whitespace-pre-wrap">
            {problem.statement || problem.description}
          </p>
        </section>

        {/* Example card block container */}
        {problem.examples && problem.examples.length > 0 ? (
          problem.examples.map((ex, idx) => (
            <section key={idx} className="mt-12">
              <h2 className="text-3xl font-bold">Example {idx + 1}</h2>
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#252526] p-6 text-gray-300 font-mono text-sm whitespace-pre-wrap border border-white/5">
                <strong>Input:</strong> {ex.input}{"\n\n"}
                <strong>Output:</strong> {ex.output}
                {ex.explanation && <>{"\n\n"}<strong>Explanation:</strong> {ex.explanation}</>}
              </pre>
            </section>
          ))
        ) : problem.example ? (
          <section className="mt-12">
            <h2 className="text-3xl font-bold">Example</h2>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#252526] p-6 text-gray-300 font-mono text-sm whitespace-pre-wrap border border-white/5">
              {problem.example}
            </pre>
          </section>
        ) : null}

        {/* Constraints structural arrays mapping */}
        {problem.constraints && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold">Constraints</h2>
            {Array.isArray(problem.constraints) ? (
              <ul className="mt-5 space-y-3">
                {problem.constraints.map((item, idx) => (
                  <li key={idx} className="text-gray-300">• {item}</li>
                ))}
              </ul>
            ) : (
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#252526] p-6 text-gray-300 font-mono text-sm whitespace-pre-wrap border border-white/5">
                {problem.constraints}
              </pre>
            )}
          </section>
        )}

        {/* Tags metadata map */}
        {problem.tags && problem.tags.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold">Tags</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {problem.tags.map((tag, idx) => (
                <span key={idx} className="rounded-full bg-[#252526] px-4 py-2 text-gray-300 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Button Action */}
        <div className="mt-16">
          <Link
            to={`/workspace/${problem.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#A3FF12] px-7 py-4 font-semibold text-black transition hover:scale-105"
          >
            Solve Problem →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ProblemDetails;