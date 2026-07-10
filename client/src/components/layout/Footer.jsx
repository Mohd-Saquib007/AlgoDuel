import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#141414] px-6 py-12 text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <div className="text-lg font-bold tracking-tight text-white">
            ALGO<span className="text-[#A3FF12]">DUEL</span>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            &copy; {new Date().getFullYear()} AlgoDuel. All rights reserved. Made by Devansh.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <Link to="/problems" className="hover:text-[#A3FF12] transition">Arena</Link>
          <Link to="/battle" className="hover:text-[#A3FF12] transition">Matchmaking</Link>
          <Link to="/contests" className="hover:text-[#A3FF12] transition">Leaderboards</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;