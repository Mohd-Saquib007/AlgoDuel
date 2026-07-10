import { motion } from "framer-motion";
import { Swords, Trophy, Zap, Terminal, Code2, Users } from "lucide-react";
import Container from "../../layout/Container";

const featuresList = [
  { icon: Swords, title: "1v1 Real-Time Duels", description: "Enter active matchmaking queues instantly. Face off against global rivals to solve identical algorithmic nodes simultaneously.", badge: "Live Sync", accent: "from-[#A3FF12]/10 via-transparent to-transparent" },
  { icon: Terminal, title: "Dynamic Sandbox", description: "Code, compile, and run test-cases cleanly inside an optimized workspace supporting advanced compiler diagnostics.", badge: "Piston Core", accent: "from-cyan-500/5 via-transparent to-transparent" },
  { icon: Trophy, title: "Ranked Milestones", description: "Climb through specialized Elo competitive tier divisions. Unlock unique profile rank credentials as you scale.", badge: "Elo Matrix", accent: "from-purple-500/5 via-transparent to-transparent" },
  { icon: Code2, title: "7+ Data Architectures", description: "Native pipeline support for arrays, matrices, pointer chains, level-order binary trees, and cyclic adjacency lists.", badge: "OJ Engine", accent: "from-blue-500/5 via-transparent to-transparent" },
  { icon: Users, title: "Custom Duel Rooms", description: "Host private contest brackets or direct-invite friends using temporary workspace session access codes.", badge: "Websockets", accent: "from-yellow-500/5 via-transparent to-transparent" },
  { icon: Zap, title: "Instant Verification", description: "Get lightning-fast sub-millisecond execution feedback from our distributed sandboxed runner framework.", badge: "Ultra Fast", accent: "from-red-500/5 via-transparent to-transparent" }
];

function Features() {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-24 bg-[#1E1E1E] relative overflow-hidden" id="features">
      <Container>
        
        {/* Header revealing via scroll viewport logic */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-white/5 pb-12"
        >
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black tracking-widest text-[#A3FF12] uppercase bg-[#A3FF12]/10 px-3 py-1 rounded-md">
              Platform Capabilities
            </span>
            <h2 className="font-['Sora'] text-4xl font-black tracking-tight sm:text-5xl uppercase text-white leading-none">
              ENGINEERED FOR <br />
              <span className="text-[#A3FF12]">COMPETITION</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
              AlgoDuel combines a fast compiler sandbox execution runner with micro-interactive metrics dashboards to create an elite real-time coding platform.
            </p>
          </div>
        </motion.div>

        {/* Feature Staggered Reveal Cards Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresList.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#141414] p-8 transition-all duration-300 hover:border-white/10 group shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br' ${feat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E1E1E] border border-white/5 group-hover:border-[#A3FF12]/20 transition-all duration-300">
                      <Icon size={20} className="text-gray-500 group-hover:text-[#A3FF12] transition-colors duration-300" />
                    </div>
                    <span className="text-[9px] font-black tracking-widest uppercase text-gray-600 bg-white/5 px-2.5 py-1 rounded-md group-hover:text-white transition-colors duration-300">
                      {feat.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#A3FF12] transition-colors duration-200">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
}

export default Features;