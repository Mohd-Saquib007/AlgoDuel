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
import Profile from "../pages/Profile/Profile";
import Contests from "../pages/Contest/Contests";
import ContestDetails from "../pages/Contest/ContestDetails";
import ContestWorkspace from "../pages/Contest/ContestWorkspace";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Problems */}
        <Route
          path="/problems"
          element={<Problems />}
        />

        <Route
          path="/problems/:id"
          element={<ProblemDetails />}
        />

        {/* Practice Workspace */}
        <Route
          path="/workspace"
          element={<Workspace />}
        />

        {/* Battles */}
        <Route
          path="/battle"
          element={<BattleHome />}
        />

        <Route
          path="/battle/queue"
          element={<BattleQueue />}
        />

        <Route
          path="/battle/found"
          element={<BattleFound />}
        />

        <Route
          path="/battle/room"
          element={<BattleRoom />}
        />

        <Route
          path="/battle/result"
          element={<BattleResult />}
        />

        <Route
          path="/profile"
          element={<Profile />}
         />

         <Route
          path="/contests"
          element={<Contests />}
         />

         <Route
          path="/contests/details"
          element={<ContestDetails />}
         />

         <Route
          path="/contests/workspace"
          element={<ContestWorkspace />}
         />
         
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;