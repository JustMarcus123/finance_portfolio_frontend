import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface fieldProps {
  email: string;
  password: string;
}

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in the forms");
      return;
    }

    setIsLoading(true);
    try {
      console.log("1. Calling login...");
      await login(email.trim(), password, remember);
      console.log("2. Login successful — navigating to /dashboard");

      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.log("3. Login failed:", error.message);
      setError(error.message ?? "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldStyles = (fieldName: string) => ({
    "& .MuiOutlinedInput-root": {
      color: colors.grey[100],
      borderRadius: "10px",
      backgroundColor:
        focusedField === fieldName
          ? `${colors.primary[300]}22`
          : `${colors.primary[300]}11`,
      transition: "background-color 0.2s ease",
      "& fieldset": {
        borderColor:
          focusedField === fieldName
            ? colors.greenAccent[400]
            : `${colors.grey[600]}88`,
        borderWidth: focusedField === fieldName ? "1.5px" : "1px",
        transition: "all 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: `${colors.grey[400]}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.greenAccent[400],
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      color: colors.grey[500],
      fontSize: "14px",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.greenAccent[400],
    },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      color:
        focusedField === fieldName ? colors.greenAccent[400] : colors.grey[500],
      transition: "color 0.2s ease",
      fontSize: "20px",
    },
  });

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          backgroundColor: colors.primary[500],
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(${colors.primary[400]}44 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary[400]}44 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          },
          // Glow orbs
          "&::after": {
            content: '""',
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.greenAccent[700]}18 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Decorative top-left accent */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "280px",
            height: "280px",
            borderRight: `1px solid ${colors.greenAccent[700]}33`,
            borderBottom: `1px solid ${colors.greenAccent[700]}33`,
            borderBottomRightRadius: "280px",
            pointerEvents: "none",
          }}
        />
        {/* Decorative bottom-right accent */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "200px",
            height: "200px",
            borderLeft: `1px solid ${colors.greenAccent[700]}33`,
            borderTop: `1px solid ${colors.greenAccent[700]}33`,
            borderTopLeftRadius: "200px",
            pointerEvents: "none",
          }}
        />

        {/* Center card */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: "440px",
              mx: 2,
              backgroundColor: `${colors.primary[400]}ee`,
              backdropFilter: "blur(12px)",
              border: `1px solid ${colors.primary[300]}55`,
              borderRadius: "16px",
              padding: "48px 40px 40px",
              boxShadow: `0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px ${colors.greenAccent[700]}18`,
              animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
              "@keyframes slideUp": {
                from: { opacity: 0, transform: "translateY(24px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb="36px"
            >
              {/* Icon badge */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "14px",
                  backgroundColor: `${colors.greenAccent[700]}33`,
                  border: `1px solid ${colors.greenAccent[600]}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: "18px",
                  animation: "fadeIn 0.6s ease 0.2s both",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "scale(0.8)" },
                    to: { opacity: 1, transform: "scale(1)" },
                  },
                }}
              >
                <LockOutlinedIcon
                  sx={{ color: colors.greenAccent[400], fontSize: 24 }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: colors.grey[100],
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}
              >
                Sign in
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: colors.grey[500],
                  mt: "6px",
                }}
              >
                Welcome back — enter your credentials
              </Typography>
            </Box>

            {/* Email field */}
            <TextField
              fullWidth
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              sx={{ ...fieldStyles("email"), mb: "16px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Password field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              sx={{ ...fieldStyles("password"), mb: "8px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        sx={{
                          color: colors.grey[400],
                          "&:hover": { color: colors.grey[200] },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Remember me + Forgot password */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="4px"
              mb="28px"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    size="small"
                    sx={{
                      color: `${colors.grey[500]}`,
                      p: "4px",
                      mr: "4px",
                      "&.Mui-checked": {
                        color: colors.greenAccent[400],
                      },
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontSize: "13px", color: colors.grey[400] }}
                  >
                    Remember me
                  </Typography>
                }
              />
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: colors.greenAccent[400],
                    cursor: "pointer",
                    transition: "color 0.15s",
                    "&:hover": {
                      color: colors.greenAccent[300],
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Box>

            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: "13px",
                borderRadius: "10px",
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                fontWeight: 700,
                fontSize: "15px",
                textTransform: "none",
                letterSpacing: "0.2px",
                boxShadow: `0 4px 20px ${colors.greenAccent[700]}55`,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: colors.greenAccent[500],
                  boxShadow: `0 6px 28px ${colors.greenAccent[600]}66`,
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
                "&:disabled": {
                  backgroundColor: `${colors.greenAccent[700]}88`,
                  color: `${colors.grey[300]}88`,
                },
              }}
            >
              {isLoading ? (
                <Box display="flex" alignItems="center" gap="10px">
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: `2px solid ${colors.grey[400]}44`,
                      borderTopColor: colors.grey[100],
                      animation: "spin 0.7s linear infinite",
                      "@keyframes spin": {
                        to: { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                  Signing in...
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider line at bottom */}
            <Box
              sx={{
                mt: "28px",
                pt: "20px",
                borderTop: `1px solid ${colors.primary[300]}44`,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: colors.grey[600] }}>
                Protected by JWT Authentication
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
