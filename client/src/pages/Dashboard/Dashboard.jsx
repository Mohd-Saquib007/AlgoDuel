import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookOpen, Swords, Trophy } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import DailyChallengeCard from "../../components/dashboard/DailyChallengeCard";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { greeting: "Good Morning", emoji: "🌅", message: "Start your day by solving a challenge and building your streak." };
  }
  if (hour >= 12 && hour < 17) {
    return { greeting: "Good Afternoon", emoji: "🌤️", message: "Take on a coding battle and sharpen your problem-solving skills." };
  }
  if (hour >= 17 && hour < 21) {
    return { greeting: "Good Evening", emoji: "🌙", message: "It's a great time to climb the leaderboard with a few battles." };
  }
  return { greeting: "Good Night", emoji: "🌌", message: "Review your progress today and prepare for tomorrow's challenges." };
}

function Dashboard() {
  const { greeting, emoji, message } = getGreeting();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data && response.data.user) {
          setProfileData(response.data.user);
          // Sync changes back to local auth state cache storage dynamically
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.error("Dashboard profile metrics sync failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardMetrics();
  }, []);

  const currentRating = profileData?.rating || 1200;
  const uniqueSolvedCount = profileData?.solvedProblems 
    ? new Set(profileData.solvedProblems.map(p => p.title || p.problemId)).size 
    : 0;
  const totalWins = profileData?.battleWins || 0;

  const stats = [
    { title: "Current Rating", value: String(currentRating), subtitle: "Live Arena Elo" },
    { title: "Problems Solved", value: String(uniqueSolvedCount), subtitle: "Unique Solutions" },
    { title: "Battles Won", value: String(totalWins), subtitle: "Active Duels" },
    { title: "Global Rank", value: profileData?.globalRank ? `#${profileData.globalRank}` : "Unranked", subtitle: "Top Tier Bracket" },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#1E1E1E]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-transparent border-t-[#A3FF12]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        
        {/* Welcome Block */}
        <div>
          <p className="text-xs font-black tracking-widest text-[#A3FF12] uppercase bg-[#A3FF12]/5 px-3 py-1 rounded-md inline-block">
            Console Core Operational
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl uppercase font-['Sora']">
            {emoji} {greeting}, {profileData?.username || "Developer"}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-500 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} subtitle={stat.subtitle} />
          ))}
        </div>

        {/* Quick Actions Router Enclave */}
        <div className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Quick Actions</h2>
          <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-3">
            <QuickActionCard 
              icon={BookOpen} 
              title="Practice Area" 
              description="Sharpen your algorithmic logic matrices by clearing curated problem queues."
              buttonText="Start Practicing"
              onClick={() => navigate("/problems")}
            />
            <QuickActionCard 
              icon={Swords} 
              title="Start Battle" 
              description="Challenge alternative global engineers in synchronous speed programming duels."
              buttonText="Find Opponent"
              onClick={() => navigate("/battle")}
            />
            <QuickActionCard 
              icon={Trophy} 
              title="Create Contest" 
              description="Spin custom lobby codes to challenge friends or coordinate private groups."
              buttonText="Create Contest"
              onClick={() => navigate("/contests")}
            />
          </div>
        </div>

        {/* Daily Challenge Card Wrapper */}
        <div className="mt-16">
          <DailyChallengeCard />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;