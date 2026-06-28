import { Edit, MapPin, Calendar } from "lucide-react";

function ProfileHeader() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#252526] p-8">

      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">

        <div className="flex flex-col items-center gap-6 md:flex-row">

          {/* Avatar */}

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#A3FF12] text-5xl font-bold text-black">
            MS
          </div>

          {/* Info */}

          <div>

            <h1 className="text-4xl font-bold">
              Mohd Saquib
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              Full Stack Developer • Competitive Programmer
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-gray-400">

              <div className="flex items-center gap-2">

                <MapPin size={18} />

                India

              </div>

              <div className="flex items-center gap-2">

                <Calendar size={18} />

                Joined June 2026

              </div>

            </div>

            <div className="mt-6">

              <span className="rounded-full bg-[#A3FF12]/10 px-5 py-2 text-[#A3FF12]">
                Rating 1540
              </span>

            </div>

          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#A3FF12] px-6 py-3 text-[#A3FF12] transition hover:bg-[#A3FF12] hover:text-black">

          <Edit size={18} />

          Edit Profile

        </button>

      </div>

    </div>
  );
}

export default ProfileHeader;