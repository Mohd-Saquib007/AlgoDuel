import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Code2, Menu, X } from "lucide-react";

import Button from "../ui/Button";
import Container from "./Container";
import ProfileMenu from "./ProfileMenu";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Dynamic authentication state
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "Contests", path: "/contests" },
  ];

  const authLinks = [
    { name: "Problems", path: "/problems" },
    { name: "Battles", path: "/battles" },
    { name: "Contests", path: "/contests" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  const navLinks = isLoggedIn ? authLinks : guestLinks;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/5 bg-[#1E1E1E]/80 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-[#1E1E1E]/40 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Code2 size={30} className="text-[#A3FF12]" />
            <span className="font-['Sora'] text-2xl font-bold text-white tracking-tight">
              Algo<span className="text-[#A3FF12]">Duel</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition duration-200 ${
                    isActive
                      ? "text-[#A3FF12]"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/battle">
                  <Button className="font-bold">Start Battle</Button>
                </Link>

                <button className="relative rounded-xl p-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5">
                  <Bell size={20} />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#1E1E1E]"></span>
                </button>

                <ProfileMenu />
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Sidebar Dropdown Block */}
      {menuOpen && (
        <div className="border-t border-white/5 bg-[#141414] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-400 hover:text-[#A3FF12] transition"
              >
                {link.name}
              </NavLink>
            ))}

            <div className="h-px bg-white/5 my-2" />

            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/battle" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full font-bold">Start Battle</Button>
                </Link>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-400 hover:text-white transition">
                  Dashboard
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-400 hover:text-white transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm font-semibold text-red-400 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;