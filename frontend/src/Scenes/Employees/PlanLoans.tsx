import {
  Box,
  Typography,
  useTheme,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// ── static data ───────────────────────────────────────────────────────────────
const summaryCards = [
  {
    label: "MAX LOAN ELIGIBLE",
    value: "$46,420",
    sub: "50% of vested balance ($90,600 × 50%)",
    accent: "#4fc3f7",
    valueColor: null,
  },
  {
    label: "ACTIVE LOAN BALANCE",
    value: "$8,200",
    sub: "1 active plan loan",
    accent: "#f0a500",
    valueColor: "#f0a500",
  },
  {
    label: "AVAILABLE TO BORROW",
    value: "$38,220",
    sub: "Max minus outstanding",
    accent: "#4CCEAC",
    valueColor: "#4CCEAC",
  },
];

const activeLoans = [
  {
    title: "General Purpose Loan",
    id: "LOAN-2024-001",
    issued: "Jun 15, 2024",
    outstanding: "$8,200",
    original: "$10,000",
    originalRaw: 10000,
    repaidRaw: 1800,
    interestRate: "5.5% APR",
    payrollDeduction: "$192/mo",
    payoffDate: "Jun 2029",
  },
];

const repaymentHistory = [
  { date: "Mar 15, 2025", loanId: "LOAN-2024-001", payment: "$192.00", principal: "$153.62", interest: "$38.38", remaining: "$8,200.00" },
  { date: "Feb 28, 2025", loanId: "LOAN-2024-001", payment: "$192.00", principal: "$152.91", interest: "$39.09", remaining: "$8,353.62" },
  { date: "Jan 31, 2025", loanId: "LOAN-2024-001", payment: "$192.00", principal: "$152.21", interest: "$39.79", remaining: "$8,506.53" },
];

// ── component ──────────────────────────────────────────────────────────────────
const PlanLoans = () => {
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
          Plan Loans
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
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
          Request New Loan
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

      {/* Warning banner */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          backgroundColor: "#f0a50011",
          border: "1px solid #f0a50044",
          borderRadius: "10px",
          p: "14px 18px",
          mb: "20px",
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 18, color: "#f0a500", mt: "1px", flexShrink: 0 }} />
        <Box>
          <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#f0a500", mb: "4px" }}>
            Important: Plan Loan Rules
          </Typography>
          <Typography sx={{ fontSize: "12px", color: colors.grey[400], lineHeight: 1.6 }}>
            Plan loans are repaid via payroll deduction with interest (prime + 1%). Loans reduce your invested balance.
            If you leave Acme Corp, the outstanding loan becomes a taxable distribution plus 10% early withdrawal
            penalty if under age 59½.
          </Typography>
        </Box>
      </Box>

      {/* Active Loans */}
      <Box sx={{ ...card, mb: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
            🏦 Active Loans
          </Typography>
          <Chip
            label="1 ACTIVE"
            size="small"
            sx={{
              backgroundColor: "#f0a50011",
              color: "#f0a500",
              border: "1px solid #f0a50033",
              fontSize: "10px",
              fontWeight: 700,
              height: "20px",
            }}
          />
        </Box>

        {activeLoans.map((loan, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: colors.primary[700] + "44",
              border: `1px solid ${colors.primary[300]}33`,
              borderRadius: "10px",
              p: "18px 20px",
            }}
          >
            {/* Loan header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "16px" }}>
              <Box>
                <Typography sx={{ fontSize: "15px", fontWeight: 700, color: colors.grey[100], mb: "4px" }}>
                  {loan.title}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: colors.grey[500], fontFamily: "monospace" }}>
                  {loan.id} · Issued: {loan.issued}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#f0a500" }}>
                  {loan.outstanding}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: colors.grey[500] }}>
                  outstanding balance
                </Typography>
              </Box>
            </Box>

            {/* 4 detail boxes */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", mb: "16px" }}>
              {[
                { label: "Original Amount", value: loan.original, highlight: false },
                { label: "Interest Rate", value: loan.interestRate, highlight: true },
                { label: "Payroll Deduction", value: loan.payrollDeduction, highlight: false },
                { label: "Payoff Date", value: loan.payoffDate, highlight: false },
              ].map((item, j) => (
                <Box
                  key={j}
                  sx={{
                    backgroundColor: colors.blueAccent[900],
                    border: `1px solid ${colors.primary[300]}22`,
                    borderRadius: "8px",
                    p: "12px 14px",
                  }}
                >
                  <Typography sx={{ fontSize: "10px", color: colors.grey[500], mb: "4px", letterSpacing: "0.4px" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: 700, color: item.highlight ? "#f0a500" : colors.grey[100] }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Progress bar */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: "6px" }}>
                <Typography sx={{ fontSize: "11px", color: colors.grey[500] }}>
                  Repaid: ${loan.repaidRaw.toLocaleString()} of ${loan.originalRaw.toLocaleString()}
                </Typography>
                <Typography sx={{ fontSize: "11px", fontWeight: 600, color: colors.grey[400] }}>
                  {Math.round((loan.repaidRaw / loan.originalRaw) * 100)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(loan.repaidRaw / loan.originalRaw) * 100}
                sx={{
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: colors.primary[700],
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #f0a500, #e67e22)",
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Loan Repayment History */}
      <Box sx={{ ...card }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100], mb: "16px" }}>
          🗒️ Loan Repayment History
        </Typography>

        {/* Table header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.4fr 1fr 1fr 1fr 1.2fr",
            pb: "8px",
            borderBottom: `1px solid ${colors.primary[300]}33`,
            mb: "4px",
          }}
        >
          {["DATE", "LOAN ID", "PAYMENT", "PRINCIPAL", "INTEREST", "REMAINING BALANCE"].map((h) => (
            <Typography key={h} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>
              {h}
            </Typography>
          ))}
        </Box>

        {/* Table rows */}
        {repaymentHistory.map((row, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.4fr 1fr 1fr 1fr 1.2fr",
              py: "12px",
              alignItems: "center",
              borderBottom: i < repaymentHistory.length - 1
                ? `1px solid ${colors.primary[300]}22`
                : "none",
              "&:hover": { backgroundColor: colors.primary[700] + "22", borderRadius: "6px" },
            }}
          >
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.date}</Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[400], fontFamily: "monospace" }}>{row.loanId}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.payment}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.principal}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>{row.interest}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.remaining}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PlanLoans;