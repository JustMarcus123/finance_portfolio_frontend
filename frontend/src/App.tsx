import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import Topbar from "./Scenes/global/topbar";
import SideBar from "./Scenes/global/sidebar";
import Login from "./Components/auth/Login";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import PlanManagement from "./Scenes/PlanManagement/PlanManagement";
import EmployerDashboard from "./Scenes/Employer/Dashboard";
import EmployerSideBar from "./Scenes/global/employerSideBar";
import Participants from "./Scenes/Employer/Participants";

// ── Super Admin Layout ────────────────────────────────────────────────────────
const AdminLayout = () => {
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBar isSidebar={isSidebar} />
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plan-management" element={<PlanManagement />} />
        </Routes>
      </main>
    </div>
  );
};

// ── Employer Layout ───────────────────────────────────────────────────────────
// Later you can give this its own sidebar/topbar with employer-specific nav
const EmployerLayout = () => {
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <EmployerSideBar isSidebar={isSidebar} />   {/* swap with EmployerSidebar later */}
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<EmployerDashboard />} />
          <Route path="/participants" element={<Participants/>}/>

          {/* Add more employer routes here */}
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

            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Super Admin only */}
            <Route element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
              <Route path="/admin/dashboard/*" element={<AdminLayout />} />
            </Route>

            {/* Employer Admin only */}
            <Route element={<ProtectedRoute requiredRole="EMPLOYER_ADMIN" />}>
              <Route path="/employer/dashboard/*" element={<EmployerLayout />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;