import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Problems from "../pages/Problems/Problems";
import ProblemDetails from "../pages/Problems/ProblemDetails";
import Workspace from "../pages/Workspace/Workspace";
import BattleHome from "../pages/Battle/BattleHome";
import BattleQueue from "../pages/Battle/BattleQueue";
import BattleFound from "../pages/Battle/BattleFound";
import BattleRoom from "../pages/Battle/BattleRoom";
import BattleResult from "../pages/Battle/BattleResult";
import ProfilePage from "../pages/Profile/Profile";
import Contests from "../pages/Contest/Contests";
import ContestDetails from "../pages/Contest/ContestDetails";
import ContestWorkspace from "../pages/Contest/ContestWorkspace";

// Import Layout Headers
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-[#1E1E1E]">
    <Navbar />
    <main className="flex-1 pt-6 md:pt-10">{children}</main>
    <Footer />
  </div>
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages that DO NOT want Navbar/Footer (Landing, Auth, Code Workspace) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workspace/:problemSlug" element={<Workspace />} />
        <Route path="/contests/workspace" element={<ContestWorkspace />} />

        {/* Standard Pages wrapping MainLayout wrappers dynamically */}
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/problems" element={<MainLayout><Problems /></MainLayout>} />
        <Route path="/problems/:id" element={<MainLayout><ProblemDetails /></MainLayout>} />
        <Route path="/battle" element={<MainLayout><BattleHome /></MainLayout>} />
        <Route path="/battle/queue" element={<MainLayout><BattleQueue /></MainLayout>} />
        <Route path="/battle/found" element={<MainLayout><BattleFound /></MainLayout>} />
        <Route path="/battle/room" element={<MainLayout><BattleRoom /></MainLayout>} />
        <Route path="/battle/result" element={<MainLayout><BattleResult /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
        <Route path="/contests" element={<MainLayout><Contests /></MainLayout>} />
        <Route path="/contests/details" element={<MainLayout><ContestDetails /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;