import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext, tokens } from "../../theme";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/Notifications";
import SettingsOutlinedIcon from "@mui/icons-material/Settings";
import PersonOutlinedIcon from "@mui/icons-material/Person";

interface TopbarProps {
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ setIsSidebar }: TopbarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {/* Search Bar */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "3px",
          px: 1,
        }}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;