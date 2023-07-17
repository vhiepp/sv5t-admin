import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { useNavigate } from 'react-router-dom';

import PostList from 'src/sections/@dashboard/post/PostList';

// ----------------------------------------------------------------------
const url = {
    edit: "/dashboard/thong-bao/edit",
    delete: "/admin/forum/notifications/delete",
    active: "/admin/forum/notifications/active",
}
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

                <PostList type="notifications" url={url} typeName="thông báo" />

            </Container>
        </>
    );
}
