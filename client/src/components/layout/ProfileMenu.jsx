import { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : {};
  const username = user.username || "User";
  const email = user.email || "user@example.com";
  const initials = username.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full border border-white/10 bg-[#252526] px-3 py-2 transition hover:border-[#A3FF12]/50"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A3FF12] font-semibold text-black">
          {initials}
        </div>

        <span className="hidden lg:block text-sm font-medium text-white">
          {username}
        </span>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#252526] shadow-xl">
          <div className="border-b border-white/10 p-4">
            <p className="font-semibold text-white">{username}</p>

            <p className="text-sm text-gray-400">{email}</p>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-5 py-3 hover:bg-white/5"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-5 py-3 hover:bg-white/5"
          >
            <User size={18} />
            Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-5 py-3 hover:bg-white/5"
          >
            <Settings size={18} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
