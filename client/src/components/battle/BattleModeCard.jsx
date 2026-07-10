import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function BattleModeCard({ title, description, buttonText, icon, onClick }) {
  const Icon = icon;

  return (
    <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 transition-all duration-300 hover:border-white/10 flex flex-col justify-between group shadow-xl">
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-[#A3FF12]/20 transition-all duration-300">
          <Icon size={20} className="text-gray-400 group-hover:text-[#A3FF12] transition-colors duration-300" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-[#A3FF12] transition-colors duration-200">
            {title}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        {onClick ? (
          <button
            onClick={onClick}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#A3FF12] px-5 py-3 text-xs font-bold text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto uppercase tracking-wide shadow-[0_0_20px_rgba(163,255,18,0.05)]"
          >
            {buttonText} <ArrowRight size={14} />
          </button>
        ) : (
          <Link
            to="/battle/queue"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/5 px-5 py-3 text-xs font-bold text-white transition-all duration-200 hover:bg-white/10 w-full sm:w-auto uppercase tracking-wide"
          >
            {buttonText} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default BattleModeCard;