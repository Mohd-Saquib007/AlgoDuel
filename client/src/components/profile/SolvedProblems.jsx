import { CheckCircle } from "lucide-react";

function SolvedProblems({ user }) {
  // Utility tool to calculate user-friendly time deltas dynamically on-render
  const timeAgoString = (dateInput) => {
    const delta = Math.floor((new Date() - new Date(dateInput)) / 1000);
    if (delta < 60) return "Just now";
    const minutes = Math.floor(delta / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const difficultyStyle = (level) => {
    switch (level) {
      case "Easy": return "bg-green-500/10 border-green-500/20 text-green-400";
      case "Medium": return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
      case "Hard": return "bg-red-500/10 border-red-500/20 text-red-400";
      default: return "bg-gray-500/10 border-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="mt-10 rounded-3xl border border-white/5 bg-[#252526]/40 backdrop-blur-md p-8">
      <h2 className="text-2xl font-bold tracking-tight">Solved Problems Stream</h2>
      <p className="mt-2 text-sm text-gray-400 font-medium">Your recently accepted problem submissions log history.</p>

      <div className="mt-8 space-y-4">
        {user.solvedProblems && user.solvedProblems.length > 0 ? (
          user.solvedProblems.map((problem, index) => (
            <div
              key={`${problem.title}-${index}`}
              className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#1E1E1E]/50 p-6 transition-all duration-300 hover:border-[#A3FF12]/30 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <CheckCircle size={24} className="text-[#A3FF12] drop-shadow-[0_0_10px_rgba(163,255,18,0.3)]" />
                <div>
                  <h3 className="text-lg font-bold text-gray-200">{problem.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 font-semibold">
                    Accepted {timeAgoString(problem.solvedAt)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 font-bold">
                <span className={`rounded-full border px-3.5 py-1.5 text-xs ${difficultyStyle(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 text-xs text-cyan-400">
                  {problem.language}
                </span>
                <span className="rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 px-3.5 py-1.5 text-xs text-[#A3FF12]">
                  Status: Pass
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm py-4">No logged history items for resolved algorithms found.</p>
        )}
      </div>
    </div>
  );
}

export default SolvedProblems;