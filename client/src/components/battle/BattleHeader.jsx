import React, { useState, useEffect } from "react";
import { Timer, User } from "lucide-react";

function BattleHeader({ opponentName = "Opponent", passedCases = 0, totalCases = 1, opponentPassed = 0 }) {
  // 🟢 FIXED: Actively handles countdown reduction tracks
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const playerPercentage = totalCases > 0 ? (passedCases / totalCases) * 100 : 0;
  const opponentPercentage = totalCases > 0 ? (opponentPassed / totalCases) * 100 : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 bg-[#141414] px-6 py-4 gap-4 select-none">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A3FF12]/10 border border-[#A3FF12]/20 text-[#A3FF12]">
          <Timer size={18} className={timeLeft > 60 ? "animate-pulse" : "animate-bounce text-red-500"} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Time Remaining</p>
          <h2 className="text-xl font-black text-[#A3FF12] font-mono tracking-tight">{formatTime(timeLeft)}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-[#1E1E1E] border border-white/5 px-4 py-2 text-xs font-semibold text-gray-300">
        YOU <span className="text-gray-600 font-black italic mx-1">VS</span> {opponentName?.toUpperCase()}
      </div>

      <div className="w-full sm:w-72 space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <span className="text-[#A3FF12]">You: {passedCases}/{totalCases}</span>
          <span className="text-cyan-400">Rival: {opponentPassed}/{totalCases}</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-[#1E1E1E] rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-[#A3FF12] rounded-full transition-all duration-300" style={{ width: `${playerPercentage}%` }} />
          </div>
          <div className="h-1.5 w-full bg-[#1E1E1E] rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-cyan-400 rounded-full transition-all duration-300" style={{ width: `${opponentPercentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleHeader;