import { useState, useEffect } from "react";
import axios from "axios";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import PerformanceOverview from "../../components/profile/PerformanceOverview";
import Achievements from "../../components/profile/Achievements";
import SolvedProblems from "../../components/profile/SolvedProblems";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErrorMsg("No active session found. Please log in to view your profile.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setErrorMsg("Failed to parse authorized user details.");
        }
      } catch (err) {
        console.error("Error fetching authenticated user profile:", err);
        setErrorMsg(err.response?.data?.message || "Unauthorized access hook structure block.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#1E1E1E]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-[#A3FF12]"></div>
          <div className="text-sm font-medium tracking-widest uppercase text-gray-500 animate-pulse">Loading Arena Profile Metrics...</div>
        </div>
      </div>
    );
  }

  if (errorMsg || !user) {
    return (
      <div className="flex flex-col gap-4 min-h-[calc(100vh-80px)] items-center justify-center bg-[#1E1E1E] text-white px-4 text-center">
        <p className="text-xl font-semibold text-red-400">Profile Loading Unsuccessful</p>
        <p className="text-sm text-gray-400 max-w-md font-mono bg-[#141414] p-4 rounded-xl border border-white/5">
          {errorMsg}
        </p>
      </div>
    );
  }

  // FIXED: Dynamically compute accurate unique problem stats to filter out resubmissions
  const finalNormalizedUser = (() => {
    const solvedHistory = user.solvedProblems || [];
    
    // Filter out historical duplicates by mapping unique titles
    const uniqueMap = new Map();
    solvedHistory.forEach(prob => {
      if (!uniqueMap.has(prob.title)) {
        uniqueMap.set(prob.title, prob);
      }
    });
    
    const uniqueProblemsList = Array.from(uniqueMap.values());
    
    // Recalculate difficulty fields cleanly from unique entries
    const dynamicBreakdown = { easy: 0, medium: 0, hard: 0 };
    uniqueProblemsList.forEach(p => {
      const diff = p.difficulty?.toLowerCase();
      if (diff === "easy" || diff === "medium" || diff === "hard") {
        dynamicBreakdown[diff]++;
      }
    });

    return {
      ...user,
      solvedProblems: solvedHistory, // Keep the full timeline log intact for the stream view
      problemsSolved: uniqueProblemsList.length, // Display only unique counts
      breakdown: dynamicBreakdown,
      rating: user.rating || 1200,
      highestRating: user.highestRating || 1200,
      currentStreak: user.currentStreak || 0,
      battleWins: user.battleWins || 0,
      globalRank: user.globalRank || 0,
      contestsPlayed: user.contestsPlayed || 0
    };
  })();

  return (
    <div className="min-h-screen bg-[#1E1E1E] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <ProfileHeader user={finalNormalizedUser} />
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <PerformanceOverview user={finalNormalizedUser} />
            <Achievements user={finalNormalizedUser} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <ProfileStats user={finalNormalizedUser} />
            <SolvedProblems user={finalNormalizedUser} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;