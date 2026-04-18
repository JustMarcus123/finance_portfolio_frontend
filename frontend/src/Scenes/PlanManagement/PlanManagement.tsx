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
} from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { PlanTypeApi } from "../../Components/Apis/PlanManagementApi";
import { createSponsorApi } from "../../Components/Apis/SponsorApi";

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

const PlanManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      setPlanType(""); // clear input

      // Optional: close dialog after short delay
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

  // state for handling onboarding new sponsor
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

    setOnboardFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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



  const [count, setCount]= useState(0);

const HandleCount =()=>{

  setCount(count +1 );

}


  return (
    <div>
      <Box
        sx={{
          p: "24px 28px",
          background: colors.blueAccent[900],
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            mb: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: colors.grey[100],
            }}
          >
            Plan Management
          </Typography>

          <Button
            onClick={() => setIsOpenPlanForm(true)}
            startIcon={<AddIcon />}
            sx={{
              color: colors.grey[100],
              bgcolor: colors.blueAccent[500],
              px: 3,
              py: 1.2,
              fontWeight: 600,
              "&:hover": {
                bgcolor: colors.blueAccent[400],
              },
            }}
          >
            Add Plan Type
          </Button>

          {/* dialog for sponsor button */}
          <Button
            onClick={() => setIsOnboardingDialogOpen(true)}
            startIcon={<AddIcon />}
            sx={{
              color: colors.grey[100],
              bgcolor: colors.blueAccent[500],
              px: 3,
              py: 1.2,
              fontWeight: 600,
              "&:hover": {
                bgcolor: colors.blueAccent[400],
              },
            }}
          >
         Onboard Sponsor
          </Button>
        </Box>

        {/* You can add your plan list table here later */}
        <Typography color={colors.grey[100]}>
          Plan management content goes here...
        </Typography>

        <br /><br />


<Button onClick={HandleCount}>CLick to count</Button>
<p>{count} naosen</p>

      </Box>

      {/* Dialog */}
      <Dialog
        open={isOpenPlanForm}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
        }}
      >
        <DialogTitle sx={{ color: colors.grey[100] }}>
          Add New Plan Type
        </DialogTitle>

        <form onSubmit={handleSavePlanType}>
          <DialogContent sx={{ pt: 1 }}>
            <TextField
              autoFocus
              fullWidth
              label="Plan Type Name"
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              disabled={isLoading}
              error={!!error}
              helperText={error}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.grey[100],
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[300],
                },
              }}
            />

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={handleClose}
              disabled={isLoading}
              sx={{ color: colors.grey[300] }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !planType.trim()}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Dialog for sponsor */}
      <Dialog
        open={isOnboardingDialogOpen}
        onClose={() => setIsOnboardingDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: colors.primary[400],
            border: `1px solid ${colors.primary[300]}66`,
            color: colors.grey[100],
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: 700, color: colors.grey[100] }}
          >
            Create a new Sponsor
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: colors.grey[400], mt: 0.5 }}
          >
            Capture the core employer plan details before moving to enrollment
            setup.
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <br />
          <Stack spacing={2}>
            <TextField
              label="company name"
              name="company_name"
              value={onboardFormData.company_name}
              onChange={handleChange}
              fullWidth
            />
            
              <TextField
              label="Ein"
              name="ein"
              value={onboardFormData.ein}
              onChange={handleChange}
              fullWidth
            />
              <TextField
              label="Plan Type"
              name="plan_type"
              value={onboardFormData.plan_type}
              onChange={handleChange}
              fullWidth
            />
              <TextField
              label="Match Formula"
              name="match_formula"
              value={onboardFormData.match_formula}
              onChange={handleChange}
              fullWidth
            />
              <TextField
              label="Vesting Schedule"
              name="vesting_schedule"
              value={onboardFormData.vesting_schedule}
              onChange={handleChange}
              fullWidth
            />
              <TextField
              label="Safe Harbour Plan"
              name="safe_harbour_plan"
              value={onboardFormData.safe_harbour_plan}
              onChange={handleChange}
              fullWidth
            />
              <TextField
              label="Plan Start Date"
              name="plan_start_date"
              value={onboardFormData.plan_start_date}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Primary Contact Name"
              name="primaryContactName"
              value={onboardFormData.primaryContactName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Primary Contact Email"
              name="primaryContactEmail"
              value={onboardFormData.primaryContactEmail}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Primary Contact Phone"
              name="primary_contact_phone"
              value={onboardFormData.primary_contact_phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={onboardFormData.addressLine1}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="City"
              name="city"
              value={onboardFormData.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="State"
              name="state"
              value={onboardFormData.state}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Zipcode"
              name="zipcode"
              value={onboardFormData.zipcode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Country"
              name="country"
              value={onboardFormData.country}
              onChange={handleChange}
              fullWidth
            />

            

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: `${colors.blueAccent[500]}14`,
                border: `1px solid ${colors.blueAccent[500]}33`,
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: colors.grey[400],
                  mb: 0.75,
                }}
              >
                Contribution example
              </Typography>
            </Box>
          </Stack>

          {/* Success and Error Alerts */}
          {isOnboadSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {isOnboadSuccess}
            </Alert>
          )}

          {isOnboadError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {isOnboadError}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setIsOnboardingDialogOpen(false)}
            sx={{ color: colors.grey[300] }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={CreateSponsorButton}
            startIcon={
              isOnboardingLoading ? <CircularProgress size={20} /> : null
            }
            sx={{
              bgcolor: colors.blueAccent[500],
              color: colors.grey[100],
              fontWeight: 600,
              "&:hover": {
                bgcolor: colors.blueAccent[400],
              },
            }}
          >
            Create Sponsor
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanManagement;
