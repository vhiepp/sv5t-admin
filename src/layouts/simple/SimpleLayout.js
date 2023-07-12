import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../../components/logo';
import { Avatar, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
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
      </StyledHeader >

      <Outlet />
    </>
  );
}
