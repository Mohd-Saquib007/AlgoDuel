import { Trophy, Flame, Swords, Medal, Rocket, Target } from "lucide-react";

function Achievements({ user }) {
  // Inline Evaluation Engine configuration matrices to compute locking rules dynamically on-render
  const badgesConfiguration = [
    {
      icon: Trophy,
      title: "100 Problems Solved",
      description: "Solved more than 100 platform coding problem statements.",
      unlocked: (user.problemsSolved >= 100),
    },
    {
      icon: Flame,
      title: "30 Day Streak",
      description: "Maintained an active compilation streak loop for 30 consecutive days.",
      unlocked: (user.currentStreak >= 30),
    },
    {
      icon: Swords,
      title: "Battle Champion",
      description: "Secure victory across 50 arena-tier coding battle maps.",
      unlocked: (user.battleWins >= 50),
    },
    {
      icon: Medal,
      title: "Top 500 Global Elite",
      description: "Break rank boundaries into the top global leaderboard positions.",
      unlocked: (user.globalRank > 0 && user.globalRank <= 500),
    },
    {
      icon: Rocket,
      title: "Contest Pioneer",
      description: "Lock in participation and placement scores for your first contest event.",
      unlocked: (user.contestsPlayed >= 1),
    },
    {
      icon: Target,
      title: "High Performance Velocity",
      description: "Reach an advanced rating index threshold exceeding 1600 points.",
      unlocked: (user.highestRating >= 1600),
    },
  ];

  return (
    <div className="mt-10 rounded-3xl border border-white/5 bg-[#252526]/40 backdrop-blur-md p-8">
      <h2 className="text-2xl font-bold tracking-tight">Unlocked Accomplishments</h2>
      <p className="mt-2 text-sm text-gray-400 font-medium">Milestones you've unlocked during your AlgoDuel journey.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {badgesConfiguration.map((badge) => {
          const Icon = badge.icon;

          return (
            <div
              key={badge.title}
              className={`rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 ${
                badge.unlocked
                  ? "border-[#A3FF12]/20 bg-[#1E1E1E]/80 shadow-[0_4px_25px_rgba(163,255,18,0.02)]"
                  : "border-white/5 bg-[#1A1A1A]/40 opacity-40 select-none"
              }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl border ${
                badge.unlocked ? "bg-[#A3FF12]/5 border-[#A3FF12]/20" : "bg-neutral-800/40 border-white/5"
              }`}>
                <Icon size={24} className={badge.unlocked ? "text-[#A3FF12]" : "text-gray-500"} />
              </div>

              <h3 className="mt-6 text-lg font-bold tracking-wide text-gray-200">{badge.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400 font-medium">{badge.description}</p>

              <div className="mt-5">
                {badge.unlocked ? (
                  <span className="rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 px-3.5 py-1.5 text-xs font-bold text-[#A3FF12]">
                    Unlocked
                  </span>
                ) : (
                  <span className="rounded-full bg-neutral-800/60 border border-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-500">
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