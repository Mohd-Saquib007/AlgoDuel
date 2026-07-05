import { Edit, MapPin, Calendar } from "lucide-react";

function ProfileHeader({ user }) {
  // Safe helper to extract short initial string tokens for the avatar placeholder grid
  const getInitials = (nameStr) => {
    if (!nameStr) return "DS";
    return nameStr.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const formattedDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <div className="rounded-3xl border border-white/5 bg-[#252526]/40 backdrop-blur-md p-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          
          {/* Dynamic Initials Avatar */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#A3FF12] text-5xl font-black text-black shadow-[0_0_30px_rgba(163,255,18,0.2)]">
            {getInitials(user.name)}
          </div>

          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">{user.name}</h1>
            <p className="mt-3 text-lg text-gray-400 font-medium">{user.title}</p>

            <div className="mt-5 flex flex-wrap gap-4 text-gray-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#A3FF12]" />
                {user.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Joined {formattedDate}
              </div>
            </div>

            <div className="mt-6">
              <span className="rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 px-5 py-2.5 text-sm font-bold text-[#A3FF12]">
                Tier Rating: {user.rating}
              </span>
            </div>
          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#A3FF12]/50 px-6 py-3 font-semibold text-[#A3FF12] transition-all duration-300 hover:bg-[#A3FF12] hover:text-black hover:shadow-[0_4px_20px_rgba(163,255,18,0.2)]">
          <Edit size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;