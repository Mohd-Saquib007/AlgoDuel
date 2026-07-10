import { Sword, Users, Radio, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BattleModeCard from "../../components/battle/BattleModeCard";
import JoinRoomCard from "../../components/battle/JoinRoomCard";
import RecentBattleCard from "../../components/battle/RecentBattleCard";

const recentBattles = [
  { opponent: "Rahul", result: "Won", ratingChange: "+18" },
  { opponent: "Aryan", result: "Lost", ratingChange: "-9" },
  { opponent: "Aman", result: "Won", ratingChange: "+15" },
];

function BattleHome() {
  const navigate = useNavigate();

  const handleFindMatch = () => {
    navigate("/battle/queue");
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br' from-[#252526] to-[#141414] p-8 md:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A3FF12]/10 px-3 py-1 text-xs font-semibold text-[#A3FF12] uppercase tracking-wider">
              <Radio size={12} className="animate-pulse" /> Ranked Matchmaking
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl uppercase">
              BATTLE.<span className="text-[#A3FF12]">DUEL</span>.WIN
            </h1>
            <p className="mt-4 text-base text-gray-400 leading-relaxed">
              Step into the Arena. Challenge developers worldwide in real-time speed coding duels, wager rating metrics, and climb the leaderboard.
            </p>
          </div>
          
          {/* Live Global Network Metric Badges */}
          <div className="mt-8 flex flex-wrap gap-4 relative z-10">
            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#141414]/60 px-4 py-2.5 text-xs font-semibold tracking-wide text-gray-300">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
              PLAYERS ONLINE: <span className="text-[#A3FF12] font-mono">1,284</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#141414]/60 px-4 py-2.5 text-xs font-semibold tracking-wide text-gray-300">
              <Timer size={14} className="text-gray-400" />
              AVG QUEUE TIME: <span className="text-[#A3FF12] font-mono">8 SEC</span>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[#A3FF12]/5 blur-3xl" />
        </div>

        {/* Asymmetrical Battle Modes Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start">
          
          {/* Main Select Mode Panel Tiers */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <BattleModeCard
                icon={Sword}
                title="Classic Battle"
                description="Enter the competitive rank bracket. Challenge a random opponent with a similar Elo rating."
                buttonText="Find Ranked Match"
                onClick={handleFindMatch}
              />
              <BattleModeCard
                icon={Users}
                title="Private Battle"
                description="Generate an encrypted code session room to direct duel or practice alongside friends."
                buttonText="Create Custom Room"
              />
            </div>
            
            <div className="rounded-2xl border border-white/5 bg-[#141414]/40 p-4">
              <JoinRoomCard />
            </div>
          </div>

          {/* Right History Sidebar Widget Panel */}
          <div className="lg:col-span-1 rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-xl">
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
              Recent Combat Log
            </h2>
            <div className="space-y-3">
              {recentBattles.map((battle, index) => (
                <RecentBattleCard key={index} {...battle} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default BattleHome;