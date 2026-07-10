import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function ProblemCard({ title, difficulty, topic, slug }) {
  const navigate = useNavigate();

  // Maps clean distinct custom color schemes across varying string values
  const getDifficultyStyles = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "hard": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#141414] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 gap-4 group">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white group-hover:text-[#A3FF12] transition-colors duration-200">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${getDifficultyStyles(difficulty)}`}>
            {difficulty}
          </span>
          <span className="text-xs font-medium text-gray-500 rounded-md bg-[#252526] px-2 py-0.5">
            {topic || "General"}
          </span>
        </div>
      </div>
      
      <button 
        onClick={() => navigate(`/workspace/${slug}`)} 
        className="inline-flex items-center justify-center gap-1 bg-[#A3FF12] text-black px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
      >
        Solve Challenge <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default ProblemCard;