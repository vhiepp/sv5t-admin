import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import HtmlTooltip from "src/components/tooltip/HTMLToolTip";

export default function CommentList({ comments }) {
  console.log(comments);
  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Paper
            key={index}
            elevation={4}
            sx={{
              my: 2,
              py: 1,
              px: 2,
            }}
          >
            <Box>
              <Stack direction="row" mb={1}>
                <HtmlTooltip
                  placement="bottom-start"
                  title={
                    <Fragment>
                      {/* <Typography color="inherit">
                      <b>{comment.user.fullname}</b>
                    </Typography> */}
                      <em>Email: {comment.user?.email}</em> <br />
                      <em>Lớp: {comment.user?.class}</em>
                    </Fragment>
                  }
                  // arrow
                >
                  <Avatar
                    sx={{
                      mr: 1,
                      cursor: "pointer",
                    }}
                    alt={comment.user?.fullname}
                    src={comment.user?.avatar}
                  />
                </HtmlTooltip>
                <Box>
                  <Typography fontWeight="600">{comment.user?.fullname}</Typography>
                  <Typography fontSize=".6rem">{`${comment.create_time.date} ${comment.create_time.time}`}</Typography>
                </Box>
              </Stack>
              <Typography fontSize=".9rem">{comment.content}</Typography>
            </Box>
          </Paper>
        ))
      ) : (
        <Typography
          sx={{
            fontSize: ".8rem",
            fontWeight: "500",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Chưa có bình luận!
        </Typography>
      )}
    </>
  );
}
