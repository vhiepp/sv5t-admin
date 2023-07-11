import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// mock
import PostList from 'src/sections/@dashboard/post/PostList';

// ----------------------------------------------------------------------

const url = {
  edit: "/dashboard/bai-viet/edit"
}

// ----------------------------------------------------------------------

export default function PostPage() {

  const navigate = useNavigate();

  const handleClickNewPost = () => {
    navigate('dang-bai');
  }

  return (
    <>
      <Helmet>
        <title> Bài viết | Sinh viên 5 tốt TVU </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bài viết
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickNewPost}>
            Đăng
          </Button>
        </Stack>

        <PostList type="posts" url={url} />

      </Container>
    </>
  );
}
