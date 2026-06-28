import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Button from "../../ui/Button";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

function HeroContent() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -60,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      {/* Badge */}

      <div className="inline-flex items-center rounded-full border border-[#A3FF12]/20 bg-[#A3FF12]/10 px-4 py-2 text-sm text-[#A3FF12]">
        🚀 Competitive Coding Platform
      </div>

      {/* Heading */}

      <h1 className="mt-8 font-['Sora'] text-6xl font-bold leading-tight">
        Battle.
        <br />
        <span className="text-white">
        Code.
        </span>
        Code.
        <br />
        <span className="bg-gradient-to-r from-[#A3FF12] to-cyan-400 bg-clip-text text-transparent">
          Conquer.
        </span>
      </h1>

      {/* Description */}

      <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
        Join thousands of developers in exciting real-time coding battles,
        sharpen your problem-solving skills, compete with friends, host
        contests, and climb the leaderboard one challenge at a time.
      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-5">
        <Button className="group flex items-center gap-2">
          Start Battling

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>

        <Button variant="secondary">
          Explore Problems
        </Button>
      </div>

      <HeroStats />

      <ScrollIndicator />
    </motion.div>
  );
}

export default HeroContent;