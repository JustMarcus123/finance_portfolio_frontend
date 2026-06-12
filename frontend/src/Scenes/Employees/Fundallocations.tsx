import { Box, Typography, useTheme, Button, Chip } from "@mui/material";
import { tokens } from "../../theme";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import BalanceIcon from "@mui/icons-material/Balance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ── static data ───────────────────────────────────────────────────────────────
const allocations = [
  { name: "US Large Cap",     ticker: "VTSAX", exp: "0.04", pct: 60, ytd: "+12.4%", color: "#4fc3f7" },
  { name: "Intl Developed",   ticker: "VTIAX", exp: "0.11", pct: 25, ytd: "+8.2%",  color: "#4CCEAC" },
  { name: "Bond Index",       ticker: "VBTLX", exp: "0.05", pct: 10, ytd: "+3.1%",  color: "#f0a500" },
  { name: "Small Cap Value",  ticker: "VSIAX", exp: "0.07", pct:  5, ytd: "+9.8%",  color: "#a855f7" },
];

const fundMenu = [
  { name: "Vanguard Total Stock",  ticker: "VTSAX", category: "Large Cap",     catColor: "#4fc3f7", ytd: "+12.4%", exp: "0.04%" },
  { name: "Target 2055 Fund",      ticker: "VFFVX", category: "Target Date",   catColor: "#f0a500", ytd: "+10.2%", exp: "0.10%" },
  { name: "Vanguard Intl Stocks",  ticker: "VTIAX", category: "International", catColor: "#4CCEAC", ytd: "+8.2%",  exp: "0.11%" },
  { name: "Total Bond Market",     ticker: "VBTLX", category: "Bonds",         catColor: "#6ee7b7", ytd: "+3.1%",  exp: "0.05%" },
  { name: "Small Cap Value",       ticker: "VSIAX", category: "Small Cap",     catColor: "#f87171", ytd: "+9.8%",  exp: "0.07%" },
];

// ── custom tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, colors }: { active?: boolean; payload?: any[]; colors: any }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <Box sx={{
      backgroundColor: colors.blueAccent[900],
      border: `1px solid ${colors.primary[300]}44`,
      borderRadius: "8px",
      p: "10px 14px",
    }}>
      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: d.color, mb: "2px" }}>{d.name}</Typography>
      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: colors.grey[100] }}>{d.pct}%</Typography>
    </Box>
  );
};

// ── component ──────────────────────────────────────────────────────────────────
const FundAllocations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const card = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" },
  };

  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100] }}>
          Fund Allocations
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<BalanceIcon />}
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
            Rebalance
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<SwapHorizIcon />}
            sx={{
              borderColor: colors.primary[300] + "66",
              color: colors.grey[200],
              textTransform: "none",
              fontSize: "13px",
              "&:hover": { borderColor: colors.grey[400], backgroundColor: colors.primary[700] + "33" },
            }}
          >
            Change Allocations
          </Button>
        </Box>
      </Box>

      {/* Two-column layout */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        {/* ── Left: Current Allocation ── */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              🥧 Current Allocation
            </Typography>
            <Chip
              label="DIVERSIFIED"
              size="small"
              sx={{
                backgroundColor: "#4CCEAC11",
                color: "#4CCEAC",
                border: "1px solid #4CCEAC33",
                fontSize: "10px",
                fontWeight: 700,
                height: "20px",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {/* Donut chart */}
            <Box sx={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={allocations}
                    cx={75}
                    cy={75}
                    innerRadius={52}
                    outerRadius={75}
                    dataKey="pct"
                    strokeWidth={2}
                    stroke={colors.blueAccent[900]}
                  >
                    {allocations.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={(props) => <CustomTooltip {...props} colors={colors} />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <Box sx={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center", pointerEvents: "none",
              }}>
                <Typography sx={{ fontSize: "13px", fontWeight: 700, color: colors.grey[100], lineHeight: 1.2 }}>
                  $92,840
                </Typography>
              </Box>
            </Box>

            {/* Legend rows */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
              {allocations.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: "9px",
                    borderBottom: i < allocations.length - 1
                      ? `1px solid ${colors.primary[300]}22`
                      : "none",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color, flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", color: colors.grey[500], fontFamily: "monospace" }}>
                        {item.ticker} · {item.exp}% exp
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700, color: colors.grey[100] }}>
                      {item.pct}%
                    </Typography>
                    <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#4CCEAC" }}>
                      {item.ytd}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Right: Available Fund Menu ── */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              🗒️ Available Fund Menu
            </Typography>
            <Chip
              label="10 funds"
              size="small"
              sx={{
                backgroundColor: "#4fc3f711",
                color: "#4fc3f7",
                border: "1px solid #4fc3f733",
                fontSize: "10px",
                fontWeight: 700,
                height: "20px",
              }}
            />
          </Box>

          {/* Table header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 0.8fr 1.2fr 0.7fr 0.7fr",
              pb: "8px",
              borderBottom: `1px solid ${colors.primary[300]}33`,
              mb: "4px",
            }}
          >
            {["FUND", "TICKER", "CATEGORY", "YTD", "EXP RATIO"].map((h) => (
              <Typography key={h} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>
                {h}
              </Typography>
            ))}
          </Box>

          {/* Table rows */}
          {fundMenu.map((fund, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 0.8fr 1.2fr 0.7fr 0.7fr",
                py: "12px",
                alignItems: "center",
                borderBottom: i < fundMenu.length - 1
                  ? `1px solid ${colors.primary[300]}22`
                  : "none",
                "&:hover": { backgroundColor: colors.primary[700] + "22", borderRadius: "6px" },
              }}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>
                {fund.name}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: colors.grey[400], fontFamily: "monospace" }}>
                {fund.ticker}
              </Typography>
              <Box>
                <Chip
                  label={fund.category}
                  size="small"
                  sx={{
                    backgroundColor: fund.catColor + "18",
                    color: fund.catColor,
                    border: `1px solid ${fund.catColor}44`,
                    fontSize: "10px",
                    fontWeight: 600,
                    height: "20px",
                    fontFamily: "monospace",
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#4CCEAC" }}>
                {fund.ytd}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>
                {fund.exp}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FundAllocations;