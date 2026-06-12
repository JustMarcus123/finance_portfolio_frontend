import {
  Box, Typography, useTheme, Button, Chip, LinearProgress,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

// ── static data ───────────────────────────────────────────────────────────────
const summaryCards = [
  { label: "TOTAL PARTICIPANTS", value: "1,248", change: "+14 this month", sub: "Active employees enrolled",   accent: "#4fc3f7", changeColor: "#4CCEAC" },
  { label: "PLAN AUA",           value: "$142M",  change: "+3.8% QoQ",     sub: "Assets under administration", accent: "#4CCEAC", changeColor: "#4CCEAC" },
  { label: "YTD CONTRIBUTIONS",  value: "$8.4M",  change: "On track",      sub: "Employee: $5.6M · Match: $2.8M", accent: "#6366f1", changeColor: "#4CCEAC" },
  { label: "MATCH CAPTURE RATE", value: "82%",    change: "+4% vs last year", sub: "Employees getting full match", accent: "#f0a500", changeColor: "#4CCEAC" },
];

const chartData = [
  { month: "Oct", employee: 1520000, match: 1340000 },
  { month: "Nov", employee: 1680000, match: 1420000 },
  { month: "Dec", employee: 1750000, match: 1500000 },
  { month: "Jan", employee: 1690000, match: 1380000 },
  { month: "Feb", employee: 1820000, match: 1460000 },
  { month: "Mar", employee: 1950000, match: 1520000 },
];

const formatY = (v: number) => `$${(v / 1000000).toFixed(1)}M`;

const alerts = [
  { icon: <ErrorOutlineIcon sx={{ fontSize: 16 }} />, iconColor: "#ef4444", bg: "#ef444411", border: "#ef444433", title: "ADP test deadline in 14 days", sub: "Form 5500 due Mar 31 — data submission required" },
  { icon: <WarningAmberIcon sx={{ fontSize: 16 }} />, iconColor: "#f0a500", bg: "#f0a50011", border: "#f0a50033", title: "2 loan requests pending approval", sub: "Alex Johnson ($10k) · Maria Santos ($7.5k)" },
  { icon: <CakeOutlinedIcon sx={{ fontSize: 16 }} />, iconColor: "#a855f7", bg: "#a855f711", border: "#a855f733", title: "5 vesting anniversaries this month", sub: "Recalculation needed for affected employees" },
  { icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />, iconColor: "#4CCEAC", bg: "#4CCEAC11", border: "#4CCEAC33", title: "Mar payroll batch posted", sub: "1,248 participants updated · $700K processed" },
];

const planConfig = [
  { label: "Plan sponsor",    value: "Acme Corporation",          bold: true },
  { label: "Plan type",       value: "Traditional 401(k)",        chip: true, chipColor: "#4fc3f7" },
  { label: "Match formula",   value: "50% up to 8% of salary",    bold: true },
  { label: "Vesting schedule",value: "Graded 6-Year",             chip: true, chipColor: "#f0a500" },
  { label: "Safe harbor",     value: "No — ADP test required",    chip: true, chipColor: "#ef4444" },
  { label: "Enrollment code", value: "ACME-2025-ENROLL",          mono: true },
  { label: "Plan start date", value: "Jan 1, 2020",               bold: true },
  { label: "IRS limit 2025",  value: "$23,000 employee · $69,000 total", bold: true },
];

const metrics = [
  { label: "Participation rate",  value: "78.4%", pct: 78.4, color: "#4CCEAC",  sub: "978 of 1,248 eligible employees enrolled" },
  { label: "Avg deferral rate",   value: "7.4%",  pct: 74,   color: "#4fc3f7",  sub: "Industry avg: 6.8% — above benchmark ✓" },
  { label: "Full match capture",  value: "82%",   pct: 82,   color: "#f0a500",  sub: "221 employees leaving match on the table" },
  { label: "Active plan loans",   value: "184",   pct: 14.7, color: "#ef4444",  sub: "14.7% of participants have outstanding loans" },
];

// ── custom tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, colors }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ backgroundColor: colors.blueAccent[900], border: `1px solid ${colors.primary[300]}44`, borderRadius: "8px", p: "10px 14px" }}>
      <Typography sx={{ fontSize: "11px", color: colors.grey[400], mb: "4px" }}>{label}</Typography>
      {payload.map((p: any, i: number) => (
        <Typography key={i} sx={{ fontSize: "12px", fontWeight: 600, color: p.fill }}>
          {p.name}: ${(p.value / 1000000).toFixed(2)}M
        </Typography>
      ))}
    </Box>
  );
};

// ── component ──────────────────────────────────────────────────────────────────
const PlanOverview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const card = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" },
  };

  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100] }}>
          Acme Corp — Plan Overview
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined" size="small" startIcon={<DownloadIcon />}
            sx={{ borderColor: colors.primary[300] + "66", color: colors.grey[200], textTransform: "none", fontSize: "13px",
              "&:hover": { borderColor: colors.grey[400], backgroundColor: colors.primary[700] + "33" } }}>
            Download Report
          </Button>
          <Button variant="contained" size="small" startIcon={<UploadIcon />}
            sx={{ backgroundColor: "#1a2744", color: colors.grey[100], textTransform: "none", fontSize: "13px", fontWeight: 600,
              border: `1px solid ${colors.primary[300]}55`, "&:hover": { backgroundColor: colors.blueAccent[700] } }}>
            Upload Payroll
          </Button>
        </Box>
      </Box>

      {/* Summary cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", mb: "20px" }}>
        {summaryCards.map((c, i) => (
          <Box key={i} sx={{ ...card, borderTop: `3px solid ${c.accent}` }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", color: colors.grey[500], mb: "8px" }}>
              {c.label}
            </Typography>
            <Typography sx={{ fontSize: "28px", fontWeight: 700, color: colors.grey[100], mb: "6px" }}>
              {c.value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px", mb: "4px" }}>
              <TrendingUpIcon sx={{ fontSize: 13, color: c.changeColor }} />
              <Typography sx={{ fontSize: "12px", fontWeight: 600, color: c.changeColor }}>{c.change}</Typography>
            </Box>
            <Typography sx={{ fontSize: "11px", color: colors.grey[500] }}>{c.sub}</Typography>
          </Box>
        ))}
      </Box>

      {/* Middle row: Chart + Alerts */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "16px", mb: "20px" }}>

        {/* Contributions chart */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              💰 Contributions — Last 6 Months
            </Typography>
            <Box sx={{ display: "flex", gap: "14px" }}>
              {[{ label: "Employee", color: "#6366f1" }, { label: "Match", color: "#4CCEAC" }].map((l) => (
                <Box key={l.label} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: l.color }} />
                  <Typography sx={{ fontSize: "11px", color: colors.grey[400] }}>{l.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barGap={4} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.primary[300] + "22"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: colors.grey[500] }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatY} tick={{ fontSize: 11, fill: colors.grey[500] }} axisLine={false} tickLine={false} width={52} />
              <Tooltip content={(props) => <CustomTooltip {...props} colors={colors} />} />
              <Bar dataKey="employee" name="Employee" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="match"    name="Match"    fill="#4CCEAC" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Plan Alerts */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              🚨 Plan Alerts
            </Typography>
            <Chip label="2 action needed" size="small"
              sx={{ backgroundColor: "#ef444411", color: "#ef4444", border: "1px solid #ef444433", fontSize: "10px", fontWeight: 700, height: "20px" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {alerts.map((a, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: "10px", backgroundColor: a.bg,
                border: `1px solid ${a.border}`, borderRadius: "8px", p: "12px 14px" }}>
                <Box sx={{ color: a.iconColor, mt: "1px", flexShrink: 0 }}>{a.icon}</Box>
                <Box>
                  <Typography sx={{ fontSize: "12px", fontWeight: 700, color: a.iconColor, mb: "2px" }}>{a.title}</Typography>
                  <Typography sx={{ fontSize: "11px", color: colors.grey[400], lineHeight: 1.5 }}>{a.sub}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bottom row: Plan Config + Participation Metrics */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "16px" }}>

        {/* Plan Configuration */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              🗒️ Plan Configuration
            </Typography>
            <Button size="small" startIcon={<EditIcon sx={{ fontSize: 13 }} />}
              sx={{ fontSize: "12px", color: colors.grey[300], textTransform: "none", border: `1px solid ${colors.primary[300]}44`,
                px: "10px", py: "3px", borderRadius: "6px", "&:hover": { backgroundColor: colors.primary[700] + "44" } }}>
              Edit Plan
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {planConfig.map((row, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "10px",
                borderBottom: i < planConfig.length - 1 ? `1px solid ${colors.primary[300]}22` : "none" }}>
                <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>{row.label}</Typography>
                {row.chip ? (
                  <Chip label={row.value} size="small"
                    sx={{ backgroundColor: row.chipColor + "18", color: row.chipColor, border: `1px solid ${row.chipColor}44`,
                      fontSize: "11px", fontWeight: 600, height: "22px", fontFamily: "monospace" }} />
                ) : (
                  <Typography sx={{ fontSize: "13px", fontWeight: row.bold ? 600 : 400,
                    color: colors.grey[100], fontFamily: row.mono ? "monospace" : "inherit" }}>
                    {row.value}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Participation Metrics */}
        <Box sx={{ ...card }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "20px" }}>
            📊 Participation Metrics
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {metrics.map((m, i) => (
              <Box key={i}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "6px" }}>
                  <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>{m.label}</Typography>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: m.color }}>{m.value}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={m.pct}
                  sx={{ height: 6, borderRadius: 3, backgroundColor: colors.primary[700],
                    "& .MuiLinearProgress-bar": { borderRadius: 3, backgroundColor: m.color } }} />
                <Typography sx={{ fontSize: "11px", color: colors.grey[500], mt: "4px" }}>{m.sub}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanOverview;