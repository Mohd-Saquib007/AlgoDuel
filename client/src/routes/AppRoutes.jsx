import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🟢 CRITICAL FIX: Import ExecutionProvider as a named import alongside your context layout default
import ExecutionContext, { ExecutionProvider } from "../context/ExecutionContext";

// Pages
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

// Structural Layout Helpers & Guard Gates
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const MainLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-[#1E1E1E]">
    <Navbar />
    <main className="flex-1 pt-20">{children}</main>
    <Footer />
  </div>
);

function AppRoutes() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC GUEST ROUTES */}
        <Route 
          path="/" 
          element={
            <div className="flex min-h-screen flex-col bg-[#1E1E1E]">
              <Navbar />
              <main className="flex-1 pt-20"><LandingPage /></main>
              <Footer />
            </div>
          } 
        />
        
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />} />

        {/* SECURE PROTECTED ARENA ENCLAVES */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/problems" element={<ProtectedRoute><MainLayout><Problems /></MainLayout></ProtectedRoute>} />
        <Route path="/problems/:id" element={<ProtectedRoute><MainLayout><ProblemDetails /></MainLayout></ProtectedRoute>} />
        
        <Route path="/battle" element={<ProtectedRoute><MainLayout><BattleHome /></MainLayout></ProtectedRoute>} />
        <Route path="/battle/queue" element={<ProtectedRoute><MainLayout><BattleQueue /></MainLayout></ProtectedRoute>} />
        <Route path="/battle/found" element={<ProtectedRoute><MainLayout><BattleFound /></MainLayout></ProtectedRoute>} />
        
        {/* 🟢 CRITICAL FIX: Wrapped inside ExecutionProvider so CodeEditor can hook variables seamlessly */}
        <Route 
          path="/battle/room" 
          element={
            <ProtectedRoute>
              <ExecutionProvider>
                <MainLayout>
                  <BattleRoom />
                </MainLayout>
              </ExecutionProvider>
            </ProtectedRoute>
          } 
        />
        
        <Route path="/battle/result" element={<ProtectedRoute><MainLayout><BattleResult /></MainLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
        <Route path="/contests" element={<ProtectedRoute><MainLayout><Contests /></MainLayout></ProtectedRoute>} />
        <Route path="/contests/details" element={<ProtectedRoute><MainLayout><ContestDetails /></MainLayout></ProtectedRoute>} />

        {/* LIVE WORKSPACE ISOLATION TIERS */}
        <Route path="/workspace/:problemSlug" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
        <Route path="/contests/workspace" element={<ProtectedRoute><ContestWorkspace /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;