// PayrollPage.tsx
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  LinearProgress,
  useTheme,
  Grid,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";
import { tokens } from "../../theme";
import { fileUploadApi } from "./API/payrollApi";

interface Batch {
  id: number;
  batchCode: string;
  payPeriod: string;
  payrollType: string;
  totalParticipants: number;
  totalAmount: number;
  status: "POSTED" | "PENDING" | "PROCESSING" | "PARTIAL" | "FAILED";
  createdAt: string;
}

const statusConfig: Record<string, { color: any; icon: React.ReactElement }> = {
  POSTED: { color: "success", icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
  PENDING: { color: "warning", icon: <PendingIcon sx={{ fontSize: 14 }} /> },
  PROCESSING: { color: "info", icon: <PendingIcon sx={{ fontSize: 14 }} /> },
  PARTIAL: { color: "warning", icon: <ErrorIcon sx={{ fontSize: 14 }} /> },
  FAILED: { color: "error", icon: <ErrorIcon sx={{ fontSize: 14 }} /> },
};

const PayrollPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [batches] = useState<Batch[]>([
    {
      id: 1,
      batchCode: "BATCH-0315",
      payPeriod: "Mar 15, 2025",
      payrollType: "REGULAR",
      totalParticipants: 1248,
      totalAmount: 700000,
      status: "POSTED",
      createdAt: "2025-03-15",
    },
    {
      id: 2,
      batchCode: "BATCH-0301",
      payPeriod: "Mar 1, 2025",
      payrollType: "REGULAR",
      totalParticipants: 1244,
      totalAmount: 698200,
      status: "POSTED",
      createdAt: "2025-03-01",
    },
    {
      id: 3,
      batchCode: "BATCH-0215",
      payPeriod: "Feb 15, 2025",
      payrollType: "REGULAR",
      totalParticipants: 1241,
      totalAmount: 695400,
      status: "POSTED",
      createdAt: "2025-02-15",
    },
    {
      id: 4,
      batchCode: "BATCH-0201",
      payPeriod: "Feb 1, 2025",
      payrollType: "REGULAR",
      totalParticipants: 1238,
      totalAmount: 692100,
      status: "PARTIAL",
      createdAt: "2025-02-01",
    },
  ]);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [payPeriod, setPayPeriod] = useState("");
  const [payrollType, setPayrollType] = useState("REGULAR");

  const cardSx = {
    backgroundColor: colors.blueAccent[900],
    borderRadius: "12px",
    border: `1px solid ${colors.primary[300]}55`,
    p: 3,
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    console.log("Selected file:", selected);

    if (selected?.name.endsWith(".csv")) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file || !payPeriod) return setError("Please fill all fields");
    setUploading(true);

    try {
      await fileUploadApi(payPeriod, payrollType, file);
      setTimeout(() => {
        setSuccess("Payroll uploaded and processing started successfully!");
        setUploading(false);
        setFile(null);
        setPayPeriod("");
      }, 1500);
    } catch (error) {
      setError("Upload failed please try again");
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    // ... same as before
    const csv =
      "employee_id,gross_salary,deferral_amount,pay_date\nEMP-00182,5833.33,0.08,2025-05-15";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payroll_template.csv";
    a.click();
  };

  const fmt = (val: number) => `$${val.toLocaleString()}`;

  return (
    <Box sx={{ p: "24px 28px", backgroundColor: colors.blueAccent[900] }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: 600, color: colors.grey[100] }}
        >
          Payroll Upload
        </Typography>
        <Button
          startIcon={<DownloadIcon />}
          onClick={downloadTemplate}
          sx={{
            color: colors.grey[100],
            bgcolor: colors.blueAccent[500],
            px: 3,
            py: 1,
            borderRadius: "8px",
          }}
        >
          Download Template
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* LEFT - Upload Section */}
        <Grid item xs={12} md={5.5}>
          <Box sx={cardSx}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📤
            </Typography>

            {/* Drop Zone */}
            <Box
              onClick={() => document.getElementById("file-upload")?.click()}
              sx={{
                border: `2px dashed ${colors.primary[300]}88`,
                borderRadius: "12px",
                p: "40px 20px",
                textAlign: "center",
                cursor: "pointer",
                mb: 3,
                "&:hover": {
                  borderColor: colors.blueAccent[400],
                  backgroundColor: `${colors.blueAccent[500]}11`,
                },
              }}
            >
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileSelect}
              />
              <UploadFileIcon
                sx={{
                  fontSize: 48,
                  color: file ? "#4CCEAC" : colors.grey[500],
                  mb: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: colors.grey[100],
                }}
              >
                Drop your payroll CSV or EDI file here
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: colors.grey[500], mt: 0.5 }}
              >
                Supports: .csv, .edi, .txt — Max 50MB
              </Typography>
            </Box>

            {/* Form Fields */}
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{ fontSize: "12px", color: colors.grey[500], mb: 0.5 }}
              >
                PAY PERIOD
              </Typography>
              <input
                type="date"
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  backgroundColor: colors.primary[400],
                  border: `1px solid ${colors.primary[300]}55`,
                  borderRadius: "8px",
                  color: colors.grey[100],
                  fontSize: "14px",
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: "12px", color: colors.grey[500], mb: 0.5 }}
              >
                PAYROLL TYPE
              </Typography>
              <select
                value={payrollType}
                onChange={(e) => setPayrollType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  backgroundColor: colors.primary[400],
                  border: `1px solid ${colors.primary[300]}55`,
                  borderRadius: "8px",
                  color: colors.grey[100],
                  fontSize: "14px",
                }}
              >
                <option value="REGULAR">Regular Payroll</option>
                <option value="BONUS">Bonus Payroll</option>
                <option value="OFF_CYCLE">Off-cycle</option>
                <option value="PROFIT_SHARING">Profit Sharing</option>
              </select>
            </Box>

            <Box
              sx={{
                bgcolor: colors.blueAccent[900],
                p: 2,
                borderRadius: "8px",
                mb: 3,
                border: `1px solid ${colors.blueAccent[500]}22`,
              }}
            >
              <Typography sx={{ fontSize: "12.5px", color: colors.grey[300] }}>
                The file must include:{" "}
                <strong>
                  employee_id, gross_salary, deferral_amount, pay_date
                </strong>
                . The system auto-calculates employer match.
              </Typography>
            </Box>

            <Typography>File Selected: {file ? "YES" : "NO"}</Typography>

            <Typography>Pay Period: {payPeriod || "EMPTY"}</Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={handleUpload}
              disabled={uploading || !file || !payPeriod}
              sx={{
                py: 1.5,
                fontSize: "15px",
                fontWeight: 600,
                borderRadius: "10px",
              }}
            >
              {uploading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Processing...
                </Box>
              ) : (
                "Upload & Process Payroll"
              )}
            </Button>
          </Box>
        </Grid>

        {/* RIGHT - Recent Batches */}
        <Grid item xs={12} md={6.5}>
          <Box sx={cardSx}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 2 }}>
              Recent Payroll Batches
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: colors.grey[500],
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    BATCH ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[500],
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    PAY DATE
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[500],
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                    align="right"
                  >
                    PARTICIPANTS
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[500],
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                    align="right"
                  >
                    AMOUNT
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.grey[500],
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    STATUS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {batches.map((batch) => {
                  const sc = statusConfig[batch.status];
                  return (
                    <TableRow key={batch.id} hover>
                      <TableCell
                        sx={{
                          fontFamily: "monospace",
                          color: colors.grey[100],
                        }}
                      >
                        {batch.batchCode}
                      </TableCell>
                      <TableCell sx={{ color: colors.grey[100] }}>
                        {batch.payPeriod}
                      </TableCell>
                      <TableCell align="right" sx={{ color: colors.grey[100] }}>
                        {batch.totalParticipants.toLocaleString()}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "#4CCEAC", fontWeight: 600 }}
                      >
                        {fmt(batch.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={sc.icon}
                          label={batch.status}
                          color={sc.color}
                          size="small"
                          sx={{ fontSize: "11px", fontWeight: 600 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>

      {/* Global Alerts */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default PayrollPage;
