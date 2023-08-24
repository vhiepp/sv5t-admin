import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Divider, Stack, Button, Box, Avatar } from "@mui/material";
// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
// components
import Iconify from "../components/iconify";
// sections
import { useStateContext } from "../contexts/ContextProvider";
import { LoginForm } from "../sections/auth/login";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { auth } from "src/firebase";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const { setUser, axiosApi } = useStateContext();
  const navigate = useNavigate();
  const [unauthorizedError, setUnauthorizedError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    axiosApi
      .post("/admin/auth/me")
      .then(({ data }) => {
        if (data.user) {
          setUser(data.user);
          navigate("/dashboard/app");
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);

  const handleLoginWithGoogle = async () => {
    setDisableButton(true);
    if (unauthorizedError) {
      setUnauthorizedError(false);
    }
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const { data } = await axiosApi.post("/admin/auth/login/provider", user);
      if (data.user) {
        setUser(data.user);
        navigate("/dashboard/app");
      }
    } catch (error) {
      setUnauthorizedError(true);
    }
    setDisableButton(false);
  };

  const handleLoginWithMicrosoft = async () => {
    setDisableButton(true);
    if (unauthorizedError) {
      setUnauthorizedError(false);
    }
    try {
      const provider = new OAuthProvider("microsoft.com");
      const { user } = await signInWithPopup(auth, provider);
      const { data } = await axiosApi.post("/admin/auth/login/provider", user);
      if (data.user) {
        setUser(data.user);
        navigate("/dashboard/app");
      }
    } catch (error) {
      setUnauthorizedError(true);
    }
    setDisableButton(false);
  };

  return (
    <>
      <Helmet>
        <title> Đăng nhập quản trị | Sinh viên 5 tốt TVU </title>
      </Helmet>

      <StyledRoot>
        <Box
          sx={{
            display: "inline-flex",
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        >
          <Avatar
            src={`/assets/icons/navbar/dtncshcm.svg`}
            variant="rounded"
            alt="Đội thanh niên Cộng sản Hồ Chí Minh"
            title="Đội thanh niên Cộng sản Hồ Chí Minh"
          />
          <Avatar
            src={`/assets/icons/navbar/tvu.svg`}
            sx={{ marginX: 1 }}
            alt="Đại học Trà Vinh"
            title="Đại học Trà Vinh"
          />
          <Avatar src={`/assets/icons/navbar/hsvvn.svg`} alt="Hội sinh viên Việt Nam" title="Hội sinh viên Việt Nam" />
        </Box>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Sv5T TVU
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {""}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleLoginWithGoogle}
                disabled={disableButton}
              >
                <Iconify icon="flat-color-icons:google" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleLoginWithMicrosoft}
                disabled={disableButton}
              >
                <Iconify icon="logos:microsoft-icon" color="#1877F2" width={22} height={22} />
              </Button>
            </Stack>
            <Typography fontSize=".8rem" textAlign="center" color="red" fontStyle="italic" fontWeight="600">
              {unauthorizedError ? "Bạn không có quyền truy cập vào trang dành cho nhà quản trị!" : " "}
            </Typography>
            <Divider sx={{ mb: 3, mt: 1 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
