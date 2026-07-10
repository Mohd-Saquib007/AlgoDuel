import { useState, useEffect } from "react";
import axios from "axios";
import { Swords, Code, History } from "lucide-react";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import PerformanceOverview from "../../components/profile/PerformanceOverview";
import Achievements from "../../components/profile/Achievements";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeTab, setActiveTab] = useState("submissions");

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
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setErrorMsg("Failed to parse authorized user details.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
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
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-transparent border-t-[#A3FF12]" />
          <div className="text-xs font-black tracking-widest text-gray-500 uppercase animate-pulse">Syncing Arena Profile...</div>
        </div>
      </div>
    );
  }

  if (errorMsg || !user) {
    return (
      <div className="flex flex-col gap-4 min-h-[calc(100vh-80px)] items-center justify-center bg-[#1E1E1E] text-white px-4 text-center">
        <p className="text-xl font-semibold text-red-400">Profile Offline</p>
        <p className="text-sm text-gray-400 max-w-md font-mono bg-[#141414] p-4 rounded-xl border border-white/5">{errorMsg}</p>
      </div>
    );
  }

  // Normalize data logs safely
  const solvedHistory = user.solvedProblems || [];
  const uniqueMap = new Map();
  solvedHistory.forEach(prob => {
    if (!uniqueMap.has(prob.title || prob.problemId)) {
      uniqueMap.set(prob.title || prob.problemId, prob);
    }
  });
  
  const uniqueProblemsList = Array.from(uniqueMap.values());
  const dynamicBreakdown = { easy: 0, medium: 0, hard: 0 };
  uniqueProblemsList.forEach(p => {
    const diff = p.difficulty?.toLowerCase();
    if (diff === "easy" || diff === "medium" || diff === "hard") dynamicBreakdown[diff]++;
  });

  const finalNormalizedUser = {
    ...user,
    solvedProblems: solvedHistory,
    problemsSolved: uniqueProblemsList.length,
    breakdown: dynamicBreakdown,
    rating: user.rating || 1200,
    highestRating: user.highestRating || 1200,
    currentStreak: user.currentStreak || 0,
    battleWins: user.battleWins || 0,
    globalRank: user.globalRank || 0,
    contestsPlayed: user.contestsPlayed || 0,
    battleHistory: user.battleHistory || [] // Enforce array bounds fallback
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHeader user={finalNormalizedUser} />
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: Analytics Panels */}
          <div className="lg:col-span-2 space-y-8">
            <PerformanceOverview user={finalNormalizedUser} />
            <Achievements user={finalNormalizedUser} />
          </div>

          {/* RIGHT: Combined Profile Logs Workspace Side-Bar */}
          <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
            <ProfileStats user={finalNormalizedUser} />

            {/* Micro Tab Controls Dashboard Section */}
            <div className="rounded-2xl border border-white/5 bg-[#141414] shadow-xl flex flex-col flex-1 min-h-400px">
              <div className="flex border-b border-white/5 bg-[#1a1a1a] rounded-t-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveTab("submissions")}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition ${
                    activeTab === "submissions" ? "bg-[#141414] text-[#A3FF12] border-b border-[#A3FF12]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Code size={12} className="inline mr-1.5 -mt-0.5" /> Code Logs
                </button>
                <button 
                  onClick={() => setActiveTab("battles")}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition ${
                    activeTab === "battles" ? "bg-[#141414] text-[#A3FF12] border-b border-[#A3FF12]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Swords size={12} className="inline mr-1.5 -mt-0.5" /> Duel Logs
                </button>
              </div>

              {/* Dynamic Content Streams Panel Wrapped inside FIXED DIMENSION SCROLL CONTAINERS */}
              <div className="p-4 flex-1 max-h-420px overflow-y-auto custom-scrollbar">
                {activeTab === "submissions" ? (
                  solvedHistory.length > 0 ? (
                    <div className="space-y-2.5">
                      {solvedHistory.map((prob, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#1E1E1E]/40">
                          <div>
                            <h4 className="text-xs font-bold text-gray-200">{prob.title || "Solved Challenge"}</h4>
                            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5 font-mono">
                              {prob.language || "cpp"} // Accepted
                            </p>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wide bg-green-500/10 text-green-400 border border-green-500/10 px-2 py-0.5 rounded-md">
                            PASSED
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-xs text-gray-600 font-medium">No verified practice history records mapped.</div>
                  )
                ) : (
                  finalNormalizedUser.battleHistory.length > 0 ? (
                    <div className="space-y-2.5">
                      {finalNormalizedUser.battleHistory.map((battle, idx) => {
                        const win = battle.verdict === "Victory";
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#1E1E1E]/40">
                            <div>
                              <h4 className="text-xs font-bold text-gray-200">vs {battle.opponent || "Rival Coder"}</h4>
                              <p className="text-[10px] font-mono font-semibold text-gray-500 tracking-wide mt-0.5">
                                Duration: {battle.duration || "12m"}
                              </p>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wide border px-2 py-0.5 rounded-md ${
                              win ? "bg-green-500/10 border-green-500/10 text-green-400" : "bg-red-500/10 border-red-500/10 text-red-400"
                            }`}>
                              {battle.verdict || "DEFEAT"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-xs text-gray-600 font-medium flex flex-col items-center gap-2">
                      <History size={20} className="text-gray-700" /> No multi-player arena battles recorded.
                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;