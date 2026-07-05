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

        // Pointing cleanly to your secure, unified API endpoint
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Safely extract the valid database user document schema
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
      <div className="flex min-h-screen items-center justify-center bg-[#1E1E1E] text-lg font-bold text-[#A3FF12]">
        Loading your Profile Arena Profile Metrics...
      </div>
    );
  }

  if (errorMsg || !user) {
    return (
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-[#1E1E1E] text-white px-4 text-center">
        <p className="text-xl font-semibold text-red-400">Profile Loading Unsuccessful</p>
        <p className="text-sm text-gray-400 max-w-md font-mono bg-[#252526] p-4 rounded-xl border border-white/5">
          {errorMsg}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Mounts exactly once here. Ensure no sub-component calls this again! */}
        <ProfileHeader user={{ ...user, name: user.username }} />
        
        <ProfileStats user={user} />
        <PerformanceOverview user={user} />
        <Achievements user={user} />
        <SolvedProblems user={user} />
      </div>
    </div>
  );
}

export default ProfilePage;