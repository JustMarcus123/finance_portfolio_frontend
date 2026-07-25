import { Box, Typography, useTheme, Button, Chip, ToggleButtonGroup, ToggleButton, Avatar } from "@mui/material";
import { tokens } from "../../theme";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { FetchLoanRequestApi } from "./API/FetchLoanApi";

// ── static data ───────────────────────────────────────────────────────────────
const summaryCards = [
  { label: "PENDING APPROVAL",   value: "2",       valueColor: null,      accent: "#f0a500" },
  { label: "ACTIVE LOANS",       value: "184",     valueColor: null,      accent: "#4fc3f7" },
  { label: "OUTSTANDING BALANCE",value: "$2.8M",   valueColor: "#ef4444", accent: "#ef4444" },
  { label: "AVG LOAN AMOUNT",    value: "$15,200", valueColor: "#4CCEAC", accent: "#4CCEAC" },
];

const pendingLoans = [
  { initials: "AJ", avatarBg: "#3b82f6", name: "Alex Johnson",  requested: "Mar 3, 2025", amount: "$10,000", term: "60 months", monthly: "$191.73/mo", vested: "$90,600", maxEligible: "$45,300", reason: "General purpose" },
  { initials: "MS", avatarBg: "#8b5cf6", name: "Maria Santos",  requested: "Mar 5, 2025", amount: "$7,500",  term: "48 months", monthly: "$172.54/mo", vested: "$62,400", maxEligible: "$31,200", reason: "Home purchase" },
];

type LoanFilter = "Active" | "Defaulted" | "Paid Off";

const allActiveLoans = [
  { name: "Alex Johnson",  tag: null,          tagColor: null,      id: "LOAN-2024-001", original: "$10,000", balance: "$8,200",  rate: "5.5%", deduction: "$191.73",  payoff: "Jun 2029", status: "ON TRACK", statusColor: "#4CCEAC", statusBg: "#4CCEAC11", statusBorder: "#4CCEAC33" },
  { name: "Tom Chen",      tag: null,          tagColor: null,      id: "LOAN-2023-044", original: "$25,000", balance: "$18,400", rate: "5.5%", deduction: "$478.96",  payoff: "Dec 2028", status: "ON TRACK", statusColor: "#4CCEAC", statusBg: "#4CCEAC11", statusBorder: "#4CCEAC33" },
  { name: "Diana Ross",    tag: "TERMINATED",  tagColor: "#ef4444", id: "LOAN-2024-012", original: "$15,000", balance: "$12,800", rate: "5.5%", deduction: "PAYROLL ENDED", payoff: "Due NOW", status: "AT RISK",  statusColor: "#ef4444", statusBg: "#ef444411", statusBorder: "#ef444433" },
];


//data types declaration
interface LoanRequestType  {
  loanAmount: string,
  loanId:string,
  loanPurpose:string,
  repaymentTerm: string,
  requestedTime: string,
  user: string
}

// ── component ──────────────────────────────────────────────────────────────────
const LoanRequests = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loanFilter, setLoanFilter] = useState<LoanFilter>("Active");

  const card = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" },
  };

  const colsPending = "1.6fr 0.9fr 0.8fr 0.8fr 1fr 1fr 1fr 1fr 1fr";
  const colsActive  = "1.4fr 1.2fr 0.8fr 0.8fr 0.6fr 1fr 0.9fr 0.8fr";



  ///to fetch loan request of every employee under this user's supervise

  const [loanRequest, setLoanRequest] = useState <LoanRequestType []>([]);

  console.log("requested loans",loanRequest)

  useEffect(()=>{

    const FetchLoan = async()=>{
      try {

        const data = await FetchLoanRequestApi();
        //set the loanRequest 
        setLoanRequest(data); 

      } catch (error) {
        console.error("displaying requested loan fails")
      }

    }

    FetchLoan();



  },[])


  return (
    <Box sx={{ p: "24px 28px", overflowY: "auto" }}>
      {/* Header */}
      <Typography sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100], mb: "24px" }}>
        Loan Requests
      </Typography>

      {/* Summary cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", mb: "20px" }}>
        {summaryCards.map((c, i) => (
          <Box key={i} sx={{ ...card, borderTop: `3px solid ${c.accent}` }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", color: colors.grey[500], mb: "10px" }}>
              {c.label}
            </Typography>
            <Typography sx={{ fontSize: "32px", fontWeight: 700, color: c.valueColor || colors.grey[100] }}>
              {c.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Pending Approval */}
      <Box sx={{ ...card, mb: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
            🏛️ Pending Approval
          </Typography>
          <Chip label="2 awaiting" size="small"
            sx={{ backgroundColor: "#f0a50011", color: "#f0a500", border: "1px solid #f0a50033", fontSize: "10px", fontWeight: 700, height: "20px" }} />
        </Box>

        {/* Table header */}
        <Box sx={{ display: "grid", gridTemplateColumns: colsPending, pb: "8px", borderBottom: `1px solid ${colors.primary[300]}33`, mb: "4px" }}>
          {["EMPLOYEE", "REQUESTED", "AMOUNT", "TERM", "MONTHLY PAYMENT", "VESTED BALANCE", "MAX ELIGIBLE", "REASON", "ACTIONS"].map((h) => (
            <Typography key={h} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>{h}</Typography>
          ))}
        </Box>

        {/* Pending rows */}
        {loanRequest.map((row, i) => (
          <Box key={i} sx={{ display: "grid", gridTemplateColumns: colsPending, py: "12px", alignItems: "center",
            borderBottom: i < pendingLoans.length - 1 ? `1px solid ${colors.primary[300]}22` : "none",
            "&:hover": { backgroundColor: colors.primary[700] + "22", borderRadius: "6px" } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* <Avatar sx={{ width: 30, height: 30, backgroundColor: row.avatarBg, fontSize: "11px", fontWeight: 700 }}>
                {row.user}
              </Avatar> */}
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.user}</Typography>
            </Box>
            <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>{row.requestedTime}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: colors.grey[100] }}>{row.loanAmount}</Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[300] }}>{row.repaymentTerm}</Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[300] }}>{row.monthly}</Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[300] }}>{row.vested}</Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[300] }}>{row.maxEligible}</Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>{row.loanPurpose}</Typography>
            <Box sx={{ display: "flex", gap: "6px" }}>
              <Button size="small" startIcon={<CheckIcon sx={{ fontSize: "12px !important" }} />}
                sx={{ fontSize: "11px", fontWeight: 700, color: "#fff", backgroundColor: "#3b82f6", textTransform: "none",
                  px: "8px", py: "3px", minWidth: 0, borderRadius: "6px", "&:hover": { backgroundColor: "#2563eb" } }}>
                Approve
              </Button>
              <Button size="small" startIcon={<CloseIcon sx={{ fontSize: "12px !important" }} />}
                sx={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", border: "1px solid #ef444444", textTransform: "none",
                  px: "8px", py: "3px", minWidth: 0, borderRadius: "6px", "&:hover": { backgroundColor: "#ef444411" } }}>
                Deny
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* All Active Loans */}
      <Box sx={{ ...card }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: colors.grey[100] }}>
            🗒️ All Active Loans
          </Typography>
          <ToggleButtonGroup value={loanFilter} exclusive
            onChange={(_, v) => v && setLoanFilter(v as LoanFilter)} size="small"
            sx={{ "& .MuiToggleButton-root": { fontSize: "11px", fontWeight: 600, color: colors.grey[400],
                border: `1px solid ${colors.primary[300]}44`, px: "12px", py: "3px", textTransform: "none",
                "&.Mui-selected": { backgroundColor: colors.blueAccent[700], color: colors.grey[100], borderColor: colors.blueAccent[500] },
                "&:hover": { backgroundColor: colors.primary[700] + "55" } } }}>
            {(["Active", "Defaulted", "Paid Off"] as LoanFilter[]).map((f) => (
              <ToggleButton key={f} value={f}>{f}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Table header */}
        <Box sx={{ display: "grid", gridTemplateColumns: colsActive, pb: "8px", borderBottom: `1px solid ${colors.primary[300]}33`, mb: "4px" }}>
          {["EMPLOYEE", "LOAN ID", "ORIGINAL", "BALANCE", "RATE", "MONTHLY DEDUCTION", "PAYOFF DATE", "STATUS"].map((h) => (
            <Typography key={h} sx={{ fontSize: "10px", fontWeight: 600, color: colors.grey[500], letterSpacing: "0.6px" }}>{h}</Typography>
          ))}
        </Box>

        {/* Active loan rows */}
        {allActiveLoans.map((row, i) => (
          <Box key={i} sx={{ display: "grid", gridTemplateColumns: colsActive, py: "12px", alignItems: "center",
            borderBottom: i < allActiveLoans.length - 1 ? `1px solid ${colors.primary[300]}22` : "none",
            backgroundColor: row.tag ? "#ef444408" : "transparent", borderRadius: row.tag ? "6px" : 0,
            "&:hover": { backgroundColor: row.tag ? "#ef44440f" : colors.primary[700] + "22", borderRadius: "6px" } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.name}</Typography>
              {row.tag && (
                <Chip label={row.tag} size="small"
                  sx={{ backgroundColor: row.tagColor + "18", color: row.tagColor, border: `1px solid ${row.tagColor}44`,
                    fontSize: "9px", fontWeight: 700, height: "18px", fontFamily: "monospace" }} />
              )}
            </Box>
            <Typography sx={{ fontSize: "11px", color: colors.grey[400], fontFamily: "monospace" }}>{row.id}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.original}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: colors.grey[100] }}>{row.balance}</Typography>
            <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>{row.rate}</Typography>
            <Typography sx={{ fontSize: row.deduction === "PAYROLL ENDED" ? "11px" : "13px",
              color: row.deduction === "PAYROLL ENDED" ? "#ef4444" : colors.grey[300],
              fontWeight: row.deduction === "PAYROLL ENDED" ? 700 : 400, fontFamily: "monospace" }}>
              {row.deduction}
            </Typography>
            <Typography sx={{ fontSize: "13px", color: row.payoff === "Due NOW" ? "#ef4444" : colors.grey[300],
              fontWeight: row.payoff === "Due NOW" ? 700 : 400 }}>
              {row.payoff}
            </Typography>
            <Chip label={row.status} size="small"
              sx={{ backgroundColor: row.statusBg, color: row.statusColor, border: `1px solid ${row.statusBorder}`,
                fontSize: "10px", fontWeight: 700, height: "20px", width: "fit-content", fontFamily: "monospace" }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoanRequests;