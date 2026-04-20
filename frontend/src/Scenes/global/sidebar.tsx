import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Menu, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutline';
import LaptopIcon from '@mui/icons-material/Laptop';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

interface SidebarProps {
  isSidebar: boolean;
}

interface itemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelected }: itemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = ({ isSidebar }: SidebarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.grey[100]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: colors.blueAccent[900],
            height: "100vh",
            borderRight: "none",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              padding: "5px 35px 5px 20px",
              borderRadius: "4px",
              color: active ? "#6870fa" : colors.grey[100],
              backgroundColor: "transparent",
              "&:hover": {
                color: "#868dfb",
                backgroundColor: "transparent",
              },
            }),
            icon: {
              backgroundColor: "transparent",
            },
          }}
        >
          {/* ── Header / collapse toggle ── */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Admin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* ── Profile section ── */}
          {!isCollapsed && (
            <Box mb="25px" textAlign="center">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="10px"
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: colors.blueAccent[700],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  👤
                </Box>
              </Box>
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "4px 0 2px 0" }}
              >
                Marcus
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                Admin
              </Typography>
            </Box>
          )}

          {/* ── Nav items ── */}
          <Box paddingLeft={isCollapsed ? undefined : "10px"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Plan Management"
              to="/dashboard/plan-management"
              icon={<EventNoteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Participants"
              to="/dashboard/participants"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contributions"
              to="/dashboard/contributions"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Vesting"
              to="/dashboard/vestings"
              icon={<LockOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Compliance"
              to="/dashboard/compliance"
              icon={<EventNoteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="System Health"
              to="/dashboard/systemHealth"
              icon={<LaptopIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Audit Logs"
              to="/dashboard/auditlogs"
              icon={<NoteAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;