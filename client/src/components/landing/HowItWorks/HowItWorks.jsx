import { UserPlus, Users, Code2, Trophy } from "lucide-react";
import Container from "../../layout/Container";

const steps = [
  {
    icon: UserPlus,
    title: "Join Queue",
    description: "Click on Start Battle and enter the global real-time matchmaking queue.",
  },
  {
    icon: Users,
    title: "Match Found",
    description: "Our Elo pairing engine instantly connects you with an opponent of similar skill.",
  },
  {
    icon: Code2,
    title: "Solve Problem",
    description: "Write, test, and optimize your solution completely before your rival does.",
  },
  {
    icon: Trophy,
    title: "Win & Rank Up",
    description: "Earn arena rating points, claim victory, and climb the global leaderboards.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-[#141414]/40 border-y border-white/5" id="features">
      <Container>

        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#A3FF12] uppercase bg-[#A3FF12]/10 px-3 py-1 rounded-md">
            Execution Roadmap
          </span>
          <h2 className="font-['Sora'] text-4xl font-black tracking-tight sm:text-5xl uppercase text-white">
            How It Works
          </h2>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Get locked into a competitive coding duel in four simple steps.
          </p>
        </div>

        {/* Dynamic Card Grids */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-white/5 bg-[#141414] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#A3FF12]/30 group shadow-xl"
              >
                {/* Micro Step Numeric Floating Badges */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-lg bg-[#A3FF12] text-black font-black text-sm flex items-center justify-center shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                  {index + 1}
                </div>

                {/* Lucide Vector Icon Container Layout */}
                <div className="mx-auto mt-2 flex h-16 w-16 items-center justify-center rounded-xl bg-[#1E1E1E] border border-white/5 group-hover:border-[#A3FF12]/20 transition-colors duration-300">
                  <Icon
                    size={26}
                    className="text-gray-400 group-hover:text-[#A3FF12] transition-colors duration-300"
                  />
                </div>

                {/* Content Block */}
                <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default HowItWorks;