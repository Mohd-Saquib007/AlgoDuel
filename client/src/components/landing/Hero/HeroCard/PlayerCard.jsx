function PlayerCard({
  name,
  rating,
  progress,
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span>
          {name}
        </span>

        <span className="text-gray-400">
          {rating}
        </span>
      </div>

      <div className="h-2 rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full rounded-full bg-[#A3FF12]"
          style={{
            width: progress,
          }}
        />

      </div>
    </div>
  );
}

export default PlayerCard;