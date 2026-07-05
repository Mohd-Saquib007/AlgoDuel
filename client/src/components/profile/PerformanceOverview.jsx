function ProgressBar({ label, value, percentage, color }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-300">{label}</span>
        <span className="font-mono text-gray-400">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#1E1E1E]">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function PerformanceOverview({ user }) {
  // Safely calculate the total language submission counts to compute the dynamic breakdown bar percentages
  const totalLangSubmissions = (user.languages || []).reduce((acc, curr) => acc + curr.count, 0);

  // Dynamic layout helper maps
  const langColors = ["bg-[#A3FF12]", "bg-cyan-500", "bg-purple-500", "bg-yellow-500", "bg-blue-500"];

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      
      {/* Performance Stats List Card */}
      <div className="rounded-3xl border border-white/5 bg-[#252526]/40 backdrop-blur-md p-8">
        <h2 className="text-2xl font-bold tracking-tight">Performance Profile</h2>
        <div className="mt-8 space-y-6 font-medium text-base">
          <div className="flex justify-between border-b border-white/5 pb-4">
            <span className="text-gray-400">Current Arena Rating</span>
            <span className="font-bold text-[#A3FF12] font-mono">{user.rating}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-4">
            <span className="text-gray-400">Highest Rating Achieved</span>
            <span className="font-bold text-gray-200 font-mono">{user.highestRating}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-4">
            <span className="text-gray-400">Global Ranking Position</span>
            <span className="font-bold text-gray-200 font-mono">#{user.globalRank || "---"}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-gray-400">Competitive Contests Played</span>
            <span className="font-bold text-gray-200 font-mono">{user.contestsPlayed}</span>
          </div>
        </div>
      </div>

      {/* Problem Breakdown Dynamic Progress Bars */}
      <div className="rounded-3xl border border-white/5 bg-[#252526]/40 backdrop-blur-md p-8">
        <h2 className="text-2xl font-bold tracking-tight">Problem Difficulty Breakdown</h2>
        <div className="mt-8">
          <ProgressBar
            label="Easy"
            value={user.breakdown?.easy || 0}
            percentage={user.breakdown?.easy ? (user.breakdown.easy / user.problemsSolved) * 100 : 0}
            color="bg-green-500"
          />
          <ProgressBar
            label="Medium"
            value={user.breakdown?.medium || 0}
            percentage={user.breakdown?.medium ? (user.breakdown.medium / user.problemsSolved) * 100 : 0}
            color="bg-yellow-500"
          />
          <ProgressBar
            label="Hard"
            value={user.breakdown?.hard || 0}
            percentage={user.breakdown?.hard ? (user.breakdown.hard / user.problemsSolved) * 100 : 0}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Languages Array Progress Section */}
      <div className="rounded-3xl border border-white/5 bg-[#252526]/40 backdrop-blur-md p-8 lg:col-span-2">
        <h2 className="text-2xl font-bold tracking-tight">Languages Utilized</h2>
        <div className="mt-8">
          {user.languages && user.languages.length > 0 ? (
            user.languages.map((lang, idx) => {
              const percentage = totalLangSubmissions > 0 ? ((lang.count / totalLangSubmissions) * 100).toFixed(0) : 0;
              return (
                <ProgressBar
                  key={lang.name}
                  label={lang.name}
                  value={`${percentage}% (${lang.count} submissions)`}
                  percentage={parseFloat(percentage)}
                  color={langColors[idx % langColors.length]}
                />
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No code language data points found.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default PerformanceOverview;