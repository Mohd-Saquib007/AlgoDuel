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
          ? "border-b border-white/10 bg-[#1E1E1E]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Code2 size={30} className="text-[#A3FF12]" />

            <span className="font-['Sora'] text-2xl font-bold text-white">
              Algo
              <span className="text-[#A3FF12]">Duel</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-[#A3FF12]"
                    : "font-medium text-gray-300 transition hover:text-[#A3FF12]"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
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
                  <Button>Start Battle</Button>
                </Link>

                <button className="relative rounded-full p-2 transition hover:bg-white/10">
                  <Bell size={22} />

                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <ProfileMenu />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#252526] md:hidden">
          <div className="flex flex-col gap-5 px-6 py-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-[#A3FF12]"
              >
                {link.name}
              </NavLink>
            ))}

            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/battle">
                  <Button className="w-full">Start Battle</Button>
                </Link>

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/profile">Profile</Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
