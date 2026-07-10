import React from "react";
import { Sparkles } from "lucide-react";

function ProgressBar({ label, value, percentage, color }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="font-mono text-gray-200">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#1E1E1E] border border-white/5">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function PerformanceOverview({ user }) {
  const totalLangSubmissions = (user.languages || []).reduce((acc, curr) => acc + curr.count, 0);
  const langColors = ["bg-[#A3FF12]", "bg-cyan-400", "bg-purple-500", "bg-yellow-500", "bg-blue-500"];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      
      {/* Metrics List Block */}
      <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-xl">
        <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2 mb-6">
          <Sparkles size={14} className="text-[#A3FF12]" /> Arena Rankings
        </h2>
        <div className="space-y-4 text-sm font-semibold">
          <div className="flex justify-between border-b border-white/5 pb-3">
            <span className="text-gray-400">Current Rating</span>
            <span className="font-bold text-[#A3FF12] font-mono text-base">{user.rating}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-3">
            <span className="text-gray-400">Peak Tier Score</span>
            <span className="font-bold text-gray-200 font-mono">{user.highestRating}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-3">
            <span className="text-gray-400">Global Rank placement</span>
            <span className="font-bold text-gray-200 font-mono">#{user.globalRank || "---"}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-gray-400">Competitive Duels Played</span>
            <span className="font-bold text-gray-200 font-mono">{user.contestsPlayed}</span>
          </div>
        </div>
      </div>

      {/* Languages Segment Container Layout */}
      <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-xl">
        <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
          Languages Utilized
        </h2>
        <div className="space-y-4">
          {user.languages && user.languages.length > 0 ? (
            user.languages.map((lang, idx) => {
              const percentage = totalLangSubmissions > 0 ? ((lang.count / totalLangSubmissions) * 100).toFixed(0) : 0;
              return (
                <ProgressBar
                  key={lang.name}
                  label={lang.name}
                  value={`${percentage}% (${lang.count} sub)`}
                  percentage={parseFloat(percentage)}
                  color={langColors[idx % langColors.length]}
                />
              );
            })
          ) : (
            <p className="text-gray-500 text-xs py-4">No code language tokens mapped.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default PerformanceOverview;