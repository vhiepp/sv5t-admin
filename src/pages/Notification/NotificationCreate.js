import { Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PostForm from "src/sections/@dashboard/post/PostForm";

export default function NotificationCreate() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <>
            <Helmet>
                <title> Tạo thông báo mới | Sinh viên 5 tốt TVU </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Button variant="contained" onClick={handleBack} startIcon={<ReplyOutlinedIcon />} >
                        Trở lại
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        Tạo thông báo
                    </Typography>
                </Stack>

                <PostForm
                    name="thông báo"
                    direct="/dashboard/thong-bao"
                    submitUrl="admin/forum/notifications/create"
                />

            </Container >
        </>
    )
}