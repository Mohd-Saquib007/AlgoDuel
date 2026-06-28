function ProgressBar({ label, value, percentage, color }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{label}</span>

        <span className="text-gray-400">
          {value}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#1E1E1E]">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function PerformanceOverview() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">

      {/* Left */}

      <div className="rounded-3xl border border-white/10 bg-[#252526] p-8">

        <h2 className="text-3xl font-bold">
          Performance
        </h2>

        <div className="mt-8 space-y-6">

          <div className="flex justify-between">

            <span className="text-gray-400">
              Current Rating
            </span>

            <span className="font-semibold text-[#A3FF12]">
              1540
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Highest Rating
            </span>

            <span className="font-semibold">
              1620
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Global Rank
            </span>

            <span className="font-semibold">
              #213
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Contests Played
            </span>

            <span className="font-semibold">
              18
            </span>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="rounded-3xl border border-white/10 bg-[#252526] p-8">

        <h2 className="text-3xl font-bold">
          Problem Breakdown
        </h2>

        <div className="mt-8">

          <ProgressBar
            label="Easy"
            value="60"
            percentage={100}
            color="bg-green-500"
          />

          <ProgressBar
            label="Medium"
            value="45"
            percentage={75}
            color="bg-yellow-500"
          />

          <ProgressBar
            label="Hard"
            value="22"
            percentage={35}
            color="bg-red-500"
          />

        </div>

      </div>

      {/* Languages */}

      <div className="rounded-3xl border border-white/10 bg-[#252526] p-8 lg:col-span-2">

        <h2 className="text-3xl font-bold">
          Languages Used
        </h2>

        <div className="mt-8">

          <ProgressBar
            label="C++"
            value="70%"
            percentage={70}
            color="bg-[#A3FF12]"
          />

          <ProgressBar
            label="Python"
            value="20%"
            percentage={20}
            color="bg-cyan-500"
          />

          <ProgressBar
            label="JavaScript"
            value="10%"
            percentage={10}
            color="bg-purple-500"
          />

        </div>

      </div>

    </div>
  );
}

export default PerformanceOverview;