import { Box, Typography, useTheme, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

// ── static data ───────────────────────────────────────────────────────────────
const allData = [
  { date: "Jan 24", value: 210000 },
  { date: "Feb 24", value: 215500 },
  { date: "Mar 24", value: 219000 },
  { date: "Apr 24", value: 224000 },
  { date: "May 24", value: 229500 },
  { date: "Jun 24", value: 235000 },
  { date: "Jul 24", value: 241000 },
  { date: "Aug 24", value: 248000 },
  { date: "Sep 24", value: 255000 },
  { date: "Oct 24", value: 263000 },
  { date: "Nov 24", value: 272000 },
  { date: "Dec 24", value: 282300 },
  { date: "Jan 25", value: 286500 },
  { date: "Feb 25", value: 290100 },
  { date: "Mar 25", value: 296520 },
] as const;

const rangeMap = {
  "3M": 3,
  "1Y": 12,
  All: allData.length,
} as const;

type RangeKey = keyof typeof rangeMap;

const assetBreakdown = [
  { emoji: "🏦", label: "Cash & Savings", value: "$42,500", color: null },
  { emoji: "🪙", label: "401(k) Balance", value: "$92,840", color: "#4fc3f7" },
  { emoji: "✅", label: "Brokerage", value: "$195,560", color: null },
] as const;

const formatY = (v: number) => `$${(v / 1000).toFixed(0)}k`;

// ── custom tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip = ({
  active,
  payload,
  label,
  colors,
}: TooltipContentProps<ValueType, NameType> & { colors: ReturnType<typeof tokens> }) => {
  if (!active || !payload?.length || !label) return null;

  const value = payload[0]?.value;

  return (
    <Box
      sx={{
        backgroundColor: colors.blueAccent[900],
        border: `1px solid ${colors.primary[300]}44`,
        borderRadius: "8px",
        p: "10px 14px",
      }}
    >
      <Typography sx={{ fontSize: "11px", color: colors.grey[400], mb: "2px" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#4CCEAC" }}>
        ${Number(value).toLocaleString()}
      </Typography>
    </Box>
  );
};

// ── component ──────────────────────────────────────────────────────────────────
const NetWorthTracker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [range, setRange] = useState<RangeKey>("1Y");

  const chartData = useMemo(() => {
    const count = rangeMap[range];
    return allData.slice(-count);
  }, [range]);

  const card = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" },
  } as const;

  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* Header */}
      <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100], mb: "24px" }}>
        Net Worth Tracker
      </Typography>

      {/* Two-column layout */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Left: Current Net Worth */}
        <Box sx={{ ...card }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "16px" }}>
            💎 Current Net Worth
          </Typography>

          <Typography sx={{ fontSize: "42px", fontWeight: 700, color: colors.grey[100], lineHeight: 1.1, mb: "4px" }}>
            $296,520
          </Typography>
          <Typography sx={{ fontSize: "12px", color: colors.grey[500], mb: "16px" }}>
            As of March 15, 2025
          </Typography>

          {/* Change banner */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#4CCEAC11",
              border: "1px solid #4CCEAC33",
              borderRadius: "8px",
              p: "10px 14px",
              mb: "20px",
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 16, color: "#4CCEAC" }} />
            <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#4CCEAC" }}>
              +$14,200
            </Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
              +5.0% this month
            </Typography>
          </Box>

          {/* Assets / Liabilities */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", mb: "24px" }}>
            {[
              { label: "Total Assets", value: "$330,900", color: "#4CCEAC" },
              { label: "Total Liabilities", value: "$34,380", color: "#e74c3c" },
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: colors.primary[700] + "55",
                  border: `1px solid ${colors.primary[300]}22`,
                  borderRadius: "8px",
                  p: "12px 14px",
                }}
              >
                <Typography sx={{ fontSize: "11px", color: colors.grey[500], mb: "4px" }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: "20px", fontWeight: 700, color: item.color }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Assets breakdown */}
          <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[300], mb: "12px" }}>
            Assets Breakdown
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {assetBreakdown.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: "9px",
                  borderBottom: i < assetBreakdown.length - 1
                    ? `1px solid ${colors.primary[300]}22`
                    : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px" }}>{item.emoji}</Typography>
                  <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: item.color || colors.grey[100],
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right: Net Worth History chart */}
        <Box sx={{ ...card }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
              📈 Net Worth History
            </Typography>
            <ToggleButtonGroup
              value={range}
              exclusive
              onChange={(_, v) => v && setRange(v as RangeKey)}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: colors.grey[400],
                  border: `1px solid ${colors.primary[300]}44`,
                  px: "10px",
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
              {(["3M", "1Y", "All"] as const).map((r) => (
                <ToggleButton key={r} value={r}>
                  {r}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CCEAC" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4CCEAC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.primary[300] + "22"}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: colors.grey[500] }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={formatY}
                tick={{ fontSize: 11, fill: colors.grey[500] }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} colors={colors} />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4CCEAC"
                strokeWidth={2.5}
                fill="url(#netWorthGradient)"
                dot={false}
                activeDot={{ r: 5, fill: "#4CCEAC", stroke: colors.blueAccent[900], strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default NetWorthTracker;