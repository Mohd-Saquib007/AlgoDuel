import { Trophy, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

function BattleResult() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#252526] p-10">

        <div className="text-center">

          <Trophy
            size={70}
            className="mx-auto text-yellow-400"
          />

          <h1 className="mt-6 text-5xl font-bold">
            Victory!
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            You defeated Aryan in the coding battle.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl bg-[#1E1E1E] p-6">

            <p className="text-gray-400">
              Rating
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              1540 → 1558
            </h2>

            <p className="mt-2 text-green-400">
              +18 Rating
            </p>

          </div>

          <div className="rounded-2xl bg-[#1E1E1E] p-6">

            <p className="text-gray-400">
              Problems Solved
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              1 / 1
            </h2>

          </div>

          <div className="rounded-2xl bg-[#1E1E1E] p-6">

            <p className="text-gray-400">
              Runtime
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              97 ms
            </h2>

          </div>

          <div className="rounded-2xl bg-[#1E1E1E] p-6">

            <p className="text-gray-400">
              Memory
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              15.2 MB
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-[#1E1E1E] p-6">

          <p className="text-gray-400">
            Battle Duration
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            13m 42s
          </h2>

        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row">

          <Link
            to="/dashboard"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-4 transition hover:bg-white/10"
          >
            <Home size={20} />

            Dashboard
          </Link>

          <Link
            to="/battle"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#A3FF12] py-4 font-semibold text-black transition hover:brightness-110"
          >
            <RotateCcw size={20} />

            Battle Again
          </Link>

        </div>

      </div>

    </div>
  );
}

export default BattleResult;