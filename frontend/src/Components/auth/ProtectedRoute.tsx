import { Box, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
    const { isLoading, user } = useAuth();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if ( !user) {
        console.log("No valid session, redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    // Role guard — e.g. EMPLOYER_ADMIN trying to access SUPER_ADMIN routes
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;