import { BookOpen, Swords, Trophy } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import DailyChallengeCard from "../../components/dashboard/DailyChallengeCard";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good Morning",
      emoji: "🌅",
      message:
        "Start your day by solving a challenge and building your streak.",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: "Good Afternoon",
      emoji: "🌤️",
      message:
        "Take on a coding battle and sharpen your problem-solving skills.",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      greeting: "Good Evening",
      emoji: "🌙",
      message:
        "It's a great time to climb the leaderboard with a few battles.",
    };
  }

  return {
    greeting: "Good Night",
    emoji: "🌌",
    message:
      "Review your progress today and prepare for tomorrow's challenges.",
  };
}

const stats = [
  {
    title: "Current Rating",
    value: "1540",
    subtitle: "+42 this month",
  },
  {
    title: "Problems Solved",
    value: "127",
    subtitle: "12 this week",
  },
  {
    title: "Battles Won",
    value: "48",
    subtitle: "65% Win Rate",
  },
  {
    title: "Global Rank",
    value: "#213",
    subtitle: "Top 8%",
  },
];

const quickActions = [
  {
    icon: BookOpen,
    title: "Practice",
    description:
      "Sharpen your DSA skills by solving curated coding problems.",
    buttonText: "Start Practicing",
  },
  {
    icon: Swords,
    title: "Start Battle",
    description:
      "Challenge another developer in a real-time coding duel.",
    buttonText: "Find Opponent",
  },
  {
    icon: Trophy,
    title: "Create Contest",
    description:
      "Host coding contests and compete with your friends.",
    buttonText: "Create Contest",
  },
];

function Dashboard() {
  const { greeting, emoji, message } = getGreeting();

  // Temporary
  const userName = "Saquib";

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome Section */}
        <div>
          <p className="font-medium text-[#A3FF12]">
            Welcome Back 👋
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            {emoji} {greeting}, {userName}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            {message}
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-2 text-gray-400">
            Jump directly into your next challenge.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                icon={action.icon}
                title={action.title}
                description={action.description}
                buttonText={action.buttonText}
              />
            ))}
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="mt-20">
          <DailyChallengeCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;