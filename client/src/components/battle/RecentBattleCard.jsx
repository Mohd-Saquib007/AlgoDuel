function RecentBattleCard({
  opponent,
  result,
  ratingChange,
}) {
  const isWin = result === "Won";

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#252526] p-5">

      <div>

        <h3 className="font-semibold">
          {result} vs {opponent}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Competitive Battle
        </p>

      </div>

      <span
        className={`font-semibold ${
          isWin
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {ratingChange}
      </span>

    </div>
  );
}

export default RecentBattleCard;