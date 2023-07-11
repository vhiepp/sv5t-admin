import { Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PostForm from "src/sections/@dashboard/post/PostForm";

export default function PostCreatePage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <>
            <Helmet>
                <title> Viết bài | Sinh viên 5 tốt TVU </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Button variant="contained" onClick={handleBack} startIcon={<ReplyOutlinedIcon />} >
                        Trở lại
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        Đăng bài
                    </Typography>
                </Stack>

                <PostForm
                    name="bài viết"
                    direct="/dashboard/bai-viet"
                    submitUrl="admin/forum/posts/create"
                />

            </Container >
        </>
    )
}