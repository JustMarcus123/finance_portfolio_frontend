import { Box, Typography, useTheme, Button, Chip, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { tokens } from "../../theme";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";

// ── static data ───────────────────────────────────────────────────────────────
const summaryCards = [
  { label: "EMPLOYEE YTD",      value: "$5.6M", valueColor: null,      sub: "All employee deferrals",    accent: "#4fc3f7" },
  { label: "EMPLOYER MATCH YTD",value: "$2.8M", valueColor: "#4CCEAC", sub: "Company contributions",     accent: "#4CCEAC" },
  { label: "PROFIT SHARING",    value: "$0",    valueColor: "#f0a500", sub: "Not yet declared for 2025", accent: "#f0a500" },
  { label: "TOTAL YTD",         value: "$8.4M", valueColor: null,      sub: "Combined contributions",    accent: "#6366f1" },
];

type FilterType = "All" | "Employee" | "Match";

const allBatches = [
  { id: "BATCH-0315-EMP",   type: "EMPLOYEE", typeColor: "#4fc3f7", typeBg: "#4fc3f711", period: "Mar 15", participants: "1,248", total: "$466,800", avg: "$374", status: "POSTED", postedAt: "Mar 15 09:02" },
  { id: "BATCH-0315-MATCH", type: "MATCH",    typeColor: "#4CCEAC", typeBg: "#4CCEAC11", period: "Mar 15", participants: "1,186", total: "$233,400", avg: "$187", status: "POSTED", postedAt: "Mar 15 09:04" },
  { id: "BATCH-0301-EMP",   type: "EMPLOYEE", typeColor: "#4fc3f7", typeBg: "#4fc3f711", period: "Mar 1",  participants: "1,244", total: "$464,800", avg: "$374", status: "POSTED", postedAt: "Mar 1 09:01"  },
];

// ── component ──────────────────────────────────────────────────────────────────
const ContributionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = allBatches.filter((r) => {
    if (filter === "Employee") return r.type === "EMPLOYEE";
    if (filter === "Match")    return r.type === "MATCH";
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

  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100] }}>
          Contribution History
        </Typography>
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
          Export
        </Button>
      </Box>

      {/* Summary cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", mb: "20px" }}>
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

      {/* Batch Contribution History */}
      <Box sx={{ ...card }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
            💰 Batch Contribution History
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
            {(["All", "Employee", "Match"] as FilterType[]).map((f) => (
              <ToggleButton key={f} value={f}>{f}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Table header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.6fr 0.8fr 0.8fr 0.9fr 1.1fr 1fr 0.8fr 1fr",
            pb: "8px",
            borderBottom: `1px solid ${colors.primary[300]}33`,
            mb: "4px",
          }}
        >
          {["BATCH ID", "TYPE", "PAY PERIOD", "PARTICIPANTS", "TOTAL AMOUNT", "AVG PER PERSON", "STATUS", "POSTED AT"].map((h) => (
            <Typography key={h} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>
              {h}
            </Typography>
          ))}
        </Box>

        {/* Table rows */}
        {filtered.map((row, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.6fr 0.8fr 0.8fr 0.9fr 1.1fr 1fr 0.8fr 1fr",
              py: "12px",
              alignItems: "center",
              borderBottom: i < filtered.length - 1
                ? `1px solid ${colors.primary[300]}22`
                : "none",
              "&:hover": { backgroundColor: colors.primary[700] + "22", borderRadius: "6px" },
            }}
          >
            <Typography sx={{ fontSize: "12px", color: colors.grey[300], fontFamily: "monospace" }}>
              {row.id}
            </Typography>
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
                  letterSpacing: "0.3px",
                  height: "20px",
                }}
              />
            </Box>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.period}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.participants}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: colors.grey[100] }}>{row.total}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.avg}</Typography>
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
            <Typography sx={{ fontSize: "12px", color: colors.grey[500], fontFamily: "monospace" }}>
              {row.postedAt}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContributionHistory;