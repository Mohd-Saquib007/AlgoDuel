import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swords } from "lucide-react";

function BattleFound() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  // Extract real-time room configuration payload safely
  const roomData = JSON.parse(sessionStorage.getItem("activeMatchRoom") || "{}");
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Determine who you are inside the match structure to assign sides correctly
  const isPlayer1 = roomData.player1?.userId === (localUser._id || localUser.id);
  const coreMe = isPlayer1 ? roomData.player1 : roomData.player2;
  const coreRival = isPlayer1 ? roomData.player2 : roomData.player1;

  // Fallback defaults if matching structures are loading slowly
  const myName = coreMe?.username || "You";
  const myRating = coreMe?.rating || 1200;
  const rivalName = coreRival?.username || "Opponent";
  const rivalRating = coreRival?.rating || 1200;

  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    if (countdown === 0) {
      navigate("/battle/room");
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#1E1E1E] flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-4xl rounded-3xl border border-white/5 bg-[#141414] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="text-center relative z-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A3FF12]/10 border border-[#A3FF12]/20 text-[#A3FF12] mb-4">
            <Swords size={26} />
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase sm:text-5xl">
            MATCH <span className="text-[#A3FF12]">FOUND</span>!
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Locking system synchronization vectors. Verify target acceptance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-7 items-center gap-y-8 relative z-10">
          {/* Dynamic You Container */}
          <div className="md:col-span-3 text-center space-y-4">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-[#A3FF12] text-3xl font-black text-black shadow-[0_0_30px_rgba(163,255,18,0.15)] tracking-tighter">
              {getInitials(myName)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{myName} (You)</h2>
              <p className="text-xs font-mono font-bold text-[#A3FF12] mt-1 uppercase tracking-wider bg-[#A3FF12]/5 border border-[#A3FF12]/10 px-2.5 py-0.5 rounded-md inline-block">
                Rating: {myRating}
              </p>
            </div>
          </div>

          <div className="md:col-span-1 text-center">
            <h1 className="text-5xl font-black text-gray-700 italic select-none tracking-tighter">VS</h1>
          </div>

          {/* Dynamic Rival Container */}
          <div className="md:col-span-3 text-center space-y-4">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-cyan-500 text-3xl font-black text-black shadow-[0_0_30px_rgba(6,182,212,0.15)] tracking-tighter">
              {getInitials(rivalName)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{rivalName}</h2>
              <p className="text-xs font-mono font-bold text-cyan-400 mt-1 uppercase tracking-wider bg-cyan-500/5 border border-cyan-500/10 px-2.5 py-0.5 rounded-md inline-block">
                Rating: {rivalRating}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Combat Commences In</p>
          <h2 className="mt-2 text-6xl font-black text-[#A3FF12] font-mono tracking-tighter animate-pulse">{countdown}</h2>
        </div>

        <button 
          onClick={() => navigate("/battle/room")}
          className="mt-10 w-full rounded-xl bg-[#A3FF12] py-4 text-sm font-black text-black transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wider"
        >
          Accept Challenge Engagement
        </button>
      </div>
    </div>
  );
}

export default BattleFound;