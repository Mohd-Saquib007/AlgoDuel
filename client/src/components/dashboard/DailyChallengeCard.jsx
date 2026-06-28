import { Flame, ArrowRight } from "lucide-react";

function DailyChallengeCard() {
  return (
    <div className="mt-20 rounded-3xl border border-[#A3FF12]/20 bg-gradient-to-r from-[#252526] to-[#1E1E1E] p-8">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-[#A3FF12]/10 p-3">

          <Flame
            size={26}
            className="text-[#A3FF12]"
          />

        </div>

        <div>

          <p className="text-[#A3FF12] font-medium">
            Daily Challenge
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Longest Increasing Subsequence
          </h2>

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <span className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
          Medium
        </span>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
          Dynamic Programming
        </span>

        <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
          45 mins
        </span>

      </div>

      <p className="mt-8 max-w-3xl leading-8 text-gray-400">
        Improve your dynamic programming skills by solving today's
        featured challenge. Complete it to earn bonus rating and
        maintain your daily streak.
      </p>

      <button
        className="
          mt-10
          flex
          items-center
          gap-2
          rounded-xl
          bg-[#A3FF12]
          px-6
          py-3
          font-semibold
          text-black
          transition-all
          hover:gap-3
        "
      >

        Solve Now

        <ArrowRight size={18} />

      </button>

    </div>
  );
}

export default DailyChallengeCard;