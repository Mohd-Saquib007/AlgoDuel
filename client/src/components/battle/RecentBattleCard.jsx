import React from "react";
import { Swords, Plus, Minus } from "lucide-react";

function RecentBattleCard({ opponent, result, ratingChange }) {
  const isWin = result?.toLowerCase() === "won";

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E1E1E]/40 p-4 transition duration-200 hover:border-white/10">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
          isWin ? "bg-green-500/5 border-green-500/10 text-green-400" : "bg-red-500/5 border-red-500/10 text-red-400"
        }`}>
          <Swords size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-200">
            {isWin ? "Victory" : "Defeat"} <span className="text-gray-500 font-medium text-xs">vs {opponent}</span>
          </h3>
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
            Ranked Match Duel
          </p>
        </div>
      </div>

      <span className={`text-sm font-black font-mono flex items-center ${isWin ? "text-green-400" : "text-red-400"}`}>
        {isWin ? <Plus size={12} className="inline" /> : <Minus size={12} className="inline" />}
        {ratingChange?.replace(/[^0-9]/g, "")} Elo
      </span>
    </div>
  );
}

export default RecentBattleCard;