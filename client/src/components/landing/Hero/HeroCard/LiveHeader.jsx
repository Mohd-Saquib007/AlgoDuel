import { Clock3 } from "lucide-react";

function LiveHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-5">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

        <span className="font-semibold">
          Live Battle
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-400">
        <Clock3 size={18} />
        <span>14:32</span>
      </div>
    </div>
  );
}

export default LiveHeader;