import {
  Box,
  Typography,
  useTheme,
  LinearProgress,
  Chip,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useAuth } from "../../context/AuthContext";

// ── static data ──────────────────────────────────────────────────────────────
const balanceCards = [
  {
    label: "TOTAL BALANCE",
    value: "$92,840",
    change: "+4.8% YTD",
    positive: true,
    accent: "#4CCEAC",
  },
  {
    label: "VESTED BALANCE",
    value: "$90,600",
    sub: "80% of employer contributions vested",
    accent: "#4CCEAC",
  },
  {
    label: "UNVESTED (FORFEITABLE)",
    value: "$2,240",
    sub: "Lost if you leave before year 6",
    accent: "#f0a500",
    valueColor: "#f0a500",
  },
];

const planDetails = [
  { label: "Plan Sponsor", value: "Acme Corporation", bold: true },
  { label: "Plan Type", value: "Traditional 401(k)", chip: true, chipColor: "#4fc3f7" },
  { label: "Enrollment Date", value: "Jan 1, 2020", bold: true },
  { label: "Years of Service", value: "5 years", bold: true },
  {
    label: "Vesting Schedule",
    value: "Graded 6-Year",
    chip: true,
    chipColor: "#f0a500",
  },
  { label: "Your Deferral Rate", value: "8% of salary", bold: true },
  { label: "Employer Match", value: "50% up to 8%", bold: true },
  { label: "2025 IRS Limit", value: "$23,000 / year", bold: true },
  { label: "Catch-up (50+)", value: "+$7,500 if eligible", bold: true },
];

const retirementProjection = {
  readiness: 78,
  projectedAt65: "$1.84M",
  monthlyIncome: "$6,133",
  yearsToRetire: 33,
  tip: {
    title: "Increase deferral to 10%",
    body: "Adding just 2% more → pushes readiness to 94% and projected corpus to $2.1M",
  },
};

const quarterlyStatements = [
  {
    period: "Q1 2025",
    beginning: "$89,420",
    contributions: "+$2,100",
    earnings: "+$1,320",
    withdrawals: "—",
    ending: "$92,840",
  },
  {
    period: "Q4 2024",
    beginning: "$84,200",
    contributions: "+$2,100",
    earnings: "+$3,120",
    withdrawals: "—",
    ending: "$89,420",
  },
  {
    period: "Q3 2024",
    beginning: "$79,600",
    contributions: "+$2,100",
    earnings: "+$2,500",
    withdrawals: "—",
    ending: "$84,200",
  },
];

// ── component ─────────────────────────────────────────────────────────────────
const My401k = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  // ── shared sx helpers ──
  const card = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    },
  };

  const label11 = {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.8px",
    color: colors.grey[500],
    mb: "6px",
  };

  const value26 = {
    fontSize: "26px",
    fontWeight: 700,
    color: colors.grey[100],
    lineHeight: 1.15,
  };

  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "24px",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100] }}>
          My 401(k) Plan
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: colors.primary[300] + "66",
              color: colors.grey[200],
              textTransform: "none",
              fontSize: "13px",
              "&:hover": { borderColor: colors.grey[400], backgroundColor: colors.primary[700] + "33" },
            }}
          >
            Download Statement
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<SwapHorizIcon />}
            sx={{
              backgroundColor: "#f0a500",
              color: "#000",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#d4920a" },
            }}
          >
            Change Elections
          </Button>
        </Box>
      </Box>

      {/* ── Balance cards ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          mb: "20px",
        }}
      >
        {balanceCards.map((c, i) => (
          <Box key={i} sx={{ ...card, borderTop: `3px solid ${c.accent}` }}>
            <Typography sx={label11}>{c.label}</Typography>
            <Typography sx={{ ...value26, color: c.valueColor || colors.grey[100], mb: "6px" }}>
              {c.value}
            </Typography>
            {c.change && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <TrendingUpIcon sx={{ fontSize: 14, color: "#4CCEAC" }} />
                <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#4CCEAC" }}>
                  {c.change}
                </Typography>
              </Box>
            )}
            {c.sub && (
              <Typography sx={{ fontSize: "11px", color: colors.grey[500], mt: "4px" }}>
                {c.sub}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* ── Plan Details + Retirement Projection ── */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", mb: "20px" }}>

        {/* Plan Details */}
        <Box sx={{ ...card }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "16px" }}>
            📋 Plan Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {planDetails.map((row, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: "10px",
                  borderBottom: i < planDetails.length - 1
                    ? `1px solid ${colors.primary[300]}22`
                    : "none",
                }}
              >
                <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>
                  {row.label}
                </Typography>
                {row.chip ? (
                  <Chip
                    label={row.value}
                    size="small"
                    sx={{
                      backgroundColor: row.chipColor + "22",
                      color: row.chipColor,
                      border: `1px solid ${row.chipColor}55`,
                      fontSize: "11px",
                      fontWeight: 600,
                      height: "22px",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: row.bold ? 600 : 400,
                      color: colors.grey[100],
                    }}
                  >
                    {row.value}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Retirement Projection */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              🎯 Retirement Projection
            </Typography>
            <Chip
              label={`${retirementProjection.readiness}% Ready`}
              size="small"
              sx={{
                backgroundColor: "#4CCEAC22",
                color: "#4CCEAC",
                border: "1px solid #4CCEAC55",
                fontSize: "11px",
                fontWeight: 700,
              }}
            />
          </Box>

          {/* 3 mini-stat cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", mb: "20px" }}>
            {[
              { label: "Projected at 65", value: retirementProjection.projectedAt65, color: colors.grey[100] },
              { label: "Monthly Income", value: retirementProjection.monthlyIncome, color: "#4CCEAC" },
              { label: "Years to Retire", value: retirementProjection.yearsToRetire, color: colors.grey[100] },
            ].map((s, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: colors.primary[700] + "55",
                  borderRadius: "8px",
                  p: "12px",
                  textAlign: "center",
                  border: `1px solid ${colors.primary[300]}22`,
                }}
              >
                <Typography sx={{ fontSize: "10px", color: colors.grey[500], mb: "4px", letterSpacing: "0.5px" }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: 700, color: s.color }}>
                  {s.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Progress bar */}
          <Box sx={{ mb: "16px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "6px" }}>
              <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                Retirement readiness
              </Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#f0a500" }}>
                {retirementProjection.readiness}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={retirementProjection.readiness}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.primary[700],
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #f0a500, #e67e22)",
                },
              }}
            />
          </Box>

          {/* Tip */}
          <Box
            sx={{
              backgroundColor: "#4CCEAC11",
              border: "1px solid #4CCEAC33",
              borderRadius: "8px",
              p: "12px 14px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <LightbulbOutlinedIcon sx={{ fontSize: 16, color: "#4CCEAC", mt: "1px", flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#4CCEAC", mb: "3px" }}>
                  {retirementProjection.tip.title}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: colors.grey[400], lineHeight: 1.5 }}>
                  {retirementProjection.tip.body}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Quarterly Statements ── */}
      <Box sx={{ ...card }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
            📄 Quarterly Statements
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#4fc3f7",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View All
          </Typography>
        </Box>

        {/* Table header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.5fr",
            pb: "8px",
            borderBottom: `1px solid ${colors.primary[300]}33`,
            mb: "4px",
          }}
        >
          {["PERIOD", "BEGINNING BALANCE", "CONTRIBUTIONS", "EARNINGS", "WITHDRAWALS", "ENDING BALANCE", ""].map(
            (h, i) => (
              <Typography key={i} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>
                {h}
              </Typography>
            )
          )}
        </Box>

        {/* Table rows */}
        {quarterlyStatements.map((row, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.5fr",
              py: "12px",
              borderBottom: i < quarterlyStatements.length - 1
                ? `1px solid ${colors.primary[300]}22`
                : "none",
              alignItems: "center",
              "&:hover": { backgroundColor: colors.primary[700] + "22", borderRadius: "6px" },
            }}
          >
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>
              {row.period}
            </Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.beginning}</Typography>
            <Typography sx={{ fontSize: "13px", color: "#4CCEAC" }}>{row.contributions}</Typography>
            <Typography sx={{ fontSize: "13px", color: "#4CCEAC" }}>{row.earnings}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>{row.withdrawals}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.ending}</Typography>
            <Button
              size="small"
              startIcon={<PictureAsPdfIcon sx={{ fontSize: "12px !important" }} />}
              sx={{
                fontSize: "11px",
                color: "#4fc3f7",
                textTransform: "none",
                minWidth: 0,
                p: "2px 6px",
                "&:hover": { backgroundColor: "#4fc3f722" },
              }}
            >
              PDF
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default My401k;