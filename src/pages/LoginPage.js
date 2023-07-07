import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box, Avatar } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { useStateContext } from '../contexts/ContextProvider';
import { LoginForm } from '../sections/auth/login';
import api from '../api';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const { token } = useStateContext()
  const [googleUrl, setGoogleUrl] = useState(null)

  useEffect(() => {
    api.post(
      'admin/auth/google/url'
    )
      .then(({ data }) => {
        setGoogleUrl(data.url)
      })
  }, [])

  if (token) {
    return <Navigate to="/" />
  }

  const handleLoginSocial = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  return (
    <>
      <Helmet>
        <title> Đăng nhập quản trị | Sinh viên 5 tốt TVU </title>
      </Helmet>

      <StyledRoot>
        <Box sx={{
          display: 'inline-flex',
          position: 'fixed',
          top: { xs: 16, sm: 24, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
        }}>
          <Avatar src={`/assets/icons/navbar/dtncshcm.svg`} variant="rounded" alt="Đội thanh niên Cộng sản Hồ Chí Minh" title="Đội thanh niên Cộng sản Hồ Chí Minh" />
          <Avatar src={`/assets/icons/navbar/tvu.svg`} sx={{ marginX: 1 }} alt="Đại học Trà Vinh" title="Đại học Trà Vinh" />
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
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => handleLoginSocial(googleUrl)}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
