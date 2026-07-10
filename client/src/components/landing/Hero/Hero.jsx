import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swords, Terminal, Shield } from "lucide-react";
import Button from "../../ui/Button";
import Container from "../../layout/Container";

function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // Mouse coordinate states to run the interactive 3D parallax terminal card tilt
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    setRotateX(-y / 15); // Adjust sensitivity divider here
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Stagger animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-16 bg-[#1E1E1E]">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT COLUMN - Animated Reveal Typography */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:col-span-5 text-center lg:text-left z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-[#A3FF12]/5 border border-[#A3FF12]/10 px-4 py-1.5 text-xs font-bold text-[#A3FF12] uppercase tracking-widest mx-auto lg:mx-0">
              <Terminal size={14} className="animate-pulse" /> Global Coding Arena v1.0
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-['Sora'] text-5xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl xl:text-7xl uppercase">
              Battle.<br />
              Code.<span className="text-gray-700 select-none">Code.</span><br />
              <motion.span 
                className="text-[#A3FF12] inline-block"
                animate={{ textShadow: ["0 0 20px rgba(163,255,18,0)", "0 0 25px rgba(163,255,18,0.2)", "0 0 20px rgba(163,255,18,0)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Conquer.
              </motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-500 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
              Join thousands of developers in exciting real-time coding battles, sharpen your problem-solving skills, host contests, and climb the leaderboard one challenge at a time.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Button 
                onClick={() => navigate(isLoggedIn ? "/battle" : "/login")}
                className="font-bold px-8 py-4 bg-[#A3FF12] text-black rounded-xl hover:shadow-[0_0_30px_rgba(163,255,18,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                <Swords size={16} /> Start Battling →
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate(isLoggedIn ? "/problems" : "/login")}
                className="font-semibold border border-white/5 bg-white/5 px-8 py-4 text-gray-300 rounded-xl transition duration-200 hover:bg-white/10 hover:text-white"
              >
                Explore Problems
              </Button>
            </motion.div>

            {/* Premium Counting Metric Badges */}
            <motion.div variants={itemVariants} className="pt-8 grid grid-cols-3 gap-4 border-t border-white/5 max-w-sm mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-black text-white font-mono tracking-tight">10K+</div>
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">Developers</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono tracking-tight">50K+</div>
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">Battles</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono tracking-tight">120K+</div>
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">Submissions</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - 3D Gyroscopic Cursor Tracking Code Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-7 perspective-1000"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX: rotateX, rotateY: rotateY, transformStyle: "preserve-3d" }}
              className="relative rounded-2xl border border-white/5 bg-[#141414]/90 p-1 shadow-2xl shadow-black/60 transition-all duration-200 ease-out"
            >
              {/* Top Window Bar */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 bg-[#141414]">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={12} className="text-[#A3FF12]" /> solution.cpp
                </div>
                <div className="w-12" />
              </div>

              {/* Code Workspace Matrix Block */}
              <div className="p-6 font-mono text-xs sm:text-sm text-gray-400 overflow-x-auto bg-[#141414]/40 leading-relaxed">
                <div className="flex gap-4">
                  <div className="text-gray-700 select-none text-right font-semibold pr-2 border-r border-white/5 space-y-1">
                    {Array.from({ length: 11 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <div className="space-y-1 text-gray-300">
                    <div><span className="text-purple-400">class</span> <span className="text-[#A3FF12] font-bold">Solution</span> {'{'}</div>
                    <div><span className="text-purple-400">public</span>:</div>
                    <div className="pl-4"><span className="text-cyan-400">vector&lt;int&gt;</span> <span className="text-yellow-400">twoSum</span>(<span className="text-cyan-400">vector&lt;int&gt;</span>&amp; nums, <span className="text-purple-400">int</span> target) {'{'}</div>
                    <div className="pl-8"><span className="text-cyan-400">unordered_map&lt;int, int&gt;</span> mp;</div>
                    <div className="pl-8"><span className="text-purple-400">for</span>(<span className="text-purple-400">int</span> i = <span className="text-orange-400">0</span>; i &lt; nums.<span className="text-yellow-400">size</span>(); i++) {'{'}</div>
                    <div className="pl-12"><span className="text-purple-400">int</span> comp = target - nums[i];</div>
                    <div className="pl-12"><span className="text-purple-400">if</span>(mp.<span className="text-yellow-400">count</span>(comp)) <span className="text-purple-400">return</span> {'{'}mp[comp], i{'}'};</div>
                    <div className="pl-12">mp[nums[i]] = i;</div>
                    <div className="pl-8">{'}'}</div>
                    <div className="pl-8"><span className="text-purple-400">return</span> {'{}'};</div>
                    <div className="pl-4">{'}'}</div>
                    <div>{'};'}</div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between border-t border-white/5 px-5 py-3 bg-[#141414]/80 text-[10px] text-gray-500 font-semibold tracking-wide">
                <div className="flex items-center gap-1.5 text-green-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Live Arena Tunnel Connected
                </div>
                <div className="font-mono text-gray-600">C++17 // UTF-8</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
      
      {/* Decorative background grid vector bars */}
      <div className="absolute top-0 left-1/4 h-full w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute top-0 left-2/4 h-full w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute top-0 left-3/4 h-full w-px bg-white/[0.01] pointer-events-none" />
    </section>
  );
}

export default Hero;