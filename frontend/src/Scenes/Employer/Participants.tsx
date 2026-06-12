import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import {
  CreateEmployeeApi,
  GetAllEmployees,
} from "../../Components/Apis/EmployeeApi";

interface EmployeeFormTypes {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  department: string;
  jobTitle: string;
  annualSalary: string;
  startDate: string;
  deferralRate: string;
}

interface EmployeeType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  department: string;
  jobTitle: string;
  annualSalary: string;
  deferralRate: string;
  employeeId: string; //EMP-00182
  status: string; //ACTIVE, NOT_ENROLLED, PENDING, TERMINATED
  balance?: number;
  vested?:string;
  loan?:string

  startDate: string;
}

const statCards = [
  {
    label: "TOTAL",
    value: "1,248",
  
  },
  {
    label: "ACTIVE",
    value: "1,182",
   
  },
  {
    label: "NOT ENROLLED",
    value: "270",
  
  },
  {
    label: "TERMINATED",
    value: "66",
   
  },
    {
    label: "HAVE LOANS",
    value: "187",
   
  },
];

const EmployerDashboard = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const cardSx = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}55`,
    p: "20px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
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

  const TABLE_COLS = "2fr 1.5fr 1fr 1.5fr 1fr 1.5fr 1.2fr 1.2fr 1.2fr 80px";

  //employee dialog
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [employeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormTypes>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    department: "",
    jobTitle: "",
    annualSalary: "",
    startDate: "",
    deferralRate: "",
  });

  const EmployeeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const name = e.target.name
    // const value = e.target.value
    const { name, value } = e.target;

    setEmployeeForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEmployee = async () => {
    console.log(localStorage.getItem("accessToken"));
    setButtonLoading(true);
    setIsError("");

    try {
      await CreateEmployeeApi(employeeForm);
      setIsSuccess("New Employee Created Successfully");
      setButtonLoading(false);
      setEmployeeForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        department: "",
        jobTitle: "",
        annualSalary: "",
        startDate: "",
        deferralRate: "",
      });
    } catch (err) {
      setIsError("server error");
    } finally {
      setIsEmployeeDialogOpen(false);
    }
  };

  //fetch the employees
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  console.log(employees);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [employeeLoading, setEmployeeLoading] = useState(false);

  useEffect(() => {
    setError("");
    setEmployeeLoading(true);
    const fetchEmployee = async () => {
      try {
        const data = await GetAllEmployees();
        console.log("response", data);
        setEmployees(data);
        setSuccess("fetching all the employees successful");
        setEmployeeLoading(false);
      } catch (error) {
        console.error("fetch error", error);
        setError("failed fetching the employees");
      }finally{
        setEmployeeLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div>
      <Box
        sx={{
          p: "24px 28px",
          backgroundColor: colors.blueAccent[900],
          overflowY: "auto",
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
            {/* Good morning, {user?.firstName || "Marcus"} 👋 */}{" "}
            {/* we will be exchanging it to the company name later */}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            //   onClick={() => setIsOpenPlanForm(true)}
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            sx={actionBtnSx}
          >
            Export csv
          </Button>
          <Button
            onClick={() => setIsEmployeeDialogOpen(true)}
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
            Add Employee
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            mb: "20px",
          }}
        >
          {statCards.map((card, i) => (
            <Box
              key={i}
              sx={{ ...cardSx, borderTop: `3px solid ${card.accent}` }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: colors.grey[500],
                  letterSpacing: "0.8px",
                  mb: "5px",
                }}
              >
                {card.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: colors.grey[100],
                  lineHeight: 1.1,
                  mb: "8px",
                }}
              >
                {card.value}
              </Typography>
              {/* <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {card.positive ? (
                  <TrendingUpIcon sx={{ fontSize: 14, color: "#4CCEAC" }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 14, color: "#e74c3c" }} />
                )}
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: card.positive ? "#4CCEAC" : "#e74c3c",
                  }}
                >
                  {card.change}
                </Typography>
              </Box> */}
              <Typography
                sx={{ fontSize: "11px", color: colors.grey[600], mt: "2px" }}
              >
                {card.sub}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ ...cardSx, p: "24px 28px" }}>
          {/* Table Header bar */}
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
                Participants
                <Typography sx={{ fontSize: "11px", color: colors.grey[500] }}>
                  {employees.length} Employee{employees.length !== 1 ? "s" : ""}{" "}
                  Total
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
                View all → {/* add real button here later */}
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
            {/* table heading */}
            {[
              "employee",
              " id",
              "dept",
              "start date",
              "deferral",
              "balance",
              " vested",
              "loan",
              "status",
              "actions",
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

          {/*ROW */}
          {employeeLoading ? (
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
                Loading employees....
              </Typography>
            </Box>
          ) : employees.length === 0 ? (
            <Box sx={{ py: "32px", textAlign: "center" }}>
              <Typography sx={{ fontSize: "13px", color: colors.grey[500] }}>
                No Employees found.
              </Typography>
            </Box>
          ) : (
            employees.map((mapped_employees, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns: TABLE_COLS,
                  alignItems: "center",
                  py: "13px",
                  borderBottom:
                    i < employees.length - 1
                      ? `1px solid ${colors.primary[300]}22`
                      : "none",
                  borderRadius: "8px",
                  px: "4px",
                  mx: "-4px",
                  "&:hover": { backgroundColor: `${colors.primary[300]}18` },
                  transition: "background-color 0.15s",
                }}
              >
                {/* EMPLOYEE */}
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
                      {mapped_employees.firstName
                        ?.charAt(0)
                        .toLocaleUpperCase() ?? "?"}{mapped_employees.lastName?.charAt(0).toLocaleUpperCase()}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.grey[200],
                    }}
                  >
                    {mapped_employees.firstName}
                  </Typography>
                </Box>

                {/* EMP_ID */}
                <Box>
                  <Chip  label={mapped_employees.employeeId}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      height: "22px",
                      bgcolor: `${colors.blueAccent[500]}18`,
                      color: colors.blueAccent[400],
                      border: `1px solid ${colors.blueAccent[500]}33`,
                      borderRadius: "6px",
                    }}/>   
                </Box>

                {/* department */}
               <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                {mapped_employees.department}
               </Typography>

{/* start date */}

                 <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                {mapped_employees.startDate}
               </Typography>

               {/* deferral rate */}
               <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                {mapped_employees.deferralRate }
               </Typography>
{/* balance */}
                <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                {mapped_employees.balance
                    ? `$${mapped_employees.balance.toLocaleString()}`
                    : "—"}
               </Typography>

               {/* vested */}

               <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                {mapped_employees.vested
                    ? `$${mapped_employees.vested.toLocaleString()}`
                    : "—"}

               </Typography>

               {/* loan */}
                <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>
                {mapped_employees.loan
                    ? `$${mapped_employees.loan.toLocaleString()}`
                    : "—"}
               </Typography>

               {/* status */}

               <Box>
                  <Chip  label={mapped_employees.status ?? "unknown"}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      height: "22px",
                      bgcolor: mapped_employees.status ==="ACTIVE" ?`${colors.greenAccent[300]}18 `:`${colors.redAccent[300]}`,
                      color: mapped_employees.status ==="ACTIVE" ? colors.greenAccent[700] :colors.redAccent[700],
                      border: `1px solid ${colors.blueAccent[500]}33`,
                      borderRadius: "6px",
                    }}/>   
                </Box>

              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* employee form dialog */}
      <Dialog
        open={employeeDialogOpen}
        onClose={() => setIsEmployeeDialogOpen(false)}
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
            Add New Employee
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: colors.grey[200], mt: 0.5 }}
          >
            Capture core employee details before moving to enrollment setup.
          </Typography>
        </DialogTitle>

        <DialogContent>
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
            Employee information
          </Typography>

          <Stack spacing={2} sx={{ mb: 2.5 }}>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="First Name"
                sx={dialogFieldSx}
                fullWidth
                name="firstName"
                value={employeeForm.firstName}
                onChange={EmployeeHandleChange}
              />
              <TextField
                sx={dialogFieldSx}
                label="Last Name"
                name="lastName"
                value={employeeForm.lastName}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Phone Number"
                name="phone"
                value={employeeForm.phone}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Email"
                name="email"
                value={employeeForm.email}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Department"
                name="department"
                value={employeeForm.department}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Job Titles"
                name="jobTitle"
                value={employeeForm.jobTitle}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Annual Salary"
                name="annualSalary"
                value={employeeForm.annualSalary}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Start Date"
                name="startDate"
                value={employeeForm.startDate}
                onChange={EmployeeHandleChange}
              />

              <TextField
                sx={dialogFieldSx}
                label="Deferral Rate"
                name="deferralRate"
                value={employeeForm.deferralRate}
                onChange={EmployeeHandleChange}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            sx={{
              color: colors.grey[400],
              textTransform: "none",
              borderRadius: "9px",
            }}
            onClick={() => setIsEmployeeDialogOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={submitEmployee}
            startIcon={buttonLoading ? <CircularProgress size={16} /> : null}
            sx={actionBtnSx}
          >
            {buttonLoading ? "Creating..." : "Create Sponsor"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployerDashboard;
