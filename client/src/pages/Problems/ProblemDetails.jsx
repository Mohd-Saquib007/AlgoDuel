import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// FIXED: Added reference slug here to match dataset configurations
const problem = {
  slug: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  topic: "Array",
  acceptance: "52%",
  description:
    "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to the target.",

  example: `Input:
nums = [2,7,11,15]
target = 9

Output:
[0,1]

Explanation:
nums[0] + nums[1] = 9`,

  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "Exactly one valid answer exists.",
  ],

  tags: [
    "Array",
    "Hash Map",
  ],
};

function ProblemDetails() {
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
          <h1 className="text-5xl font-bold">
            {problem.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-400">
              {problem.difficulty}
            </span>

            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
              {problem.topic}
            </span>

            <span className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-400">
              Acceptance {problem.acceptance}
            </span>
          </div>
        </div>

        {/* Description section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Description</h2>
          <p className="mt-5 leading-8 text-gray-300">
            {problem.description}
          </p>
        </section>

        {/* Example card block container */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Example</h2>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#252526] p-6 text-gray-300 whitespace-pre-wrap">
            {problem.example}
          </pre>
        </section>

        {/* Constraints structural arrays mapping */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Constraints</h2>
          <ul className="mt-5 space-y-3">
            {problem.constraints.map((item) => (
              <li key={item} className="text-gray-300">
                • {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tags metadata map */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold">Tags</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#252526] px-4 py-2 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Button Action */}
        <div className="mt-16">
          {/* FIXED: Dynamic workspace navigation router path with explicit target template formatting */}
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