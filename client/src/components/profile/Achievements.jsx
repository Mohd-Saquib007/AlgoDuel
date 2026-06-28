import {
  Trophy,
  Flame,
  Swords,
  Medal,
  Rocket,
  Target,
} from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "100 Problems Solved",
    description: "Solved more than 100 coding problems.",
    unlocked: true,
  },
  {
    icon: Flame,
    title: "30 Day Streak",
    description: "Maintained a coding streak for 30 days.",
    unlocked: true,
  },
  {
    icon: Swords,
    title: "Battle Champion",
    description: "Won 50 coding battles.",
    unlocked: false,
  },
  {
    icon: Medal,
    title: "Top 10%",
    description: "Reached the top 10% of all players.",
    unlocked: false,
  },
  {
    icon: Rocket,
    title: "Contest Winner",
    description: "Won your first coding contest.",
    unlocked: false,
  },
  {
    icon: Target,
    title: "Perfect Accuracy",
    description: "Solved 20 problems without a wrong submission.",
    unlocked: true,
  },
];

function Achievements() {
  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-[#252526] p-8">

      <h2 className="text-3xl font-bold">
        Achievements
      </h2>

      <p className="mt-2 text-gray-400">
        Milestones you've unlocked during your AlgoDuel journey.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {achievements.map((badge) => {
          const Icon = badge.icon;

          return (
            <div
              key={badge.title}
              className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                badge.unlocked
                  ? "border-[#A3FF12]/30 bg-[#1E1E1E]"
                  : "border-white/10 bg-[#1A1A1A] opacity-60"
              }`}
            >

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  badge.unlocked
                    ? "bg-[#A3FF12]/10"
                    : "bg-gray-700"
                }`}
              >

                <Icon
                  size={28}
                  className={
                    badge.unlocked
                      ? "text-[#A3FF12]"
                      : "text-gray-400"
                  }
                />

              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {badge.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {badge.description}
              </p>

              <div className="mt-6">

                {badge.unlocked ? (
                  <span className="rounded-full bg-[#A3FF12]/10 px-4 py-2 text-sm text-[#A3FF12]">
                    Unlocked
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-700 px-4 py-2 text-sm text-gray-300">
                    Locked
                  </span>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Achievements;