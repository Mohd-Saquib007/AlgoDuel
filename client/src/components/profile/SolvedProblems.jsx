import { CheckCircle } from "lucide-react";

const solvedProblems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    language: "C++",
    solvedAt: "2 days ago",
  },
  {
    title: "Binary Search",
    difficulty: "Easy",
    language: "C++",
    solvedAt: "4 days ago",
  },
  {
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    language: "C++",
    solvedAt: "5 days ago",
  },
  {
    title: "Number of Islands",
    difficulty: "Medium",
    language: "Python",
    solvedAt: "1 week ago",
  },
  {
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    language: "Java",
    solvedAt: "2 weeks ago",
  },
];

function difficultyStyle(level) {
  switch (level) {
    case "Easy":
      return "bg-green-500/10 text-green-400";
    case "Medium":
      return "bg-yellow-500/10 text-yellow-400";
    case "Hard":
      return "bg-red-500/10 text-red-400";
    default:
      return "bg-gray-500/10 text-gray-400";
  }
}

function SolvedProblems() {
  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-[#252526] p-8">

      <h2 className="text-3xl font-bold">
        Solved Problems
      </h2>

      <p className="mt-2 text-gray-400">
        Your recently accepted submissions.
      </p>

      <div className="mt-8 space-y-5">

        {solvedProblems.map((problem) => (
          <div
            key={problem.title}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#1E1E1E] p-6 transition hover:border-[#A3FF12]/40 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">

              <CheckCircle
                size={28}
                className="text-[#A3FF12]"
              />

              <div>

                <h3 className="text-xl font-semibold">
                  {problem.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Solved {problem.solvedAt}
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <span
                className={`rounded-full px-4 py-2 text-sm ${difficultyStyle(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>

              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                {problem.language}
              </span>

              <span className="rounded-full bg-[#A3FF12]/10 px-4 py-2 text-sm text-[#A3FF12]">
                Accepted
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SolvedProblems;