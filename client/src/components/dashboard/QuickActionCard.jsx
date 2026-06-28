import { ArrowRight } from "lucide-react";

function QuickActionCard({
  icon,
  title,
  description,
  buttonText,
}) {
  const Icon = icon;

  return (
    <div className="group rounded-2xl border border-white/10 bg-[#252526] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A3FF12]/40">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A3FF12]/10">

        <Icon
          size={28}
          className="text-[#A3FF12]"
        />

      </div>

      <h3 className="mt-6 text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-gray-400 leading-7">
        {description}
      </p>

      <button
        className="mt-8 flex items-center gap-2 text-[#A3FF12] transition-all group-hover:gap-3"
      >
        {buttonText}

        <ArrowRight size={18} />

      </button>

    </div>
  );
}

export default QuickActionCard;