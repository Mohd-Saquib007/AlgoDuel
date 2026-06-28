import {
  UserPlus,
  Users,
  Code2,
  Trophy,
} from "lucide-react";

import Container from "../../layout/Container";

const steps = [
  {
    icon: UserPlus,
    title: "Join Queue",
    description:
      "Click on Start Battle and enter the matchmaking queue.",
  },
  {
    icon: Users,
    title: "Match Found",
    description:
      "We'll instantly match you with a player of similar skill.",
  },
  {
    icon: Code2,
    title: "Solve Problem",
    description:
      "Code the solution before your opponent does.",
  },
  {
    icon: Trophy,
    title: "Win & Rank Up",
    description:
      "Earn rating points and climb the global leaderboard.",
  },
];

function HowItWorks() {
  return (
    <section className="py-28 bg-[#1B1B1B]">
      <Container>

        <div className="text-center">

          <h2 className="font-['Sora'] text-5xl font-bold">
            How It Works
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Get into a coding battle in just four simple steps.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/10 bg-[#252526] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#A3FF12]/40"
              >
                {/* Step Number */}

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-[#A3FF12] text-black font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Icon */}

                <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A3FF12]/10">
                  <Icon
                    size={30}
                    className="text-[#A3FF12]"
                  />
                </div>

                {/* Title */}

                <h3 className="mt-6 text-2xl font-semibold">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="mt-4 text-gray-400 leading-7">
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