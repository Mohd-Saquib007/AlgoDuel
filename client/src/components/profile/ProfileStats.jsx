import React from "react";
import { Code2 } from "lucide-react";

function ProfileStats({ user }) {
  const breakdown = user?.breakdown || { easy: 0, medium: 0, hard: 0 };
  
  const stats = [
    { label: "Easy Challenges", count: breakdown.easy, color: "text-green-400", bg: "bg-green-500/5", border: "border-green-500/10" },
    { label: "Medium Matrices", count: breakdown.medium, color: "text-yellow-400", bg: "bg-yellow-500/5", border: "border-yellow-500/10" },
    { label: "Hard Tree Nodes", count: breakdown.hard, color: "text-red-400", bg: "bg-red-500/5", border: "border-red-500/10" },
  ];

  return (
    <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-xl w-full">
      <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2 mb-6">
        <Code2 size={14} className="text-[#A3FF12]" /> Solving Statistics
      </h2>

      {/* Main Unique Counter Ring Frame */}
      <div className="flex flex-col items-center justify-center border-b border-white/5 pb-6 mb-6 text-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-dashed border-[#A3FF12]/20 bg-[#1E1E1E]/50 shadow-[0_0_30px_rgba(163,255,18,0.02)]">
          <div>
            <div className="text-4xl font-black text-[#A3FF12] font-mono tracking-tight">
              {user?.problemsSolved || 0}
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Unique Solved</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`flex items-center justify-between p-3.5 rounded-xl border ${stat.bg} ${stat.border}`}>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</span>
            <span className={`text-base font-black font-mono ${stat.color}`}>{stat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileStats;