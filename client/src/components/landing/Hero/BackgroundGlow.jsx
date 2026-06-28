import { motion } from "framer-motion";

function BackgroundGlow() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10
                   w-80 h-80
                   rounded-full
                   bg-[#A3FF12]/10
                   blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
                   bottom-0
                   right-10
                   w-96 h-96
                   rounded-full
                   bg-cyan-500/10
                   blur-[160px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute
                   top-1/3
                   right-1/4
                   w-72
                   h-72
                   rounded-full
                   bg-purple-500/10
                   blur-[120px]"
      />
    </>
  );
}

export default BackgroundGlow;