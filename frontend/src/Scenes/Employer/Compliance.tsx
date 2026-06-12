import { Box, Typography, useTheme, Button, Chip, LinearProgress } from "@mui/material";
import { tokens } from "../../theme";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// ── static data ───────────────────────────────────────────────────────────────
const adpRows = [
  { label: "HCE avg deferral",    value: "8.2%" },
  { label: "NHCE avg deferral",   value: "6.4%" },
  { label: "ADP limit (NHCE+2%)", value: "8.4%" },
];

const form5500Rows = [
  { label: "Plan year end",   value: "Dec 31, 2024", highlight: false },
  { label: "Filing due date", value: "Mar 31, 2025", highlight: false },
  { label: "Days remaining",  value: "14 days",      highlight: false },
  { label: "Status",          value: "ACTION REQUIRED", chip: true, chipColor: "#ef4444" },
];

const irsLimits = [
  { label: "402(G) DEFERRAL LIMIT", value: "$23,000", sub: "Employees approaching limit: 24", pct: 24, color: "#f0a500" },
  { label: "415 ANNUAL ADDITIONS",  value: "$69,000", sub: "Employees at risk: 0",            pct: 2,  color: "#4CCEAC" },
  { label: "CATCH-UP (AGE 50+)",    value: "$7,500",  sub: "Eligible employees: 184",         pct: 65, color: "#4fc3f7" },
];

// ── component ──────────────────────────────────────────────────────────────────
const Compliance = () => {
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
          Compliance & Reporting
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined" size="small" startIcon={<DescriptionOutlinedIcon />}
            sx={{ borderColor: colors.primary[300] + "66", color: colors.grey[200], textTransform: "none", fontSize: "13px",
              "&:hover": { borderColor: colors.grey[400], backgroundColor: colors.primary[700] + "33" } }}>
            Generate Form 5500
          </Button>
          <Button variant="contained" size="small" startIcon={<PlayArrowIcon />}
            sx={{ backgroundColor: "#1a2744", color: colors.grey[100], textTransform: "none", fontSize: "13px", fontWeight: 600,
              border: `1px solid ${colors.primary[300]}55`, "&:hover": { backgroundColor: colors.blueAccent[700] } }}>
            Run ADP Test
          </Button>
        </Box>
      </Box>

      {/* Top row: ADP Test + Form 5500 */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", mb: "20px" }}>

        {/* ADP/ACP Test */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              📊 ADP/ACP Test — 2025
            </Typography>
            <Chip label="PASS" size="small"
              sx={{ backgroundColor: "#4CCEAC11", color: "#4CCEAC", border: "1px solid #4CCEAC33", fontSize: "10px", fontWeight: 700, height: "20px" }} />
          </Box>

          {/* Rows */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {adpRows.map((row, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "12px",
                borderBottom: `1px solid ${colors.primary[300]}22` }}>
                <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>{row.label}</Typography>
                <Typography sx={{ fontSize: "13px", fontWeight: 700, color: colors.grey[100] }}>{row.value}</Typography>
              </Box>
            ))}
            {/* Result row */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "12px" }}>
              <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>Result</Typography>
              <Chip label="PASS — under limit" size="small"
                sx={{ backgroundColor: "#4CCEAC11", color: "#4CCEAC", border: "1px solid #4CCEAC33", fontSize: "11px", fontWeight: 700, height: "22px" }} />
            </Box>
          </Box>

          {/* Green info banner */}
          <Box sx={{ backgroundColor: "#4CCEAC0d", border: "1px solid #4CCEAC33", borderRadius: "8px", p: "12px 14px", mt: "4px" }}>
            <Typography sx={{ fontSize: "12px", color: "#4CCEAC", lineHeight: 1.5 }}>
              HCE deferral (8.2%) is under the ADP limit (8.4%) — no corrective action needed.
            </Typography>
          </Box>
        </Box>

        {/* Form 5500 Filing Status */}
        <Box sx={{ ...card }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "20px" }}>
            🗒️ Form 5500 Filing Status
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {form5500Rows.map((row, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "12px",
                borderBottom: i < form5500Rows.length - 1 ? `1px solid ${colors.primary[300]}22` : "none" }}>
                <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>{row.label}</Typography>
                {row.chip ? (
                  <Chip label={row.value} size="small"
                    sx={{ backgroundColor: row.chipColor + "18", color: row.chipColor, border: `1px solid ${row.chipColor}44`,
                      fontSize: "10px", fontWeight: 700, height: "22px", fontFamily: "monospace", letterSpacing: "0.4px" }} />
                ) : (
                  <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.value}</Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Red warning banner */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#ef444411",
            border: "1px solid #ef444433", borderRadius: "8px", p: "12px 14px", mt: "16px" }}>
            <WarningAmberIcon sx={{ fontSize: 15, color: "#ef4444", mt: "1px", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "12px", color: "#ef4444", lineHeight: 1.5 }}>
              Filing deadline approaching. Contact your plan administrator immediately.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* IRS Limit Monitoring */}
      <Box sx={{ ...card }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "20px" }}>
          📊 IRS Limit Monitoring — 2025
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {irsLimits.map((item, i) => (
            <Box key={i} sx={{
              backgroundColor: colors.primary[700] + "44",
              border: `1px solid ${colors.primary[300]}22`,
              borderRadius: "10px",
              p: "18px 20px",
            }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.8px", color: colors.grey[500], mb: "8px" }}>
                {item.label}
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: colors.grey[100], mb: "6px" }}>
                {item.value}
              </Typography>
              <Typography sx={{ fontSize: "11px", color: colors.grey[500], mb: "12px" }}>
                {item.sub}
              </Typography>
              <LinearProgress variant="determinate" value={item.pct}
                sx={{ height: 5, borderRadius: 3, backgroundColor: colors.primary[700],
                  "& .MuiLinearProgress-bar": { borderRadius: 3, backgroundColor: item.color } }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Compliance;