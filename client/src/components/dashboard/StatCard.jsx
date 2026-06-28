import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#252526] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A3FF12]/40">

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-400">
          {title}
        </p>

        <TrendingUp
          size={18}
          className="text-[#A3FF12]"
        />

      </div>

      <h2 className="mt-5 text-4xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {subtitle}
      </p>

    </div>
  );
}

export default StatCard;