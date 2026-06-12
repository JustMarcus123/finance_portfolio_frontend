import {
  Box,
  Typography,
  useTheme,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { useState } from "react";

// ── static data ───────────────────────────────────────────────────────────────
const summaryCards = [
  {
    label: "EMPLOYEE YTD",
    value: "$5,600",
    sub: "8% × $70k salary",
    accent: "#4fc3f7",
    valueColor: null,
  },
  {
    label: "EMPLOYER MATCH YTD",
    value: "$2,800",
    sub: "50% match — fully captured ✓",
    accent: "#4CCEAC",
    valueColor: "#4CCEAC",
  },
  {
    label: "IRS LIMIT REMAINING",
    value: "$17,400",
    sub: "of $23,000 annual limit",
    accent: "#f0a500",
    valueColor: null,
  },
];

type FilterType = "All" | "Employee" | "Employer";

const allHistory = [
  { date: "Mar 15, 2025", type: "EMPLOYEE DEFERRAL", typeColor: "#4fc3f7", typeBg: "#4fc3f711", period: "Mar Payroll", amount: "+$466.67", status: "POSTED" },
  { date: "Mar 15, 2025", type: "EMPLOYER MATCH",    typeColor: "#4CCEAC",  typeBg: "#4CCEAC11",  period: "Mar Payroll", amount: "+$233.33", status: "POSTED" },
  { date: "Feb 28, 2025", type: "EMPLOYEE DEFERRAL", typeColor: "#4fc3f7", typeBg: "#4fc3f711", period: "Feb Payroll", amount: "+$466.67", status: "POSTED" },
  { date: "Feb 28, 2025", type: "EMPLOYER MATCH",    typeColor: "#4CCEAC",  typeBg: "#4CCEAC11",  period: "Feb Payroll", amount: "+$233.33", status: "POSTED" },
  { date: "Jan 2025",     type: "PROFIT SHARING",    typeColor: "#f0a500",  typeBg: "#f0a50011",  period: "Annual",      amount: "+$1,200.00", status: "POSTED" },
];

// ── component ──────────────────────────────────────────────────────────────────
const Contributions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [filter, setFilter] = useState<FilterType>("All");
  const [preTax, setPreTax] = useState("8%");
  const [roth, setRoth] = useState("0%");
  const [afterTax, setAfterTax] = useState("0%");

  const filteredHistory = allHistory.filter((row) => {
    if (filter === "Employee") return row.type === "EMPLOYEE DEFERRAL";
    if (filter === "Employer") return row.type === "EMPLOYER MATCH" || row.type === "PROFIT SHARING";
    return true;
  });

  const card = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" },
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: colors.primary[700] + "55",
      borderRadius: "8px",
      color: colors.grey[100],
      fontSize: "14px",
      "& fieldset": { borderColor: colors.primary[300] + "44" },
      "&:hover fieldset": { borderColor: colors.primary[300] + "88" },
      "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
    },
    "& .MuiInputLabel-root": { color: colors.grey[400], fontSize: "13px" },
    "& .MuiFormHelperText-root": { color: colors.grey[500], fontSize: "11px", mx: 0 },
  };

  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100] }}>
          Contributions
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<SwapHorizIcon />}
          sx={{
            backgroundColor: "#1a2744",
            color: colors.grey[100],
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 600,
            border: `1px solid ${colors.primary[300]}55`,
            "&:hover": { backgroundColor: colors.blueAccent[700] },
          }}
        >
          Change Deferral Rate
        </Button>
      </Box>

      {/* Summary cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", mb: "20px" }}>
        {summaryCards.map((c, i) => (
          <Box key={i} sx={{ ...card, borderTop: `3px solid ${c.accent}` }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", color: colors.grey[500], mb: "8px" }}>
              {c.label}
            </Typography>
            <Typography sx={{ fontSize: "28px", fontWeight: 700, color: c.valueColor || colors.grey[100], mb: "6px" }}>
              {c.value}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[500] }}>
              {c.sub}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Contribution History */}
      <Box sx={{ ...card, mb: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
            💰 Contribution History
          </Typography>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => v && setFilter(v as FilterType)}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                fontSize: "11px",
                fontWeight: 600,
                color: colors.grey[400],
                border: `1px solid ${colors.primary[300]}44`,
                px: "12px",
                py: "3px",
                textTransform: "none",
                "&.Mui-selected": {
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  borderColor: colors.blueAccent[500],
                },
                "&:hover": { backgroundColor: colors.primary[700] + "55" },
              },
            }}
          >
            {(["All", "Employee", "Employer"] as FilterType[]).map((f) => (
              <ToggleButton key={f} value={f}>{f}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Table header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1.8fr 1.4fr 1fr 1.2fr 0.8fr",
            pb: "8px",
            borderBottom: `1px solid ${colors.primary[300]}33`,
            mb: "4px",
          }}
        >
          {["DATE", "TYPE", "PAY PERIOD", "AMOUNT", "FUND ALLOCATED", "STATUS"].map((h) => (
            <Typography key={h} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>
              {h}
            </Typography>
          ))}
        </Box>

        {/* Table rows */}
        {filteredHistory.map((row, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1.8fr 1.4fr 1fr 1.2fr 0.8fr",
              py: "12px",
              alignItems: "center",
              borderBottom: i < filteredHistory.length - 1
                ? `1px solid ${colors.primary[300]}22`
                : "none",
              "&:hover": { backgroundColor: colors.primary[700] + "22", borderRadius: "6px" },
            }}
          >
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.date}</Typography>
            <Box>
              <Chip
                label={row.type}
                size="small"
                sx={{
                  backgroundColor: row.typeBg,
                  color: row.typeColor,
                  border: `1px solid ${row.typeColor}44`,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  height: "20px",
                }}
              />
            </Box>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.period}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.amount}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>Per allocation</Typography>
            <Chip
              label={row.status}
              size="small"
              sx={{
                backgroundColor: "#4CCEAC11",
                color: "#4CCEAC",
                border: "1px solid #4CCEAC33",
                fontSize: "10px",
                fontWeight: 700,
                height: "20px",
                width: "fit-content",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Update Deferral Election */}
      <Box sx={{ ...card }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "20px" }}>
          ✏️ Update Deferral Election
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", mb: "20px" }}>
          <TextField
            label="Pre-Tax Deferral %"
            value={preTax}
            onChange={(e) => setPreTax(e.target.value)}
            helperText="Currently: $466.67/paycheck"
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Roth 401(k) %"
            value={roth}
            onChange={(e) => setRoth(e.target.value)}
            helperText="After-tax contributions"
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="After-Tax %"
            value={afterTax}
            onChange={(e) => setAfterTax(e.target.value)}
            helperText="Beyond IRS limit"
            fullWidth
            sx={inputSx}
          />
        </Box>

        {/* Tip + Save */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#4fc3f711",
            border: "1px solid #4fc3f733",
            borderRadius: "8px",
            p: "14px 16px",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <LightbulbOutlinedIcon sx={{ fontSize: 16, color: "#4fc3f7", mt: "2px", flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#4fc3f7", mb: "2px" }}>
                Maximize employer match
              </Typography>
              <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                Contribute at least 8% to get full 50% employer match ($2,800/yr free money)
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#1a2744",
              color: colors.grey[100],
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              border: `1px solid ${colors.primary[300]}55`,
              whiteSpace: "nowrap",
              flexShrink: 0,
              "&:hover": { backgroundColor: colors.blueAccent[700] },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contributions;