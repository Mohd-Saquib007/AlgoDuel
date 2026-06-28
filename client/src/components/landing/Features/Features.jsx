import {
  Swords,
  BookOpen,
  Trophy,
  BarChart3,
} from "lucide-react";

import Container from "../../layout/Container";

const features = [
  {
    icon: Swords,
    title: "1v1 Coding Battles",
    description:
      "Challenge developers in real-time coding duels and improve your speed under pressure.",
  },
  {
    icon: BookOpen,
    title: "Practice Problems",
    description:
      "Solve curated coding questions ranging from beginner to advanced.",
  },
  {
    icon: Trophy,
    title: "Host Contests",
    description:
      "Create contests, invite friends, and compete in custom coding events.",
  },
  {
    icon: BarChart3,
    title: "Global Leaderboard",
    description:
      "Track your progress, improve your rating, and climb the rankings.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-28"
    >
      <Container>

        <div className="text-center">

          <h2 className="font-['Sora'] text-5xl font-bold">
            Why Choose{" "}
            <span className="text-[#A3FF12]">
              AlgoDuel
            </span>
            ?
          </h2>

          <p className="mt-6 mx-auto max-w-2xl text-gray-400 text-lg">
            Everything you need to practice,
            compete, and become a better programmer.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-[#252526] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#A3FF12]/50"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A3FF12]/10">
                  <Icon
                    size={30}
                    className="text-[#A3FF12]"
                  />
                </div>

                <h3 className="text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}

export default Features;