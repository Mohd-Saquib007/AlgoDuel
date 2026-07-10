import { CheckCircle2 } from "lucide-react";

function SolvedProblems({ user }) {
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

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="max-h-380px overflow-y-auto pr-1 space-y-3 custom-scrollbar">
      {user.solvedProblems && user.solvedProblems.length > 0 ? (
        user.solvedProblems.map((problem, index) => (
          <div
            key={`${problem.title}-${index}`}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E1E1E]/40 p-4 transition duration-200 hover:border-white/10"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#A3FF12] shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-200 line-clamp-1">{problem.title}</h4>
                <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                  Accepted {timeAgoString(problem.solvedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs font-bold font-mono ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="text-[10px] font-extrabold bg-[#252526] px-1.5 py-0.5 text-cyan-400 rounded uppercase">
                {problem.language}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-xs text-center py-8">No logged history records found.</p>
      )}
    </div>
  );
}

export default SolvedProblems;