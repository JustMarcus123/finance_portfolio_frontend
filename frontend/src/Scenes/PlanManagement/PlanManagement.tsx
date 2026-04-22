import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  Alert,
  CircularProgress,
  Stack,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { PlanTypeApi } from "../../Components/Apis/PlanManagementApi";
import {
  activateSponsorApi,
  createSponsorApi,
  fetchAllSponsor,
  updateSponsorApi,
} from "../../Components/Apis/SponsorApi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from '@mui/icons-material/Edit';

interface FormType {
  company_name: string;
  ein: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primary_contact_phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  plan_type: string;
  match_formula: string;
  vesting_schedule: string;
  safe_harbour_plan: string;
  plan_start_date: string;
}

interface SponsorType {
  id:string;
  company_name: string;
  ein: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primary_contact_phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  plan_type: string;
  match_formula: string;
  vesting_schedule: string;
  safe_harbour_plan: string;
  plan_start_date: string;
  participants?: number;
  aua?: number;
  sponsorStatus?: string;
  compliance: string;
}

const PlanManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // ─── Stat cards ───────────────────────────────────────────────────────────
  const statCards = [
    {
      label: "NET WORTH",
      value: "$284,520",
      change: "+$12,340",
      sub: "vs. last month",
      positive: true,
      accent: "#4CCEAC",
      icon: (
        <AccountBalanceWalletIcon sx={{ fontSize: 20, color: "#4CCEAC" }} />
      ),
    },
    {
      label: "TOTAL ASSETS",
      value: "$318,900",
      change: "+4.2%",
      sub: "across 6 accounts",
      positive: true,
      accent: "#4CCEAC",
      icon: <TrendingUpIcon sx={{ fontSize: 20, color: "#4CCEAC" }} />,
    },
    {
      label: "MONTHLY SAVINGS",
      value: "$2,840",
      change: "28.4% rate",
      sub: "of income saved",
      positive: true,
      accent: "#f0a500",
      icon: <BusinessIcon sx={{ fontSize: 20, color: "#f0a500" }} />,
    },
    {
      label: "TOTAL LIABILITIES",
      value: "$34,380",
      change: "-$420",
      sub: "debt reducing ✓",
      positive: false,
      accent: "#e74c3c",
      icon: <TrendingDownIcon sx={{ fontSize: 20, color: "#e74c3c" }} />,
    },
  ];

  // ─── Plan type form ────────────────────────────────────────────────────────
  const [isOpenPlanForm, setIsOpenPlanForm] = useState(false);
  const [planType, setPlanType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSavePlanType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planType.trim()) {
      setError("Plan type name cannot be empty");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      await PlanTypeApi(planType.trim());
      setSuccess("Plan type added successfully!");
      setPlanType("");
      setTimeout(() => {
        setIsOpenPlanForm(false);
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to add new plan type");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpenPlanForm(false);
    setPlanType("");
    setError("");
    setSuccess("");
  };

  // ─── Sponsor onboarding ────────────────────────────────────────────────────
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState(false);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);
  const [isOnboadSuccess, setIsOnboardSuccess] = useState("");
  const [isOnboadError, setIsOnboardError] = useState("");

  const [onboardFormData, setOnboardFormData] = useState<FormType>({
    company_name: "",
    ein: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primary_contact_phone: "",
    addressLine1: "",
    city: "",
    state: "",
    zipcode: "",
    country: "United States",
    plan_type: "",
    match_formula: "",
    vesting_schedule: "",
    safe_harbour_plan: "",
    plan_start_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOnboardFormData((prev) => ({ ...prev, [name]: value }));
  };

  const CreateSponsorButton = async () => {
    setIsOnboardingLoading(true);
    setIsOnboardSuccess("");
    setIsOnboardError("");
    try {
      await createSponsorApi(
        onboardFormData.company_name,
        onboardFormData.ein,
        onboardFormData.primaryContactName,
        onboardFormData.primaryContactEmail,
        onboardFormData.primary_contact_phone,
        onboardFormData.addressLine1,
        onboardFormData.city,
        onboardFormData.state,
        onboardFormData.zipcode,
        onboardFormData.country,
        onboardFormData.plan_type,
        onboardFormData.match_formula,
        onboardFormData.vesting_schedule,
        onboardFormData.safe_harbour_plan,
        onboardFormData.plan_start_date,
      );
      setIsOnboardSuccess("Onboarding completed successfully");
      setTimeout(() => {
        setIsOnboardingLoading(false);
        setIsOnboardSuccess("");
        setOnboardFormData({
          company_name: "",
          ein: "",
          primaryContactName: "",
          primaryContactEmail: "",
          primary_contact_phone: "",
          addressLine1: "",
          city: "",
          state: "",
          zipcode: "",
          country: "United States",
          plan_type: "",
          match_formula: "",
          vesting_schedule: "",
          safe_harbour_plan: "",
          plan_start_date: "",
        });
      });
    } catch (error: any) {
      setIsOnboardError(error.message || "Onboarding failed");
    } finally {
      setIsOnboardingDialogOpen(false);
    }
  };

  // ─── Fetch sponsors ────────────────────────────────────────────────────────
  const [sponsor, setSponsor] = useState<SponsorType[]>([]);
  const [sponsorLoading, setSponsorLoading] = useState(false);

  useEffect(() => {
    const fetchingSponsor = async () => {
      setSponsorLoading(true);
      try {
        const data = await fetchAllSponsor();
        setSponsor(data);
      } catch (err: any) {
        console.error(err.message || "fetching error");
      } finally {
        setSponsorLoading(false);
      }
    };
    fetchingSponsor();
  }, []);

  // ─── View sponsor dialog ───────────────────────────────────────────────────
  const [viewSponsor, setViewSponsor] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorType | null>(null);

  //--- edit sponsor dialog
  const [editSponsorDialog, setEditSponsorDialog] = useState(false);
  const [copyEditSponsor, setCopyEditSponsor] = useState<any>({})
  const [isUpdating, setIsUpdating] = useState(false)

  console.log(copyEditSponsor);

  const handleOpenEdit = (sponsor: any) => {
    if (!sponsor?.id) {
        alert("Error: Sponsor ID is missing!");
        return;
    }

    setCopyEditSponsor({ ...sponsor });        // Make a full copy including id
    setEditSponsorDialog(true);
};

  const handleEditSponsorChange =(e:React.ChangeEvent<HTMLInputElement>)=>{

    const {name, value} = e.target;

    setCopyEditSponsor((prev:any)=>({

      ...prev,
      [name]: value

    }));

  }

  const handleUpdateSponsor =async()=>{

    setIsUpdating(true)

    try {
      
       await updateSponsorApi(copyEditSponsor.id, copyEditSponsor)

      alert("Sponsor updated successfully!");

      // Refresh the list
        const refreshedList = await fetchAllSponsor();
        setSponsor(refreshedList);

    } catch (error:any) {
      alert(error.message || "Failed to update sponsor");
    }finally{
      setIsUpdating(false);
    }

  }


  //activate section
  const [activating, setActivating] = useState(false);

const handleActivate = async () => {
  if (!selectedSponsor) return;
  setActivating(true);
  try {
    await activateSponsorApi(selectedSponsor.id);
    // refresh the sponsor list
    const data = await fetchAllSponsor();
    setSponsor(data);
    setViewSponsor(false);
  } catch (err: any) {
    console.error(err.message || "Activation failed");
  } finally {
    setActivating(false);
  }
};

  // ─── Shared styles ─────────────────────────────────────────────────────────
  const cardSx = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "16px",
    border: `1px solid ${colors.primary[300]}33`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
    },
  };

  const dialogFieldSx = {
    "& .MuiOutlinedInput-root": {
      color: colors.grey[700],
      borderRadius: "10px",
      "& fieldset": { borderColor: `${colors.primary[300]}55` },
      "&:hover fieldset": { borderColor: colors.blueAccent[500] },
      "&.Mui-focused fieldset": { borderColor: colors.blueAccent[400] },
    },
    "& .MuiInputLabel-root": { color: colors.grey[200] },
    "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[400] },
  };

  const actionBtnSx = {
    color: colors.grey[100],
    bgcolor: colors.blueAccent[500],
    px: 3,
    py: 1.2,
    fontWeight: 600,
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "13px",
    letterSpacing: "0.3px",
    boxShadow: "none",
    "&:hover": {
      bgcolor: colors.blueAccent[400],
      boxShadow: `0 4px 14px ${colors.blueAccent[500]}55`,
    },
  };

  const TABLE_COLS = "2fr 1.5fr 1fr 1.5fr 1fr 1.5fr 1.2fr 1.2fr 80px";

  return (
    <div>
      <Box
        sx={{
          p: "28px 32px",
          background: colors.blueAccent[900],
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {/* ── Page header ─────────────────────────────────────────────────── */}
        <Box
          sx={{
            mb: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 700,
                color: colors.grey[100],
                letterSpacing: "-0.3px",
              }}
            >
              Plan Management
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: colors.grey[500], mt: "2px" }}
            >
              Oversee sponsors, plan types, and administration
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button
              onClick={() => setIsOpenPlanForm(true)}
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              sx={actionBtnSx}
            >
              Add Plan Type
            </Button>
            <Button
              onClick={() => setIsOnboardingDialogOpen(true)}
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              sx={{
                ...actionBtnSx,
                bgcolor: `${colors.blueAccent[500]}22`,
                color: colors.blueAccent[400],
                border: `1px solid ${colors.blueAccent[500]}44`,
                "&:hover": {
                  bgcolor: `${colors.blueAccent[500]}33`,
                  boxShadow: "none",
                },
              }}
            >
              Onboard Sponsor
            </Button>
          </Box>
        </Box>

        {/* ── Stat cards ──────────────────────────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            mb: "24px",
          }}
        >
          {statCards.map((card, i) => (
            <Box
              key={i}
              sx={{
                ...cardSx,
                borderTop: `3px solid ${card.accent}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* subtle background accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: `${card.accent}0D`,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: "12px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: colors.grey[500],
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {card.label}
                </Typography>
                <Box
                  sx={{
                    p: "6px",
                    borderRadius: "8px",
                    bgcolor: `${card.accent}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: colors.grey[100],
                  lineHeight: 1.1,
                  mb: "10px",
                  letterSpacing: "-0.5px",
                }}
              >
                {card.value}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {card.positive ? (
                  <TrendingUpIcon sx={{ fontSize: 13, color: "#4CCEAC" }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 13, color: "#e74c3c" }} />
                )}
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: card.positive ? "#4CCEAC" : "#e74c3c",
                  }}
                >
                  {card.change}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: colors.grey[600] }}>
                  · {card.sub}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── Plans under administration table ────────────────────────────── */}
        <Box sx={{ ...cardSx, p: "24px 28px" }}>
          {/* Table header bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "9px",
                  bgcolor: `${colors.blueAccent[500]}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GroupsIcon
                  sx={{ fontSize: 18, color: colors.blueAccent[400] }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: colors.grey[100],
                    letterSpacing: "0.3px",
                  }}
                >
                  Plans Under Administration
                </Typography>
                <Typography sx={{ fontSize: "11px", color: colors.grey[500] }}>
                  {sponsor.length} plan{sponsor.length !== 1 ? "s" : ""} total
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                px: "14px",
                py: "6px",
                borderRadius: "8px",
                border: `1px solid ${colors.primary[300]}44`,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": { backgroundColor: `${colors.primary[300]}22` },
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: colors.grey[400],
                  fontWeight: 500,
                }}
              >
                View all →
              </Typography>
            </Box>
          </Box>

          {/* Column headers */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: TABLE_COLS,
              pb: "10px",
              mb: "4px",
              borderBottom: `1px solid ${colors.primary[300]}44`,
            }}
          >
            {/*table heading */}
            {[
              "Plan Sponsor",
              "Plan Type",
              "Participants",
              "AUA",
              "Status",
              "Match Formula",
              "Vesting",
              "Compliance",
              "Action",
            ].map((heading) => (
              <Typography
                key={heading}
                sx={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: colors.grey[600],
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                {heading}
              </Typography>
            ))}
          </Box>

          {/* Rows */}
          {sponsorLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                py: "24px",
              }}
            >
              <CircularProgress
                size={16}
                sx={{ color: colors.blueAccent[400] }}
              />
              <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>
                Loading sponsors…
              </Typography>
            </Box>
          ) : sponsor.length === 0 ? (
            <Box sx={{ py: "32px", textAlign: "center" }}>
              <Typography sx={{ fontSize: "13px", color: colors.grey[500] }}>
                No sponsors found.
              </Typography>
            </Box>
          ) : (
            sponsor.map((mappped_sponsor, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns: TABLE_COLS,
                  alignItems: "center",
                  py: "13px",
                  borderBottom:
                    i < sponsor.length - 1
                      ? `1px solid ${colors.primary[300]}22`
                      : "none",
                  borderRadius: "8px",
                  px: "4px",
                  mx: "-4px",
                  "&:hover": { backgroundColor: `${colors.primary[300]}18` },
                  transition: "background-color 0.15s",
                }}
              >
                {/* Company */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "7px",
                      bgcolor: `${colors.blueAccent[500]}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: colors.blueAccent[400],
                      }}
                    >
                      {mappped_sponsor.company_name?.charAt(0).toUpperCase() ?? "?"}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.grey[200],
                    }}
                  >
                    {mappped_sponsor.company_name}
                  </Typography>
                </Box>

                {/* Plan type chip */}
                <Box>
                  <Chip
                    label={mappped_sponsor.plan_type}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      height: "22px",
                      bgcolor: `${colors.blueAccent[500]}18`,
                      color: colors.blueAccent[400],
                      border: `1px solid ${colors.blueAccent[500]}33`,
                      borderRadius: "6px",
                    }}
                  />
                </Box>

                {/* Participants */}
                <Typography sx={{ fontSize: "13px", color: colors.grey[900] }}>
                  {mappped_sponsor.participants?.toLocaleString() ?? "—"}
                </Typography>

                {/* AUA */}
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: colors.grey[200],
                  }}
                >
                  {mappped_sponsor.aua ? `$${mappped_sponsor.aua.toLocaleString()}` : "—"}
                </Typography>

                {/* Status */}
                <Box>
                  <Chip
                    label={mappped_sponsor.sponsorStatus ?? "Unknown"}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      height: "22px",
                      bgcolor:
                        mappped_sponsor.sponsorStatus === "Active"
                          ? "#4CCEAC18"
                          : "#e74c3c18",
                      color:
                        mappped_sponsor.sponsorStatus === "Active" ? "#4CCEAC" : "#ff6b6b",
                      border: `1px solid ${mappped_sponsor.sponsorStatus === "Active" ? "#4CCEAC33" : "#e74c3c33"}`,
                      borderRadius: "6px",
                    }}
                  />
                </Box>

                {/* Match formula */}
                <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                  {mappped_sponsor.match_formula ?? "—"}
                </Typography>

                {/* Vesting */}
                <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                  {mappped_sponsor.vesting_schedule ?? "—"}
                </Typography>

                {/* Compliance */}
                <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                  {mappped_sponsor.compliance ?? "—"}
                </Typography>

                {/* Action */}

               <Box sx={{ display: "flex", gap: "8px" ,justifyContent:"center"}}>
  {/* View Button */}
  <Button
    // startIcon={<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}1
    onClick={() => {
      setSelectedSponsor(mappped_sponsor);   // Fixed typo: mappped_sponsor → mapped_sponsor
      setViewSponsor(true);
    }}
    sx={{
      fontSize: "11px",
      fontWeight: 600,
      color: colors.blueAccent[400],
      textTransform: "none",
      px: 2,
      py: 0.6,
      minWidth: 0,
      borderRadius: "7px",
      bgcolor: `${colors.blueAccent[500]}14`,
      border: `1px solid ${colors.blueAccent[500]}22`,
      "&:hover": { 
        bgcolor: `${colors.blueAccent[500]}28`,
        borderColor: colors.blueAccent[500]
      },
      gap: "5px",
    }}
  >
    <VisibilityOutlinedIcon sx={{ fontSize: 14 }}/>
  </Button>

  {/* Optional: Add Edit Button (Recommended) */}
  <Button
    // startIcon={<EditIcon sx={{ fontSize: 14 }} />}
    onClick={() => {
    console.log("Full sponsor object:", mappped_sponsor);   // ← Add this
    console.log("Sponsor ID:", mappped_sponsor?.id);         // ← Add this
    handleOpenEdit(mappped_sponsor);
}}
    sx={{
      fontSize: "11px",
      fontWeight: 600,
      color: colors.grey[400],
      textTransform: "none",
      px: 2,
      py: 0.6,
      minWidth: 0,
      borderRadius: "7px",
      bgcolor: `${colors.primary[700]}80`,
      border: `1px solid ${colors.primary[600]}`,
      "&:hover": { 
        bgcolor: `${colors.primary[600]}90`,
        color: colors.grey[100]
      },
      gap: "5px",
    }}
  >
    <EditIcon sx={{ fontSize: 14 }}/>
  </Button>
</Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* ── Add Plan Type dialog ─────────────────────────────────────────────── */}
      <Dialog
        open={isOpenPlanForm}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: colors.primary[400],
            border: `1px solid ${colors.primary[300]}44`,
            color: colors.grey[100],
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: colors.grey[100],
            fontWeight: 700,
            fontSize: "18px",
            pb: 0.5,
          }}
        >
          Add New Plan Type
          <Typography
            sx={{
              fontSize: "12px",
              color: colors.grey[500],
              mt: 0.5,
              fontWeight: 400,
            }}
          >
            Define a new plan category for administration.
          </Typography>
        </DialogTitle>

        <form onSubmit={handleSavePlanType}>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="Plan Type Name"
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              disabled={isLoading}
              error={!!error}
              helperText={error}
              sx={dialogFieldSx}
            />
            {success && (
              <Alert severity="success" sx={{ mt: 2, borderRadius: "10px" }}>
                {success}
              </Alert>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={handleClose}
              disabled={isLoading}
              sx={{
                color: colors.grey[400],
                textTransform: "none",
                borderRadius: "9px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !planType.trim()}
              startIcon={isLoading ? <CircularProgress size={16} /> : null}
              sx={{ ...actionBtnSx, px: 3 }}
            >
              {isLoading ? "Saving…" : "Save Plan Type"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ── Onboard Sponsor dialog ───────────────────────────────────────────── */}
      <Dialog
        open={isOnboardingDialogOpen}
        onClose={() => setIsOnboardingDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: colors.primary[400],
            border: `1px solid ${colors.primary[300]}44`,
            color: colors.grey[100],
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography
            sx={{ fontSize: "18px", fontWeight: 700, color: colors.grey[100] }}
          >
            Onboard New Sponsor
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: colors.grey[200], mt: 0.5 }}
          >
            Capture core employer plan details before moving to enrollment
            setup.
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {/* Section: Plan Info */}
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              color: colors.grey[200],
              letterSpacing: "0.9px",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Plan Information
          </Typography>
          <Stack spacing={2} sx={{ mb: 2.5 }}>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="Company Name"
                name="company_name"
                value={onboardFormData.company_name}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
              <TextField
                label="EIN"
                name="ein"
                value={onboardFormData.ein}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="Plan Type"
                name="plan_type"
                value={onboardFormData.plan_type}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
              <TextField
                label="Plan Start Date"
                name="plan_start_date"
                value={onboardFormData.plan_start_date}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="Match Formula"
                name="match_formula"
                value={onboardFormData.match_formula}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
              <TextField
                label="Vesting Schedule"
                name="vesting_schedule"
                value={onboardFormData.vesting_schedule}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
            </Box>
            <TextField
              label="Safe Harbour Plan"
              name="safe_harbour_plan"
              value={onboardFormData.safe_harbour_plan}
              onChange={handleChange}
              fullWidth
              sx={dialogFieldSx}
            />
          </Stack>

          {/* Section: Contact */}
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              color: colors.grey[200],
              letterSpacing: "0.9px",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Primary Contact
          </Typography>
          <Stack spacing={2} sx={{ mb: 2.5 }}>
            <TextField
              label="Contact Name"
              name="primaryContactName"
              value={onboardFormData.primaryContactName}
              onChange={handleChange}
              fullWidth
              sx={dialogFieldSx}
            />
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="Contact Email"
                name="primaryContactEmail"
                value={onboardFormData.primaryContactEmail}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
              <TextField
                label="Contact Phone"
                name="primary_contact_phone"
                value={onboardFormData.primary_contact_phone}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
            </Box>
          </Stack>

          {/* Section: Address */}
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              color: colors.grey[200],
              letterSpacing: "0.9px",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Address
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={onboardFormData.addressLine1}
              onChange={handleChange}
              fullWidth
              sx={dialogFieldSx}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="City"
                name="city"
                value={onboardFormData.city}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
              <TextField
                label="State"
                name="state"
                value={onboardFormData.state}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
              <TextField
                label="Zipcode"
                name="zipcode"
                value={onboardFormData.zipcode}
                onChange={handleChange}
                fullWidth
                sx={dialogFieldSx}
              />
            </Box>
            <TextField
              label="Country"
              name="country"
              value={onboardFormData.country}
              onChange={handleChange}
              fullWidth
              sx={dialogFieldSx}
            />
          </Stack>

          {isOnboadSuccess && (
            <Alert severity="success" sx={{ mt: 2, borderRadius: "10px" }}>
              {isOnboadSuccess}
            </Alert>
          )}
          {isOnboadError && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: "10px" }}>
              {isOnboadError}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setIsOnboardingDialogOpen(false)}
            sx={{
              color: colors.grey[400],
              textTransform: "none",
              borderRadius: "9px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={CreateSponsorButton}
            startIcon={
              isOnboardingLoading ? <CircularProgress size={16} /> : null
            }
            sx={actionBtnSx}
          >
            {isOnboardingLoading ? "Creating…" : "Create Sponsor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── View Sponsor dialog ──────────────────────────────────────────────── */}
      <Dialog
        open={viewSponsor}
        onClose={() => setViewSponsor(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: colors.primary[400],
            border: `1px solid ${colors.primary[300]}44`,
            color: colors.grey[100],
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          },
        }}
      >
        {selectedSponsor && (
          <Box sx={{ p: 3 }}>
            {/* Avatar + company */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                mb: "20px",
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "12px",
                  bgcolor: `${colors.blueAccent[500]}22`,
                  border: `1px solid ${colors.blueAccent[500]}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.blueAccent[400],
                  }}
                >
                  {selectedSponsor.company_name?.charAt(0).toUpperCase()}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: colors.grey[100],
                  }}
                >
                  {selectedSponsor.company_name}
                </Typography>
                <Box sx={{ display: "flex", gap: "6px", mt: "4px" }}>
                  <Chip
                    label={selectedSponsor.plan_type}
                    size="small"
                    sx={{
                      fontSize: "10px",
                      height: "20px",
                      fontWeight: 600,
                      bgcolor: `${colors.blueAccent[500]}18`,
                      color: colors.blueAccent[400],
                      border: `1px solid ${colors.blueAccent[500]}33`,
                      borderRadius: "5px",
                    }}
                  />
                  <Chip
                    label={selectedSponsor.sponsorStatus ?? "Unknown"}
                    size="small"
                    sx={{
                      fontSize: "10px",
                      height: "20px",
                      fontWeight: 600,
                      borderRadius: "5px",
                      bgcolor:
                        selectedSponsor.sponsorStatus === "Active"
                          ? "#4CCEAC18"
                          : "#e74c3c18",
                      color:
                        selectedSponsor.sponsorStatus === "Active"
                          ? "#4CCEAC"
                          : "#ff6b6b",
                      border: `1px solid ${selectedSponsor.sponsorStatus === "Active" ? "#4CCEAC33" : "#e74c3c33"}`,
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Section helper */}
            {(
              [
                {
                  heading: "Plan Details",
                  rows: [
                    ["EIN", selectedSponsor.ein],
                    [
                      "Participants",
                      selectedSponsor.participants?.toLocaleString() ?? "—",
                    ],
                    [
                      "AUA",
                      selectedSponsor.aua
                        ? `$${selectedSponsor.aua.toLocaleString()}`
                        : "—",
                    ],
                    ["Match Formula", selectedSponsor.match_formula ?? "—"],
                    [
                      "Vesting Schedule",
                      selectedSponsor.vesting_schedule ?? "—",
                    ],
                    ["Compliance", selectedSponsor.compliance ?? "—"],
                  ],
                },
                {
                  heading: "Contact",
                  rows: [
                    ["Name", selectedSponsor.primaryContactName],
                    ["Email", selectedSponsor.primaryContactEmail],
                    ["Phone", selectedSponsor.primary_contact_phone],
                  ],
                },
                {
                  heading: "Address",
                  rows: [
                    [
                      "Address",
                      `${selectedSponsor.addressLine1}, ${selectedSponsor.city}, ${selectedSponsor.state} ${selectedSponsor.zipcode}, ${selectedSponsor.country}`,
                    ],
                  ],
                },
              ] as { heading: string; rows: [string, string][] }[]
            ).map((section, si) => (
              <Box key={si} sx={{ mb: si < 2 ? "18px" : 0 }}>
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: colors.grey[800],
                    letterSpacing: "0.9px",
                    textTransform: "uppercase",
                    mb: "10px",
                  }}
                >
                  {section.heading}
                </Typography>
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: `1px solid ${colors.primary[300]}33`,
                    overflow: "hidden",
                  }}
                >
                  {section.rows.map(([label, value], ri) => (
                    <Box
                      key={ri}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: "14px",
                        py: "10px",
                        borderBottom:
                          ri < section.rows.length - 1
                            ? `1px solid ${colors.primary[300]}22`
                            : "none",
                        "&:nth-of-type(even)": {
                          bgcolor: `${colors.primary[300]}0A`,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: colors.grey[100],
                          fontWeight: 500,
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: colors.grey[100],
                          fontWeight: 500,
                          textAlign: "right",
                          maxWidth: "65%",
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}

            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "20px", gap:"5px" }}
            >
              <Button
                onClick={() => setViewSponsor(false)}
                sx={{ ...actionBtnSx, px: 3 }}
              >
                Close
              </Button>

               <Button
  onClick={handleActivate}
  disabled={activating || selectedSponsor?.sponsorStatus === "ACTIVE"}
  sx={{
    ...actionBtnSx,
    px: 3,
    bgcolor: selectedSponsor?.sponsorStatus === "ACTIVE" 
      ? "transparent" 
      : "#4CCEAC18",
    color: selectedSponsor?.sponsorStatus === "ACTIVE" 
      ? colors.grey[500] 
      : "#4CCEAC",
    border: `1px solid ${selectedSponsor?.sponsorStatus === "ACTIVE" 
      ? colors.grey[700] 
      : "#4CCEAC33"}`,
    "&:hover": {
      bgcolor: selectedSponsor?.sponsorStatus === "ACTIVE" 
        ? "transparent" 
        : "#4CCEAC28",
    },
  }}
>
  {activating ? "Activating..." : selectedSponsor?.sponsorStatus === "ACTIVE" ? "Activated" : "Activate"}
</Button>
            </Box>
          </Box>
        )}
      </Dialog>

{/* ── Edit Sponsor Dialog ──────────────────────────────────────────────── */}
<Dialog
  open={editSponsorDialog}
  onClose={() => setEditSponsorDialog(false)}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: "16px",
      backgroundColor: colors.primary[400],
      border: `1px solid ${colors.primary[300]}44`,
      color: colors.grey[100],
      boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
    },
  }}
>
  {copyEditSponsor && (
    <Box sx={{ p: 3 }}>
      {/* Header - Same style as View Dialog */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "14px", mb: "24px" }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "12px",
            bgcolor: `${colors.blueAccent[500]}22`,
            border: `1px solid ${colors.blueAccent[500]}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: 700, color: colors.blueAccent[400] }}>
            {copyEditSponsor.company_name?.charAt(0).toUpperCase()}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "17px", fontWeight: 700, color: colors.grey[100] }}>
            Edit Sponsor
          </Typography>
          <Typography sx={{ fontSize: "13px", color: colors.grey[400] }}>
            {copyEditSponsor.company_name}
          </Typography>
        </Box>
      </Box>

      <form>
        <Stack spacing={2.5}>
          {/* Company & Plan Section */}
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: colors.grey[400], letterSpacing: "0.8px", textTransform: "uppercase", mb: 1 }}>
            COMPANY & PLAN DETAILS
          </Typography>

          <TextField
            fullWidth
            label="Company Name"
            name="company_name"
            value={copyEditSponsor.company_name || ""}
            onChange={handleEditSponsorChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                // backgroundColor: colors.primary[500],
                color: colors.grey[100],
              },
            }}
          />

          <TextField
            fullWidth
            label="EIN"
            name="ein"
            value={copyEditSponsor.ein || ""}
            onChange={handleEditSponsorChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                // backgroundColor: colors.primary[500],
                color: colors.grey[100],
              },
            }}
          />

          <TextField
            fullWidth
            label="Plan Type"
            name="plan_type"
            value={copyEditSponsor.plan_type || ""}
            onChange={handleEditSponsorChange}
          />

          <TextField
            fullWidth
            label="Match Formula"
            name="match_formula"
            value={copyEditSponsor.match_formula || ""}
            onChange={handleEditSponsorChange}
          />

          <TextField
            fullWidth
            label="Vesting Schedule"
            name="vesting_schedule"
            value={copyEditSponsor.vesting_schedule || ""}
            onChange={handleEditSponsorChange}
          />

          {/* Safe Harbour Plan - Radio Buttons */}
          <FormControl fullWidth>
            <FormLabel sx={{ color: colors.grey[400], fontSize: "12px", mb: 1 }}>
              Safe Harbour Plan
            </FormLabel>
            <RadioGroup
              row
              name="safe_harbour_plan"
              value={copyEditSponsor.safe_harbour_plan || "NO"}
              onChange={handleEditSponsorChange}
            >
              <FormControlLabel value="YES" control={<Radio />} label="Yes" />
              <FormControlLabel value="NO" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="Plan Start Date"
            name="plan_start_date"
            value={copyEditSponsor.plan_start_date || ""}
            onChange={handleEditSponsorChange}
            placeholder="YYYY-MM-DD"
          />

          {/* Contact Section */}
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: colors.grey[400], letterSpacing: "0.8px", textTransform: "uppercase", mt: 2, mb: 1 }}>
            PRIMARY CONTACT
          </Typography>

          <TextField
            fullWidth
            label="Contact Name"
            name="primaryContactName"
            value={copyEditSponsor.primaryContactName || ""}
            onChange={handleEditSponsorChange}
          />

          <TextField
            fullWidth
            label="Contact Email"
            name="primaryContactEmail"
            value={copyEditSponsor.primaryContactEmail || ""}
            onChange={handleEditSponsorChange}
          />

          <TextField
            fullWidth
            label="Contact Phone"
            name="primary_contact_phone"
            value={copyEditSponsor.primary_contact_phone || ""}
            onChange={handleEditSponsorChange}
          />

          {/* Address Section */}
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: colors.grey[400], letterSpacing: "0.8px", textTransform: "uppercase", mt: 2, mb: 1 }}>
            ADDRESS
          </Typography>

          <TextField
            fullWidth
            label="Address Line 1"
            name="addressLine1"
            value={copyEditSponsor.addressLine1 || ""}
            onChange={handleEditSponsorChange}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={copyEditSponsor.city || ""}
              onChange={handleEditSponsorChange}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={copyEditSponsor.state || ""}
              onChange={handleEditSponsorChange}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              fullWidth
              label="Zipcode"
              name="zipcode"
              value={copyEditSponsor.zipcode || ""}
              onChange={handleEditSponsorChange}
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={copyEditSponsor.country || ""}
              onChange={handleEditSponsorChange}
            />
          </Box>
        </Stack>
      </form>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "28px", gap: "10px" }}>
        <Button
          onClick={() => setEditSponsorDialog(false)}
          sx={{
            color: colors.grey[400],
            fontWeight: 600,
            px: 4,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdateSponsor}   
          sx={{
            bgcolor: colors.blueAccent[500],
            color: "#fff",
            fontWeight: 600,
            px: 4,
            "&:hover": { bgcolor: colors.blueAccent[600] },
          }}
        >
         {isUpdating? "Updating..." : "Save Changes"} 
        </Button>
      </Box>
    </Box>
  )}
</Dialog>




    </div>
  );
};

export default PlanManagement;
