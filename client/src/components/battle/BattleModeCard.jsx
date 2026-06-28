import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function BattleModeCard({
  title,
  description,
  buttonText,
  icon,
}) {
  const Icon = icon;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#252526] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A3FF12]/40">

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#A3FF12]/10">

        <Icon
          size={28}
          className="text-[#A3FF12]"
        />

      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-gray-400">
        {description}
      </p>

      <Link
        to="/battle/queue"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#A3FF12] px-5 py-3 font-semibold text-black transition hover:gap-3"
        >
    {buttonText}
    <ArrowRight size={18}/>
    </Link>

    </div>
  );
}

export default BattleModeCard;