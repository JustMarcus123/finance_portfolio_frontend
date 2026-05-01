import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAuth } from "../../context/AuthContext";
import { fetchAllSponsor } from "../../Components/Apis/SponsorApi";

const statCards = [
  {
    label: "NET WORTH",
    value: "$284,520",
    change: "+$12,340",
    sub: "vs. last month",
    positive: true,
    accent: "#4CCEAC",
  },
  {
    label: "TOTAL ASSETS",
    value: "$318,900",
    change: "+4.2%",
    sub: "across 6 accounts",
    positive: true,
    accent: "#4CCEAC",
  },
  {
    label: "MONTHLY SAVINGS",
    value: "$2,840",
    change: "28.4% rate",
    sub: "of income saved",
    positive: true,
    accent: "#f0a500",
  },
  {
    label: "TOTAL LIABILITIES",
    value: "$34,380",
    change: "-$420",
    sub: "debt reducing ✓",
    positive: false,
    accent: "#e74c3c",
  },
];

const transactions = [
  {
    merchant: "Starbucks",
    category: "Food & Drink",
    catColor: "#f0a500",
    date: "Mar 5",
    amount: "-$6.50",
    positive: false,
  },
  {
    merchant: "Salary Deposit",
    category: "Income",
    catColor: "#4CCEAC",
    date: "Mar 1",
    amount: "+$5,800",
    positive: true,
  },
  {
    merchant: "Rent Payment",
    category: "Housing",
    catColor: "#e74c3c",
    date: "Mar 1",
    amount: "-$1,850",
    positive: false,
  },
  {
    merchant: "Whole Foods",
    category: "Groceries",
    catColor: "#4CCEAC",
    date: "Feb 28",
    amount: "-$94.20",
    positive: false,
  },
  {
    merchant: "Netflix",
    category: "Subscriptions",
    catColor: "#6c63ff",
    date: "Feb 27",
    amount: "-$15.99",
    positive: false,
  },
];

const alerts = [
  {
    icon: <WarningAmberIcon sx={{ fontSize: 18 }} />,
    color: "#f0a500",
    bg: "#f0a50015",
    title: "Dining budget at 82%",
    sub: "$164/$200 spent this month",
  },
  {
    icon: <CreditCardIcon sx={{ fontSize: 18 }} />,
    color: "#e74c3c",
    bg: "#e74c3c15",
    title: "Credit card due in 3 days",
    sub: "Chase Sapphire: $1,240",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    color: "#4CCEAC",
    bg: "#4CCEAC15",
    title: "Goal milestone reached!",
    sub: "Emergency fund hit 50%",
  },
  {
    icon: <ErrorOutlineIcon sx={{ fontSize: 18 }} />,
    color: "#e74c3c",
    bg: "#e74c3c15",
    title: "Large transaction",
    sub: "$820 at Best Buy detected",
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const cardSx = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}55`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
  };

  interface SponsorType{
    company_name: string;
  ein: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primary_contact_phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  plan_type:string,
  match_formula:string,
  vesting_schedule:string,
  safe_harbour_plan:string,
  plan_start_date:string,
  participants?: number;
  aua?: number;
  sponsor_status?: string;
  }

  //states for displaying the sponsors
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [sponsor, setSponsor] = useState<SponsorType []>([]);
  const [error, setError] = useState("");

  console.log(sponsor);
  //to display the sponsors
  useEffect(()=>{

    const fetSponsor =async()=>{
      setSponsorLoading(true);
      setError("")
      try {
        
        const data = await fetchAllSponsor();
        setSponsor(data);
      } catch (err:any) {
        console.error(err||"failed to fetch sponsors")
      }finally{
        setSponsorLoading(false);
      }
    }
    fetSponsor();

  },[])



  return (
    <>
      <Box
        sx={{
          p: "24px 28px",
          backgroundColor: colors.blueAccent[900],
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            mb: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: colors.grey[100],
            }}
          >
            Good morning, {user?.firstName || ""} 👋
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            mb: "20px",
          }}
        >
          {statCards.map((card, i) => (
            <Box
              key={i}
              sx={{ ...cardSx, borderTop: `3px solid ${card.accent}` }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: colors.grey[500],
                  letterSpacing: "0.8px",
                  mb: "8px",
                }}
              >
                {card.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: colors.grey[100],
                  lineHeight: 1.1,
                  mb: "8px",
                }}
              >
                {card.value}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {card.positive ? (
                  <TrendingUpIcon sx={{ fontSize: 14, color: "#4CCEAC" }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 14, color: "#e74c3c" }} />
                )}
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: card.positive ? "#4CCEAC" : "#e74c3c",
                  }}
                >
                  {card.change}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: "11px", color: colors.grey[600], mt: "2px" }}
              >
                {card.sub}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "16px",
            mb: "20px",
          }}
        ></Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "16px",
          }}
        >
          <Box sx={cardSx}>
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Typography sx={{ fontSize: "16px" }}>💳</Typography>
      <Typography sx={{ fontSize: "15px", fontWeight: 600, color: colors.grey[100] }}>
        PLAN UNDER ADMINISTRATION
      </Typography>
    </Box>
    <Box sx={{ px: "12px", py: "5px", borderRadius: "20px", border: `1px solid ${colors.primary[300]}`, cursor: "pointer", "&:hover": { backgroundColor: colors.primary[300] } }}>
      <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>View all →</Typography>
    </Box>
  </Box>

  {/* Header */}
  <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 1fr", pb: "8px", mb: "4px", borderBottom: `1px solid ${colors.primary[300]}55` }}>
    {["PLAN SPONSOR", "PLAN TYPE", "PARTICIPANTS", "AUA", "STATUS"].map((h) => (
      <Typography key={h} sx={{ fontSize: "10px", fontWeight: 700, color: colors.grey[600], letterSpacing: "0.8px" }}>
        {h}
      </Typography>
    ))}
  </Box>

  {/* Rows */}
  {sponsorLoading ? (
    <Typography sx={{ fontSize: "13px", color: colors.grey[400], py: "12px" }}>
      Loading...
    </Typography>
  ) : sponsor.length === 0 ? (
    <Typography sx={{ fontSize: "13px", color: colors.grey[400], py: "12px" }}>
      No sponsors found.
    </Typography>
  ) : (
    sponsor.map((sp, i) => (
      <Box
        key={i}
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 1fr",
          alignItems: "center",
          py: "12px",
          borderBottom: i < sponsor.length - 1 ? `1px solid ${colors.primary[300]}33` : "none",
          "&:hover": { backgroundColor: `${colors.primary[300]}22`, borderRadius: "8px" },
          transition: "background-color 0.15s",
        }}
      >
        {/* Plan Sponsor */}
        <Typography sx={{ fontSize: "13px", fontWeight: 500, color: colors.grey[200] }}>
          {sp.company_name}
        </Typography>

        {/* Plan Type */}
        <Box sx={{ display: "inline-block", px: "8px", py: "2px", borderRadius: "4px", backgroundColor: `${colors.blueAccent[500]}22`, border: `1px solid ${colors.primary[400]}44`, width: "fit-content" }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 600, color: colors.blueAccent[500] }}>
            {sp.plan_type}
          </Typography>
        </Box>

        {/* Participants — placeholder until you have real data */}
        <Typography sx={{ fontSize: "12px", color: colors.grey[500] }}>
          {sp.participants ?? "—"}
        </Typography>

        {/* AUA — placeholder until you have real data */}
        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[200] }}>
          {sp.aua ? `$${sp.aua.toLocaleString()}` : "—"}
        </Typography>

        {/* Status */}
        <Box sx={{ display: "inline-block", px: "8px", py: "2px", borderRadius: "4px", backgroundColor: sp.sponsor_status === "Active" ? "#4CCEAC22" : "#ff000022", border: `1px solid ${sp.sponsor_status === "Active" ? "#4CCEAC44" : "#ff000044"}`, width: "fit-content" }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 600, color: sp.sponsor_status === "Active" ? "#4CCEAC" : "#ff6b6b" }}>
            {sp.sponsor_status ?? "Unknown"}
          </Typography>
        </Box>
      </Box>
    ))
  )}
</Box>

          <Box sx={cardSx}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "16px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <NotificationsOutlinedIcon
                  sx={{ fontSize: 18, color: colors.grey[300] }}
                />
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: colors.grey[100],
                  }}
                >
                  Alerts
                </Typography>
              </Box>
              <Box
                sx={{
                  px: "8px",
                  py: "2px",
                  borderRadius: "12px",
                  backgroundColor: "#e74c3c22",
                  border: "1px solid #e74c3c44",
                }}
              >
                <Typography
                  sx={{ fontSize: "11px", fontWeight: 700, color: "#e74c3c" }}
                >
                  3 new
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {alerts.map((alert, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    p: "12px",
                    borderRadius: "8px",
                    backgroundColor: alert.bg,
                    border: `1px solid ${alert.color}22`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    "&:hover": {
                      backgroundColor: `${alert.color}20`,
                      transform: "translateX(2px)",
                    },
                  }}
                >
                  <Box sx={{ color: alert.color, mt: "1px", flexShrink: 0 }}>
                    {alert.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: colors.grey[100],
                        lineHeight: 1.3,
                      }}
                    >
                      {alert.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: colors.grey[500],
                        mt: "2px",
                      }}
                    >
                      {alert.sub}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
