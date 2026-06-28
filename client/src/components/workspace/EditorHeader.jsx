import { ArrowLeft, Play, RotateCcw, Upload } from "lucide-react";
import { Link } from "react-router-dom";

function EditorHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-6 py-4">
      <div className="flex items-center gap-4">
        <Link
          to="/problems"
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h2 className="text-xl font-semibold">
            Two Sum
          </h2>

          <p className="text-sm text-gray-400">
            Easy • Array
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-[#A3FF12] px-5 py-2 text-[#A3FF12] transition hover:bg-[#A3FF12] hover:text-black">
          <Play size={18} />
          Run
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2 transition hover:bg-white/10">
          <RotateCcw size={18} />
          Reset
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-[#A3FF12] px-5 py-2 font-semibold text-black transition hover:brightness-110">
          <Upload size={18} />
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;