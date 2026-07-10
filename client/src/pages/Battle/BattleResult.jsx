import { Trophy, Frown, RotateCcw, Home, Activity, Zap, Cpu, Clock, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

function BattleResult() {
  // Pull down the active game outcome configurations parsed out of the server socket link
  const summary = JSON.parse(sessionStorage.getItem("battleOutcomeSummary") || "{}");
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  const isWin = summary.verdict === "Victory";
  const rivalName = summary.loserName && summary.winnerName 
    ? (localUser.username === summary.winnerName ? summary.loserName : summary.winnerName)
    : "Opponent";

  // Dynamic values calculation metrics config
  const currentRating = localUser.rating || 1540;
  const ratingDelta = summary.ratingChange || 18;
  const oldRating = isWin ? currentRating - ratingDelta : currentRating + ratingDelta;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#1E1E1E] flex items-center justify-center px-6 text-white py-12">
      <div className="w-full max-w-3xl rounded-3xl border border-white/5 bg-[#141414] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Dynamic State Header Block */}
        <div className="text-center space-y-4 relative z-10">
          <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border ${
            isWin 
              ? "bg-[#A3FF12]/10 border-[#A3FF12]/20 text-[#A3FF12] shadow-[0_0_20px_rgba(163,255,18,0.1)]" 
              : "bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,71,67,0.1)]"
          }`}>
            {isWin ? <Trophy size={32} /> : <Frown size={32} />}
          </div>

          <h1 className={`text-4xl sm:text-5xl font-black tracking-tight uppercase ${isWin ? "text-[#A3FF12]" : "text-red-400"}`}>
            {isWin ? "Victory!" : "Defeat"}
          </h1>

          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed font-medium">
            {isWin 
              ? `Outstanding compiling execution sequence. You defeated ${rivalName} in the coding matrix.` 
              : `Your rival ${rivalName} passed all compiler test instances before your script was completed.`}
          </p>
        </div>

        {/* Dynamic Analytics Data Matrix Grid Layout */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 relative z-10">
          
          {/* Rating Delta Dashboard Vector */}
          <div className="rounded-2xl border border-white/5 bg-[#1E1E1E]/40 p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${isWin ? "bg-[#A3FF12]/5 border-[#A3FF12]/10 text-[#A3FF12]" : "bg-red-500/5 border-red-500/10 text-red-400"}`}>
              <Activity size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rating Tier Change</p>
              <h2 className="text-xl font-black text-white font-mono mt-0.5 tracking-tight">
                {oldRating} → {currentRating}
              </h2>
              <p className={`text-xs font-bold font-mono mt-0.5 ${isWin ? "text-green-400" : "text-red-400"}`}>
                {isWin ? `+${ratingDelta}` : `-${ratingDelta}`} Points
              </p>
            </div>
          </div>

          {/* Test Case Target Metrics */}
          <div className="rounded-2xl border border-white/5 bg-[#1E1E1E]/40 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl border bg-white/5 border-white/5 text-gray-400">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Problem Verification</p>
              <h2 className="text-xl font-black text-white font-mono mt-0.5 tracking-tight">
                {isWin ? "1 / 1" : "0 / 1"}
              </h2>
              <p className="text-xs font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">
                {isWin ? "Accepted Verdict" : "Unfinished Script"}
              </p>
            </div>
          </div>

          {/* Compiled Execution Duration Trace */}
          <div className="rounded-2xl border border-white/5 bg-[#1E1E1E]/40 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl border bg-white/5 border-white/5 text-gray-400">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Battle Duration</p>
              <h2 className="text-xl font-black text-white font-mono mt-0.5 tracking-tight">
                {summary.duration || "13m 42s"}
              </h2>
              <p className="text-xs font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">Elapsed Room Time</p>
            </div>
          </div>

          {/* Core Hardware Metrics Layout (Combined Box for Execution Dimensions) */}
          <div className="rounded-2xl border border-white/5 bg-[#1E1E1E]/40 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl border bg-white/5 border-white/5 text-gray-400">
              <Cpu size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Compiler Performance</p>
              <h2 className="text-xl font-black text-white font-mono mt-0.5 tracking-tight">
                {isWin ? summary.runtime : "--"}
              </h2>
              <p className="text-xs font-bold text-gray-500 font-mono mt-0.5 tracking-wide">
                {isWin ? `@ ${summary.memory}` : "No execution logs"}
              </p>
            </div>
          </div>

        </div>

        {/* Action Footers navigation link hubs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row relative z-10">
          <Link
            to="/dashboard"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-4 text-sm font-bold text-gray-300 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
          >
            <Home size={16} /> Dashboard Home
          </Link>

          <Link
            to="/battle"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#A3FF12] py-4 text-sm font-black text-black transition hover:brightness-110 active:scale-[0.98] uppercase tracking-wide shadow-[0_0_25px_rgba(163,255,18,0.15)]"
          >
            <RotateCcw size={16} /> Battle Again
          </Link>
        </div>

        {/* Ambient background blur colors */}
        <div className={`absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-3xl opacity-40 pointer-events-none -z-10 ${
          isWin ? "bg-[#A3FF12]" : "bg-red-500"
        }`} />
      </div>
    </div>
  );
}

export default BattleResult;