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
import EmployeeDashboard from "./Scenes/Employees/Dashboard";
import EmployeeSideBar from "./Scenes/global/employeeSidebar";
import Networth from "./Scenes/Employees/networth";
import PayrollPage from "./Scenes/Employer/Payroll";
import My401k from "./Scenes/Employees/My401k";
import Contributions from "./Scenes/Employees/Contributions";
import PlanLoans from "./Scenes/Employees/PlanLoans";
import FundAllocations from "./Scenes/Employees/Fundallocations";
import ContributionHistory from "./Scenes/Employer/ContributionHistory";
import LoanRequests from "./Scenes/Employer/LoanRequests";
import Compliance from "./Scenes/Employer/Compliance";

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
          <Route path="/payrole" element={<PayrollPage/>}/>
          <Route path="/contributions" element={<ContributionHistory/>}/>
          <Route path="/loanRequest" element={<LoanRequests/>}/>
          <Route path="/compliance" element={<Compliance/>}/>
          {/* Add more employer routes here */}
        </Routes>
      </main>
    </div>
  );
};

//----------Employee layout ------------
const EmployeeLayout =()=>{

  const [isSidebar, setIsSidebar] = useState<boolean>(true)

  return(
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <EmployeeSideBar isSidebar={isSidebar} />   {/* swap with EmployerSidebar later */}
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
         <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/networth" element={<Networth/>}/>
          <Route path="/my401k" element={<My401k/>}/>
          <Route path="/contributions" element={<Contributions/>}/>
          <Route path="/planloan" element={<PlanLoans/>}/>
          <Route path="/fundallocation" element={<FundAllocations/>}/>
        </Routes>
      </main>
    </div>
  )
}

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

            {/* Employee only */}
            <Route element={<ProtectedRoute requiredRole="EMPLOYEE"/>}>
            <Route path="/employee/dashboard/*"  element={<EmployeeLayout/>} />

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