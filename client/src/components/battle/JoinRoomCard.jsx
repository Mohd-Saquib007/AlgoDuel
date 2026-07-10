import { useState } from "react";
import { KeyRound } from "lucide-react";

function JoinRoomCard() {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-xl relative overflow-hidden">
      <div className="space-y-1 relative z-10">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <KeyRound size={16} className="text-[#A3FF12]" /> Join Custom Lobby
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Enter a 6-digit match verification code shared by your peer to cross-link workspaces.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row relative z-10">
        <input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter Custom Access Code Matrix..."
          className="flex-1 rounded-xl border border-white/5 bg-[#1E1E1E] px-4 py-3 text-sm text-white outline-none focus:border-[#A3FF12] placeholder-gray-600 transition duration-200"
        />

        <button className="rounded-xl bg-[#A3FF12] px-6 py-3 text-xs font-black text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider shadow-[0_0_20px_rgba(163,255,18,0.05)]">
          Connect Lobby
        </button>
      </div>
      <div className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />
    </div>
  );
}

export default JoinRoomCard;