import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./Scenes/Login/Login";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import Topbar from "./Scenes/global/topbar";
import SideBar from "./Scenes/global/sidebar";
import Login from "./Components/auth/Login";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import PlanManagement from "./Scenes/PlanManagement/PlanManagement";

// ── Dashboard layout ──────────────────────────────────────────────────────────
// Sidebar + Topbar only live here — completely separate from the login route
const DashboardLayout = () => {
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBar isSidebar={isSidebar} />
      <main
        style={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="plan-management" element={<PlanManagement/>}/>
          {/* Add more routes here as your app grows */}
          {/* <Route path="/team" element={<Team />} /> */}
        </Routes>
      </main>
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [theme, colorMode] = useMode();

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>

            {/* ✅ Public — completely standalone, no sidebar/topbar */}
            <Route path="/login" element={<Login />} />

            {/*    Protected — ProtectedRoute checks for valid JWT         */}
            {/*    No token → redirects to /login                          */}
            {/*    Valid token → renders DashboardLayout via <Outlet />    */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<DashboardLayout />} />
            </Route>

            {/* Catch-all → login */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;