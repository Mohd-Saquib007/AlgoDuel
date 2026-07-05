import { useNavigate } from "react-router-dom";

function ProblemCard({ title, difficulty, topic, slug }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-[#252526] p-6 rounded-2xl border border-white/10">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-gray-400">{topic}</span>
      </div>
      
      {/* FIXED: Routes cleanly to your dynamic URL workspace layout */}
      <button 
        onClick={() => navigate(`/workspace/${slug}`)} 
        className="bg-[#A3FF12] text-black px-5 py-2 rounded-xl font-semibold transition hover:opacity-90"
      >
        Solve
      </button>
    </div>
  );
}

export default ProblemCard;