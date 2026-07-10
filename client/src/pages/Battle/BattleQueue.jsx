import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, XCircle, Shield, Globe, Clock } from "lucide-react";
import socket from "../../services/socket";

function BattleQueue() {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  
  // Safely extract logged-in profile metrics from local cache memory
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userRating = localUser.rating || 1200;

  useEffect(() => {
    // 1. Establish live link connection to backend server cluster
    if (!socket.connected) socket.connect();

    // 2. Emit user profile to register into the matchmaking pool array
    socket.emit("join_queue", {
      userId: localUser._id || localUser.id || `guest_${Math.random()}`,
      username: localUser.username || "Anonymous Coder",
      rating: userRating
    });

    // 3. Keep track of queue time elapsed
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // 4. Listen for successful match confirmation event from backend
    socket.on("match_found", (roomPayload) => {
      console.log("Match successfully verified by socket orchestration:", roomPayload);
      
      // Cache the room metadata payload safely so BattleFound and BattleRoom can read it
      sessionStorage.setItem("activeMatchRoom", JSON.stringify(roomPayload));
      
      // Auto-route both screens immediately into the acceptance countdown cockpit
      navigate("/battle/found");
    });

    // Cleanup listeners and disconnect state hooks on unmount
    return () => {
      clearInterval(timer);
      socket.off("match_found");
    };
  }, [navigate, localUser, userRating]);

  const handleCancel = () => {
    // Tell the backend to drop this socket out of the pool
    socket.emit("leave_queue", { userId: localUser._id || localUser.id });
    navigate("/battle");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#1E1E1E] flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/5 bg-[#141414] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        
        {/* Pulsing Radar Animation */}
        <div className="relative flex items-center justify-center h-24 w-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-[#A3FF12]/10 animate-ping duration-1000" />
          <div className="absolute h-16 w-16 rounded-full bg-[#A3FF12]/5 border border-[#A3FF12]/20 animate-pulse" />
          <Loader2 size={44} className="animate-spin text-[#A3FF12] relative z-10" />
        </div>

        <h1 className="mt-8 text-3xl font-black tracking-tight uppercase">
          SEARCHING FOR <span className="text-[#A3FF12]">OPPONENT</span>...
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
          Scanning live nodes to match your exact Elo skill division.
        </p>

        {/* Real-Time Parameter Counters */}
        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-[#1E1E1E] p-4 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1 mx-auto">
              <Shield size={12} className="text-[#A3FF12]" /> Your Rating
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#A3FF12] font-mono">{userRating}</h2>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#1E1E1E] p-4 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1 mx-auto">
              <Globe size={12} className="text-gray-400" /> Delta Range
            </p>
            <h2 className="mt-2 text-2xl font-black text-white font-mono">±100 Elo</h2>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#1E1E1E] p-4 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1 mx-auto">
              <Clock size={12} className="text-gray-400" /> Search Time
            </p>
            <h2 className="mt-2 text-2xl font-black text-white font-mono">{seconds}s</h2>
          </div>
        </div>

        {/* Loading progress bars layout */}
        <div className="mt-10 space-y-2">
          <div className="h-1.5 w-full bg-[#1E1E1E] border border-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full rounded-full bg-gradient-to-r' from-[#A3FF12]/20 via-[#A3FF12] to-[#A3FF12]/20 animate-pulse" />
          </div>
          <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider animate-pulse">
            Awaiting cluster confirmation link hooks...
          </p>
        </div>

        <button 
          onClick={handleCancel}
          className="mt-10 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-xs font-bold text-red-400 transition hover:bg-red-500/10 hover:border-red-500/20"
        >
          <XCircle size={14} /> Cancel Search Match
        </button>

        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#A3FF12]/5 blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}

export default BattleQueue;