function ProblemCard() {
  return (
    <div className="rounded-2xl bg-white/5 p-5">
      <h3 className="text-sm text-gray-400">
        Problem
      </h3>

      <h2 className="mt-2 text-xl font-semibold">
        Two Sum
      </h2>

      <div className="mt-3 flex gap-3">
        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
          Easy
        </span>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
          C++
        </span>
      </div>
    </div>
  );
}

export default ProblemCard;