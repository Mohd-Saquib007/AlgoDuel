import { motion } from "framer-motion";
import StatCard from "./StatCard";

const stats = [
  {
    target: 10,
    suffix: "K+",
    label: "Developers",
  },
  {
    target: 50,
    suffix: "K+",
    label: "Battles",
  },
  {
    target: 120,
    suffix: "K+",
    label: "Submissions",
  },
];

function HeroStats() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
        >
          <StatCard
            target={item.target}
            suffix={item.suffix}
            label={item.label}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default HeroStats;