import { useEffect, useState } from "react";
import { Sword } from "lucide-react";

function BattleFound() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-[#252526] p-10">

        <div className="text-center">

          <Sword
            size={60}
            className="mx-auto text-[#A3FF12]"
          />

          <h1 className="mt-6 text-5xl font-bold">
            Match Found!
          </h1>

          <p className="mt-3 text-gray-400">
            Get ready for battle.
          </p>

        </div>

        <div className="mt-12 grid grid-cols-3 items-center">

          {/* You */}

          <div className="text-center">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#A3FF12] text-4xl font-bold text-black">
              MS
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Saquib
            </h2>

            <p className="mt-2 text-[#A3FF12]">
              Rating 1540
            </p>

          </div>

          {/* VS */}

          <div className="text-center">

            <h1 className="text-6xl font-black text-[#A3FF12]">
              VS
            </h1>

          </div>

          {/* Opponent */}

          <div className="text-center">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500 text-4xl font-bold text-black">
              AR
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Aryan
            </h2>

            <p className="mt-2 text-cyan-400">
              Rating 1565
            </p>

          </div>

        </div>

        <div className="mt-14 text-center">

          <p className="text-gray-400">
            Battle starts in
          </p>

          <h2 className="mt-4 text-7xl font-bold text-[#A3FF12]">
            {countdown}
          </h2>

        </div>

        <button className="mt-14 w-full rounded-2xl bg-[#A3FF12] py-4 text-xl font-bold text-black transition hover:scale-[1.02]">

          Accept Battle

        </button>

      </div>

    </div>
  );
}

export default BattleFound;