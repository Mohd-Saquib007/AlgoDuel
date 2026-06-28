import { Calendar, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

function ContestCard({
  title,
  type,
  date,
  duration,
  participants,
  buttonText,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#252526] p-6 transition-all duration-300 hover:border-[#A3FF12]/40 hover:-translate-y-1">

      <span className="rounded-full bg-[#A3FF12]/10 px-3 py-1 text-sm text-[#A3FF12]">
        {type}
      </span>

      <h2 className="mt-5 text-2xl font-bold">
        {title}
      </h2>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-gray-400">

          <Calendar size={18} />

          {date}

        </div>

        <div className="flex items-center gap-3 text-gray-400">

          <Clock size={18} />

          {duration}

        </div>

        <div className="flex items-center gap-3 text-gray-400">

          <Users size={18} />

          {participants}

        </div>

      </div>

      <Link
        to="/contests/details"
        className="mt-8 inline-flex rounded-xl bg-[#A3FF12] px-6 py-3 font-semibold text-black transition hover:brightness-110"
      >
        {buttonText}
      </Link>

    </div>
  );
}

export default ContestCard;