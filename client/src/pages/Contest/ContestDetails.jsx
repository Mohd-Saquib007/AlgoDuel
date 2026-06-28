import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Users,
  Flag,
  ArrowRight,
} from "lucide-react";

function ContestDetails() {
  const problems = [
    {
      id: "A",
      title: "Warm Up",
      difficulty: "Easy",
    },
    {
      id: "B",
      title: "Array Challenge",
      difficulty: "Easy",
    },
    {
      id: "C",
      title: "Graph Traversal",
      difficulty: "Medium",
    },
    {
      id: "D",
      title: "Dynamic Programming",
      difficulty: "Hard",
    },
    {
      id: "E",
      title: "Ultimate Challenge",
      difficulty: "Hard",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <span className="rounded-full bg-[#A3FF12]/10 px-4 py-2 text-[#A3FF12]">
          Upcoming Contest
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Weekly Challenge #12
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-400">
          Test your coding skills against developers worldwide
          in this 5-problem contest.
        </p>

        {/* Contest Info */}

        <div className="mt-12 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-[#252526] p-6">

            <Calendar className="text-[#A3FF12]" />

            <p className="mt-4 text-gray-400">
              Starts In
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              2 Days
            </h3>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <Clock className="text-[#A3FF12]" />

            <p className="mt-4 text-gray-400">
              Duration
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              2 Hours
            </h3>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <Users className="text-[#A3FF12]" />

            <p className="mt-4 text-gray-400">
              Participants
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              1250
            </h3>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <Flag className="text-[#A3FF12]" />

            <p className="mt-4 text-gray-400">
              Problems
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              5
            </h3>

          </div>

        </div>

        {/* Rules */}

        <div className="mt-16 rounded-3xl bg-[#252526] p-8">

          <h2 className="text-3xl font-bold">
            Rules
          </h2>

          <ul className="mt-8 space-y-4 text-gray-300">

            <li>• Individual contest.</li>

            <li>• Standard ICPC penalty rules.</li>

            <li>• 5 coding problems.</li>

            <li>• Plagiarism leads to disqualification.</li>

            <li>• Rankings based on score and penalty.</li>

          </ul>

        </div>

        {/* Problems */}

        <div className="mt-16 rounded-3xl bg-[#252526] p-8">

          <h2 className="text-3xl font-bold">
            Contest Problems
          </h2>

          <div className="mt-8 space-y-4">

            {problems.map((problem) => (

              <div
                key={problem.id}
                className="flex items-center justify-between rounded-xl bg-[#1E1E1E] p-5"
              >

                <div>

                  <h3 className="text-xl font-semibold">
                    {problem.id}. {problem.title}
                  </h3>

                  <p className="mt-2 text-gray-400">
                    {problem.difficulty}
                  </p>

                </div>

                <ArrowRight className="text-[#A3FF12]" />

              </div>

            ))}

          </div>

        </div>

        {/* Register */}

        <Link
            to="/contests/workspace"
            className="mt-16 inline-flex rounded-2xl bg-[#A3FF12] px-10 py-4 text-lg font-bold text-black transition hover:scale-105"
        >
        Enter Contest
        </Link>

      </div>

    </div>
  );
}

export default ContestDetails;