import useCounter from "../../../hooks/useCounter";

function StatCard({ target, suffix, label }) {
  const value = useCounter(target);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#A3FF12]/40">
      <h2 className="text-3xl font-bold text-[#A3FF12]">
        {value}
        {suffix}
      </h2>

      <p className="mt-2 text-gray-400">
        {label}
      </p>
    </div>
  );
}

export default StatCard;