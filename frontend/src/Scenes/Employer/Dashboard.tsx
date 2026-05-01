import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";


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

const EmployerDashboard =()=>{

    const theme = useTheme();

    const colors =tokens(theme.palette.mode)

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

    return(
        <div>
        <p>Employer Dashboard</p>

        <Box 
         sx={{
          p: "24px 28px",
          backgroundColor: colors.blueAccent[900],
          overflowY: "auto",
        }}>
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
            {/* Good morning, {user?.firstName || "Marcus"} 👋 */}  {/* we will be exchanging it to the company name later */}
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

        <Box>
          
        </Box>

        </Box>
        </div>
    )
}


export default EmployerDashboard;