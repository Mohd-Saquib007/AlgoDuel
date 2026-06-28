import { useState } from "react";

function JoinRoomCard() {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#252526] p-6">

      <h2 className="text-2xl font-semibold">
        Join Private Room
      </h2>

      <p className="mt-2 text-gray-400">
        Enter a room code shared by your friend.
      </p>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">

        <input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter Room Code"
          className="flex-1 rounded-xl border border-white/10 bg-[#1E1E1E] px-4 py-3 outline-none focus:border-[#A3FF12]"
        />

        <button className="rounded-xl bg-[#A3FF12] px-6 py-3 font-semibold text-black transition hover:brightness-110">
          Join Room
        </button>

      </div>

    </div>
  );
}

export default JoinRoomCard;