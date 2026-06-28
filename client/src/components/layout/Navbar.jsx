import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Code2, Menu, X } from "lucide-react";

import Button from "../ui/Button";
import Container from "./Container";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Problems", path: "/problems" },
    { name: "Battles", path: "/battles" },
    { name: "Contests", path: "/contests" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${
        isScrolled
          ? "backdrop-blur-xl bg-white/5 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <Code2
              size={30}
              className="text-[#A3FF12]"
            />

            <span className="text-2xl font-bold font-['Sora'] text-white">
              Algo
              <span className="text-[#A3FF12]">
                Duel
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden md:flex gap-8">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition font-medium ${
                    isActive
                      ? "text-[#A3FF12]"
                      : "text-gray-300 hover:text-[#A3FF12]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

          </div>

          {/* Desktop Buttons */}

          <div className="hidden md:flex gap-3">
            <Button variant="ghost">
              Login
            </Button>

            <Button>
              Register
            </Button>
          </div>

          {/* Mobile Button */}

          <button
            className="md:hidden text-white"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </nav>
      </Container>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-[#252526] border-t border-white/10">

          <div className="flex flex-col px-6 py-5 gap-5">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            <Button variant="ghost">
              Login
            </Button>

            <Button>
              Register
            </Button>

          </div>

        </div>
      )}
    </header>
  );
}

export default Navbar;