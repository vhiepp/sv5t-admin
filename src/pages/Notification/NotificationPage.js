import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'new', label: 'Mới nhất' },
    { value: 'old', label: 'Cũ nhất' },
];

// ----------------------------------------------------------------------

export default function NotificationPage() {
    const navigate = useNavigate();

    const handleClickCreateNotification = () => {
        navigate('tao-moi');
    }

    return (
        <>
            <Helmet>
                <title> Thông báo | Sinh viên 5 tốt TVU </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Thông báo
                    </Typography>
                    <Button variant="contained" onClick={handleClickCreateNotification} startIcon={<Iconify icon="eva:plus-fill" />} >
                        Tạo mới
                    </Button>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="end">
                    {/* <BlogPostsSearch posts={POSTS} /> */}
                    {/* <BlogPostsSort options={SORT_OPTIONS} onSort={handleBlogSort} defaultValue={order} /> */}
                </Stack>

            </Container>
        </>
    );
}
