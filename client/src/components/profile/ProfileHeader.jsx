import React from "react";
import { Edit, MapPin, Calendar, Terminal } from "lucide-react";

function ProfileHeader({ user }) {
  const getInitials = (nameStr) => {
    if (!nameStr) return "U";
    return nameStr.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const dateToParse = user?.joinedAt || user?.createdAt;
  const formattedDate = dateToParse && !isNaN(Date.parse(dateToParse))
    ? new Date(dateToParse).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#252526] to-[#141414] p-8 shadow-2xl">
      <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start justify-between">
        
        <div className="flex flex-col items-center gap-6 sm:flex-row text-center sm:text-left">
          {/* Avatar Box Component */}
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#A3FF12] text-4xl font-black text-black shadow-[0_0_40px_rgba(163,255,18,0.15)] tracking-tighter">
            {getInitials(user?.username || user?.name)}
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-white flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {user?.username || user?.name || "Arena Competitor"}
              <span className="inline-flex items-center gap-1 rounded-md bg-[#A3FF12]/10 border border-[#A3FF12]/20 px-2.5 py-0.5 text-xs font-bold text-[#A3FF12]">
                PRO
              </span>
            </h1>
            
            <p className="text-gray-400 text-sm font-medium flex items-center justify-center sm:justify-start gap-1.5">
              <Terminal size={14} className="text-[#A3FF12]" />
              {user?.title || "Full Stack Developer • Competitive Programmer"}
            </p>

            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400" />
                {user?.location || "India"}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-400" />
                Joined {formattedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Action button trigger elements layout */}
        <button className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/10 active:scale-[0.98]">
          <Edit size={16} className="text-[#A3FF12]" />
          Edit Profile
        </button>

      </div>
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#A3FF12]/5 blur-3xl" />
    </div>
  );
}

export default ProfileHeader;