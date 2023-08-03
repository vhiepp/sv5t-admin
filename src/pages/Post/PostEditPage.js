import { Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { useNavigate, useParams } from "react-router-dom";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PostForm from "src/sections/@dashboard/post/PostForm";

export default function PostEditPage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title> Chỉnh sửa | Sinh viên 5 tốt TVU </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ReplyOutlinedIcon />}
          >
            Trở lại
          </Button>
          <Typography variant="h4" gutterBottom>
            Chỉnh sửa
          </Typography>
        </Stack>

        <PostForm
          name="bài viết"
          direct="/dashboard/bai-viet"
          submitUrl="admin/forum/posts/update"
          slug={slug}
        />
      </Container>
    </>
  );
}
