import { LoaderCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

function BattleQueue() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#252526] p-10 text-center">

        <LoaderCircle
          size={70}
          className="mx-auto animate-spin text-[#A3FF12]"
        />

        <h1 className="mt-8 text-4xl font-bold">
          Finding an Opponent...
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Searching for players near your current rating.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-[#1E1E1E] p-5">

            <p className="text-gray-400">
              Your Rating
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#A3FF12]">
              1540
            </h2>

          </div>

          <div className="rounded-xl bg-[#1E1E1E] p-5">

            <p className="text-gray-400">
              Rating Range
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              ±100
            </h2>

          </div>

          <div className="rounded-xl bg-[#1E1E1E] p-5">

            <p className="text-gray-400">
              Queue Time
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {seconds}s
            </h2>

          </div>

        </div>

        <div className="mt-10">

          <div className="h-3 overflow-hidden rounded-full bg-[#1E1E1E]">

            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#A3FF12]" />

          </div>

          <p className="mt-3 text-sm text-gray-500">
            Finding the best possible opponent...
          </p>

        </div>

        <button className="mt-12 flex items-center gap-2 mx-auto rounded-xl border border-red-500 px-6 py-3 text-red-400 transition hover:bg-red-500 hover:text-white">

          <XCircle size={20} />

          Cancel Search

        </button>

      </div>

    </div>
  );
}

export default BattleQueue;