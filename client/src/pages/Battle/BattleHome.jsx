import {
  Sword,
  Users,
} from "lucide-react";

import BattleModeCard from "../../components/battle/BattleModeCard";
import JoinRoomCard from "../../components/battle/JoinRoomCard";
import RecentBattleCard from "../../components/battle/RecentBattleCard";

const recentBattles = [
  {
    opponent: "Rahul",
    result: "Won",
    ratingChange: "+18",
  },
  {
    opponent: "Aryan",
    result: "Lost",
    ratingChange: "-9",
  },
  {
    opponent: "Aman",
    result: "Won",
    ratingChange: "+15",
  },
];

function BattleHome() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-5xl font-bold">
          ⚔ Coding Battles
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-400">
          Compete against developers around the world in
          real-time coding battles.
        </p>

        <div className="mt-6 flex flex-wrap gap-6">

          <div className="rounded-xl bg-[#252526] px-5 py-3">

            🟢 Players Online

            <span className="ml-2 font-semibold text-[#A3FF12]">
              1,284
            </span>

          </div>

          <div className="rounded-xl bg-[#252526] px-5 py-3">

            ⚡ Avg Queue Time

            <span className="ml-2 font-semibold text-[#A3FF12]">
              8 sec
            </span>

          </div>

        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">

          <BattleModeCard
            icon={Sword}
            title="Classic Battle"
            description="Challenge a random player with a similar rating."
            buttonText="Find Match"
          />

          <BattleModeCard
            icon={Users}
            title="Private Battle"
            description="Create a private room and invite your friends."
            buttonText="Create Room"
          />

        </div>

        <div className="mt-12">

          <JoinRoomCard />

        </div>

        <div className="mt-16">

          <h2 className="text-3xl font-bold">
            Recent Battles
          </h2>

          <div className="mt-6 space-y-4">

            {recentBattles.map((battle, index) => (

              <RecentBattleCard
                key={index}
                {...battle}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default BattleHome;