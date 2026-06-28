import {
  Clock,
  Trophy,
} from "lucide-react";

import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";

const problems = [
  "A. Warm Up",
  "B. Array Challenge",
  "C. Graph Traversal",
  "D. Dynamic Programming",
  "E. Ultimate Challenge",
];

function ContestWorkspace() {
  return (
    <div className="h-screen bg-[#1E1E1E] text-white">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-6 py-4">

        <div>

          <div className="flex items-center gap-3">

            <Trophy
              size={24}
              className="text-[#A3FF12]"
            />

            <h1 className="text-2xl font-bold">
              Weekly Challenge #12
            </h1>

          </div>

          <p className="mt-2 text-gray-400">
            Problem A of 5
          </p>

        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#1E1E1E] px-5 py-3">

          <Clock className="text-[#A3FF12]" />

          <span className="text-xl font-bold">
            01:48:23
          </span>

        </div>

      </div>

      {/* Main Layout */}

      <div className="grid h-[calc(100vh-80px)] grid-cols-[260px_1fr_1fr]">

        {/* Sidebar */}

        <div className="border-r border-white/10 bg-[#252526] p-5">

          <h2 className="mb-6 text-xl font-semibold">
            Problems
          </h2>

          <div className="space-y-3">

            {problems.map((problem, index) => (

              <button
                key={problem}
                className={`w-full rounded-xl px-4 py-3 text-left transition ${
                  index === 0
                    ? "bg-[#A3FF12] text-black"
                    : "bg-[#1E1E1E] hover:bg-[#303030]"
                }`}
              >
                {problem}
              </button>

            ))}

          </div>

        </div>

        {/* Problem */}

        <div className="overflow-y-auto border-r border-white/10">

          <ProblemPanel />

        </div>

        {/* Editor */}

        <div className="grid grid-rows-[1fr_240px]">

          <CodeEditor />

          <ConsolePanel />

        </div>

      </div>

    </div>
  );
}

export default ContestWorkspace;