import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from '@mui/icons-material/LightMode';
import { ColorModeContext, tokens } from "../../theme";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search"
import NotificationsOutlinedIcon from "@mui/icons-material/Notifications"
import SettingsOutlinedIcon from "@mui/icons-material/Settings"
import PersonOutlinedIcon from "@mui/icons-material/Person"

interface TopbarProps{
    setIsSidebar:React.Dispatch<React.SetStateAction<boolean>>
}




const Topbar = ({setIsSidebar}: TopbarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const coloMode = useContext(ColorModeContext);
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* search bar */}
        <Box>
            <InputBase sx={{ml:2, flex:1}} placeholder="search"/>
            <IconButton  type="button" sx={{p:1}}>
                <SearchIcon/>
            </IconButton>
        </Box>
        {/* icons */}
        <Box display="flex" >
        <IconButton onClick={coloMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
            <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon/>
        </IconButton>
        <IconButton>
            <PersonOutlinedIcon/>
        </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
