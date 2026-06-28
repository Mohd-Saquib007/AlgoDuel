import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

import Container from "../../layout/Container";

function Footer() {
  const productLinks = [
    "Problems",
    "Battles",
    "Contests",
    "Leaderboard",
  ];

  const resourceLinks = [
    "About",
    "Contact",
    "FAQ",
    "Privacy",
  ];

  const communityLinks = [
    "GitHub",
    "Discord",
    "LinkedIn",
    "Twitter",
  ];

  return (
    <footer className="border-t border-white/10 bg-[#181818] py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-2">

              <Code2
                size={28}
                className="text-[#A3FF12]"
              />

              <h2 className="font-['Sora'] text-2xl font-bold">
                Algo
                <span className="text-[#A3FF12]">
                  Duel
                </span>
              </h2>

            </div>

            <p className="mt-5 leading-8 text-gray-400">
              Battle. Code. Conquer.
              <br />
              Compete with developers worldwide and
              improve your coding skills every day.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Product
            </h3>

            <div className="space-y-3">

              {productLinks.map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="block text-gray-400 transition hover:text-[#A3FF12]"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Resources
            </h3>

            <div className="space-y-3">

              {resourceLinks.map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="block text-gray-400 transition hover:text-[#A3FF12]"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

          {/* Community */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Community
            </h3>

            <div className="space-y-3">

              {communityLinks.map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="block text-gray-400 transition hover:text-[#A3FF12]"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <p className="text-gray-500 text-sm">
            © 2026 AlgoDuel. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with ❤️ using React, Node.js & MongoDB
          </p>

        </div>

      </Container>
    </footer>
  );
}

export default Footer;