

import { Box, IconButton,  Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import { MenuItem, Sidebar,sidebarClasses ,Menu} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LockOutlinedIcon from '@mui/icons-material/LockOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAuth } from "../../context/AuthContext";



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

const EmployeeSideBar = ({ isSidebar }: SidebarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");


    //mapping the user
    const {user} = useAuth();

   

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
            button: ({ active }:{active:boolean}) => ({
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
                   {user?.role}
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
                Employee
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {/* Admin */}
              </Typography>
            </Box>
          )}

          {/* ── Nav items ── */}
        <Box paddingLeft={isCollapsed ? undefined : "10px"}>
            <Item
  title="Dashboard"
  to="/employee/dashboard"
  icon={<DashboardIcon/>}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="Net Worth"
  to="/employee/dashboard/networth"
  icon={<PeopleOutlinedIcon />}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="My 401(K)"
  to="/employee/dashboard/my401k"
  icon={<PaymentIcon />}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="Contributions"
  to="/employee/dashboard/contributions"
  icon={<AttachMoneyIcon />}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="Plan Loan"
  to="/employee/dashboard/planloan"
  icon={<AccountBalanceIcon />}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="Fund Allocation"
  to="/employee/dashboard/fundallocation"
  icon={<EventNoteIcon />}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="Transaction"
  to="/employee/dashboard/transaction"
  icon={<LockOutlinedIcon />}
  selected={selected}
  setSelected={setSelected}
/>
<Item
  title="Budget"
  to="/employee/dashboard/budget"
  icon={<BarChartOutlinedIcon />}
  selected={selected}
  setSelected={setSelected}
/>

<Item
  title="Goals"
  to="/employee/dashboard/goals"
  icon={<ListAltIcon />}
  selected={selected}
  setSelected={setSelected}
/>

<Item
  title="Debt Paydown"
  to="/employee/dashboard/debtpaydown"
  icon={<ListAltIcon />}
  selected={selected}
  setSelected={setSelected}
/>


<Item
  title="ALerts"
  to="/employee/dashboard/alerts"
  icon={<ListAltIcon />}
  selected={selected}
  setSelected={setSelected}
/>

<Item
  title="Settings"
  to="/employee/dashboard/settings"
  icon={<ListAltIcon />}
  selected={selected}
  setSelected={setSelected}
/>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default EmployeeSideBar;





