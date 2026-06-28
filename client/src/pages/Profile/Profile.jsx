import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import PerformanceOverview from "../../components/profile/PerformanceOverview";
import SolvedProblems from "../../components/profile/SolvedProblems";
import Achievements from "../../components/profile/Achievements";

function Profile() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] px-6 py-10 text-white">

      <div className="mx-auto max-w-7xl">

        <ProfileHeader />

        <ProfileStats />

        <PerformanceOverview />

        <SolvedProblems />

        <Achievements />

      </div>

    </div>
  );
}

export default Profile;