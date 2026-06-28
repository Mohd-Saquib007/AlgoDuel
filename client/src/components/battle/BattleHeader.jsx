function BattleHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-6 py-4">

      {/* Timer */}

      <div>

        <p className="text-sm text-gray-400">
          Time Left
        </p>

        <h2 className="text-3xl font-bold text-[#A3FF12]">
          14:58
        </h2>

      </div>

      {/* Opponent */}

      <div className="text-center">

        <p className="text-sm text-gray-400">
          Opponent
        </p>

        <h2 className="text-2xl font-semibold">
          Aryan
        </h2>

      </div>

      {/* Progress */}

      <div className="w-64">

        <div className="mb-2 flex justify-between text-sm">

          <span>
            You
          </span>

          <span>
            Opponent
          </span>

        </div>

        <div className="h-3 rounded-full bg-[#1E1E1E]">

          <div
            className="h-full rounded-full bg-[#A3FF12]"
            style={{ width: "60%" }}
          />

        </div>

      </div>

    </div>
  );
}

export default BattleHeader;