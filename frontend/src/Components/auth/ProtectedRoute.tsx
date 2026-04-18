import { Box, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute =()=>{

    const {token , isLoading,user} = useAuth();


    console.log("Protected route check:", isLoading,"|token", token ? "EXISTS": "NULL")

    const theme = useTheme();
    const color = tokens(theme.palette.mode);

    if(isLoading){
        return(
    <Box  display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: color.primary[500] }}>
        <CircularProgress sx={{color: color.greenAccent[400]}}/>
    </Box>
)
    }

    //if there is not token or expired token then redirects it to login
    //replace ={true} means login wont be push to history push button wont loop

  if(!token || !user){
    console.log("No valid session, redirecting to /login");
    return <Navigate to ="/login" replace/>
  }

  ///in case everything is good, --- allow access
  return <Outlet/>
}

export default ProtectedRoute;