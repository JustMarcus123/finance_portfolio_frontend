import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { GetEmployee401kBalance } from "./API/EmployeeBalanceApi";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "1Y" | "3Y" | "All";

interface StatCard {
  label: string;
  value: string;
  change: string;
  sub: string;
  positive: boolean;
  accent: string;
}

interface employee401kBalanceType{
  balance: string;
}

interface GrowthDataset {
  labels: string[];
  data: number[];
}

interface VestingStep {
  label: string;
  value: string;
  color: string;
  active: boolean;
}

interface Alert {
  icon: string;
  title: string;
  sub: string;
  bg: string;
}



const growthDatasets: Record<TabKey, GrowthDataset> = {
  "1Y": {
    labels: ["Mar'24", "Jun'24", "Sep'24", "Dec'24", "Mar'25"],
    data: [65000, 70000, 76000, 85000, 92840],
  },
  "3Y": {
    labels: ["2022", "2023", "2024", "2025"],
    data: [42000, 58000, 79000, 92840],
  },
  All: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    data: [18000, 25000, 35000, 42000, 58000, 79000, 92840],
  },
};

const vestingSteps: VestingStep[] = [
  { label: "Year 1-2", value: "0%", color: "#e74c3c", active: false },
  { label: "Year 3", value: "20%", color: "#f59e0b", active: false },
  { label: "Year 4", value: "40%", color: "#f59e0b", active: false },
  { label: "Year 5 (now)", value: "80% ✓", color: "#3b82f6", active: true },
  { label: "Year 6", value: "100%", color: "#22c55e", active: false },
];

const alerts: Alert[] = [
  {
    icon: "🎁",
    title: "Employer match posted",
    sub: "$233.33 employer match credited · March payroll",
    bg: "#e6f9f0",
  },
  {
    icon: "⚠️",
    title: "Dining budget at 82%",
    sub: "$164 of $200 spent this month",
    bg: "#fef3dc",
  },
  {
    icon: "📊",
    title: "Q1 2025 statement ready",
    sub: "Your quarterly account statement is available",
    bg: "transparent",
  },
  {
    icon: "📅",
    title: "RMD reminder",
    sub: "Required Minimum Distribution rules updated for 2025",
    bg: "transparent",
  },
];

// ─── Vesting Circle ───────────────────────────────────────────────────────────

const VestingCircle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = 40, cy = 40, r = 32, pct = 0.8;
    ctx.clearRect(0, 0, 80, 80);

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.stroke();

    // Label
    ctx.fillStyle = "#111827";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("80%", cx, cy - 7);
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("VESTED", cx, cy + 9);
  }, []);

  return (
    <canvas ref={canvasRef} width={80} height={80} aria-label="80% vested" />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const EmployeeDashboard: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("1Y");

  const isDark = theme.palette.mode === "dark";

  // Shared card style
  const card = {
    backgroundColor: colors.primary[400],
    borderRadius: "12px",
    border: `0.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
    p: "16px 18px",
  };

  // ── Growth chart ──
  const growth = growthDatasets[activeTab];

  const lineData = {
    labels: growth.labels,
    datasets: [
      {
        label: "401(k) Balance",
        data: growth.data,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.08)",
        fill: true,
        tension: 0.35,
        pointBackgroundColor: "#3b82f6",
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (c: TooltipItem<"line">) =>
            "$" + (c.raw as number).toLocaleString(),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10 },
          color: isDark ? "#9ca3af" : "#6b7280",
        },
      },
      y: {
        ticks: {
          callback: (value: number | string) =>
            "$" + Math.round(Number(value) / 1000) + "k",
          font: { size: 10 },
          color: isDark ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  // ── Donut chart ──
  const donutData = {
    labels: ["Your Deferrals", "Employer Match"],
    datasets: [
      {
        data: [5600, 2800],
        backgroundColor: ["#3b82f6", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const donutOptions: ChartOptions<"doughnut"> = {
    cutout: "72%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (c: TooltipItem<"doughnut">) =>
            "$" + (c.raw as number).toLocaleString(),
        },
      },
    },
    responsive: false,
  };


  //------------------------------------------
  //states for handling employee 401k balance
  //------------------------------------------

  const [load401kBalance, setLoad401kBalance] = useState(false);
  const [employee401kBalance , setEmployee401kBalance] = useState<employee401kBalanceType | null>(null);



  //fetching the 401(K) balance
useEffect(()=>{
setLoad401kBalance(true);
const getBalance = async ()=>{

  try {
    const data = await GetEmployee401kBalance();
    setEmployee401kBalance(data)
    
  } catch (error) {
    console.error("fetch error", error);
    
  }finally{
    setLoad401kBalance(false);
  }
} 

getBalance();

},[])





const statCards: StatCard[] = [
  {
    label: "401(K) BALANCE",
    value: load401kBalance
     ? "loading...." : `$${employee401kBalance?.balance?.toLocaleString()?? "0"}`,
    change: "+$3,420 this quarter",
    sub: "Acme Corp Plan · Vested: 80%",
    positive: true,
    accent: "#3b82f6",
  },
  {
    label: "TOTAL NET WORTH",
    value: "$296,520",
    change: "+$14,200 this month",
    sub: "All accounts combined",
    positive: true,
    accent: "#22c55e",
  },
  {
    label: "YTD CONTRIBUTIONS",
    value: "$8,400",
    change: "On track",
    sub: "You: $5,600 · Employer: $2,800",
    positive: true,
    accent: "#f59e0b",
  },
  {
    label: "RETIREMENT READINESS",
    value: "78%",
    change: "+3% from last year",
    sub: "Proj. corpus: $1.84M at 65",
    positive: true,
    accent: "#a855f7",
  },
];



  return (
    <Box
      sx={{
        p: "20px 24px",
        backgroundColor: isDark ? colors.primary[500] : "#f3f4f6",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      {/* ── Top bar ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "18px",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", fontWeight: 600, color: colors.grey[100] }}
        >
           Good morning, {user?.name || "Alex"} 👋 
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          {[NotificationsNoneIcon, SettingsOutlinedIcon].map((Icon, i) => (
            <Box
              key={i}
              sx={{
                width: 34,
                height: 34,
                borderRadius: "8px",
                border: `0.5px solid ${
                  isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }`,
                backgroundColor: colors.primary[400],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { backgroundColor: colors.primary[300] },
              }}
            >
              <Icon sx={{ fontSize: 18, color: colors.grey[300] }} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Stat cards ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          mb: "14px",
        }}
      >
        {statCards.map((c, i) => (
          <Box
            key={i}
            sx={{
              ...card,
              borderTop: `3px solid ${c.accent}`,
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.7px",
                color: colors.grey[500],
                textTransform: "uppercase",
                mb: "6px",
              }}
            >
              {c.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: colors.grey[100],
                lineHeight: 1.1,
                mb: "6px",
              }}
            >
              {c.value}
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: c.positive ? "#e6f9f0" : "#fde8e8",
                borderRadius: "20px",
                px: "8px",
                py: "2px",
              }}
            >
              {c.positive ? (
                <TrendingUpIcon sx={{ fontSize: 11, color: "#1a7a4a" }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 11, color: "#a33030" }} />
              )}
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: c.positive ? "#1a7a4a" : "#a33030",
                }}
              >
                {c.change}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "11px", color: colors.grey[500], mt: "4px" }}
            >
              {c.sub}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Middle row: Growth chart + Contribution breakdown ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          mb: "14px",
        }}
      >
        {/* Growth chart */}
        <Box sx={card}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "14px",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: colors.grey[100],
              }}
            >
              📈 401(k) Growth
            </Typography>
            <Box sx={{ display: "flex", gap: "4px" }}>
              {(["1Y", "3Y", "All"] as TabKey[]).map((tab) => (
                <Box
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    fontSize: "11px",
                    px: "9px",
                    py: "3px",
                    borderRadius: "20px",
                    border: `0.5px solid ${
                      activeTab === tab
                        ? "#1e3a8a"
                        : isDark
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.15)"
                    }`,
                    backgroundColor:
                      activeTab === tab ? "#1e3a8a" : "transparent",
                    color: activeTab === tab ? "#fff" : colors.grey[400],
                    cursor: "pointer",
                    fontWeight: activeTab === tab ? 600 : 400,
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ height: "200px", position: "relative" }}>
            <Line data={lineData} options={lineOptions} />
          </Box>
        </Box>

        {/* Contribution breakdown */}
        <Box sx={card}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: colors.grey[100],
              mb: "14px",
            }}
          >
            💰 Contribution Breakdown (YTD)
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Doughnut data={donutData} options={donutOptions} width={90} height={90} />
            <Box sx={{ flex: 1 }}>
              {/* Your deferrals */}
              <Box sx={{ mb: "12px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "4px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: colors.grey[400] }}
                  >
                    Your Deferrals
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: colors.grey[100],
                    }}
                  >
                    $5,600
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 5,
                    borderRadius: "4px",
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#e5e7eb",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      height: "100%",
                      backgroundColor: "#3b82f6",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
                <Typography
                  sx={{ fontSize: "10px", color: colors.grey[500], mt: "2px" }}
                >
                  8% of $70,000 salary · IRS limit: $23,000
                </Typography>
              </Box>

              {/* Employer match */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "4px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: colors.grey[400] }}
                  >
                    Employer Match
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#22c55e",
                    }}
                  >
                    $2,800
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 5,
                    borderRadius: "4px",
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#e5e7eb",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "40%",
                      height: "100%",
                      backgroundColor: "#22c55e",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
                <Typography
                  sx={{ fontSize: "10px", color: colors.grey[500], mt: "2px" }}
                >
                  50% match on first 8% · Fully matched ✓
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Bottom row: Vesting + Alerts ── */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}
      >
        {/* Vesting status */}
        <Box sx={card}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "14px",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: colors.grey[100],
              }}
            >
              🔒 Vesting Status
            </Typography>
            <Box
              sx={{
                fontSize: "10px",
                fontWeight: 600,
                px: "8px",
                py: "2px",
                borderRadius: "20px",
                backgroundColor: "#fef3dc",
                color: "#9a5f00",
              }}
            >
              Graded 6-yr
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              mb: "14px",
            }}
          >
            <VestingCircle />
            <Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.grey[100],
                  mb: "3px",
                }}
              >
                Vested Amount:{" "}
                <span style={{ color: "#22c55e" }}>$2,240</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: colors.grey[400],
                  mb: "2px",
                }}
              >
                of $2,800 total employer contributions
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: colors.grey[100],
                  mb: "2px",
                }}
              >
                Fully vested in: <strong>Year 6 (2027)</strong>
              </Typography>
              <Typography
                sx={{ fontSize: "11px", color: colors.grey[500] }}
              >
                Stay 2 more years to unlock 100%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "6px",
            }}
          >
            {vestingSteps.map((s, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: s.active
                    ? isDark
                      ? "rgba(59,130,246,0.15)"
                      : "#e8eef8"
                    : isDark
                    ? "rgba(255,255,255,0.04)"
                    : "#f9fafb",
                  border: `0.5px solid ${
                    s.active
                      ? "#3b82f6"
                      : isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.08)"
                  }`,
                  borderRadius: "8px",
                  p: "8px 6px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: colors.grey[500],
                    mb: "2px",
                  }}
                >
                  {s.label}
                </Typography>
                <Typography
                  sx={{ fontSize: "13px", fontWeight: 600, color: s.color }}
                >
                  {s.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Alerts */}
        <Box sx={card}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "14px",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: colors.grey[100],
              }}
            >
              🔔 Alerts
            </Typography>
            <Box
              sx={{
                fontSize: "10px",
                fontWeight: 600,
                px: "8px",
                py: "2px",
                borderRadius: "20px",
                backgroundColor: "#1e3a8a",
                color: "#fff",
              }}
            >
              4 new
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {alerts.map((a, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  backgroundColor:
                    a.bg === "transparent"
                      ? isDark
                        ? "rgba(255,255,255,0.04)"
                        : "#f9fafb"
                      : a.bg,
                  borderRadius: "8px",
                  p: "10px 12px",
                  transition: "transform 0.15s ease",
                  "&:hover": { transform: "translateX(2px)" },
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", lineHeight: 1, mt: "1px" }}
                >
                  {a.icon}
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: colors.grey[100],
                    }}
                  >
                    {a.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: colors.grey[400],
                      mt: "1px",
                    }}
                  >
                    {a.sub}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;