import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function ProblemCard({
  title,
  difficulty,
  topic,
  acceptance,
  description,
}) {
  const difficultyColor = {
    Easy: "text-green-400 bg-green-500/10",
    Medium: "text-yellow-400 bg-yellow-500/10",
    Hard: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#252526] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A3FF12]/40">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-2xl font-semibold">
            {title}
          </h3>

          <div className="mt-3 flex gap-3">

            <span
              className={`rounded-full px-3 py-1 text-sm ${difficultyColor[difficulty]}`}
            >
              {difficulty}
            </span>

            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
              {topic}
            </span>

          </div>

        </div>

        <Link
            to="/problems/1"
            className="rounded-xl bg-[#A3FF12] px-4 py-2 font-medium text-black transition hover:scale-105"
        >
        Solve
        </Link>

      </div>

      <p className="mt-6 leading-7 text-gray-400">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <p className="text-sm text-gray-500">
          Acceptance {acceptance}
        </p>

        <ArrowRight
          size={18}
          className="text-[#A3FF12]"
        />

      </div>

    </div>
  );
}

export default ProblemCard;