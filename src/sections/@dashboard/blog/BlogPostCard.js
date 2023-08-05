import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  IconButton,
  Modal,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// utils
//
import SvgColor from "../../../components/svg-color";
import Iconify from "../../../components/iconify";
import React, { Fragment, useState } from "react";
import HtmlTooltip from "src/components/tooltip/HTMLToolTip";
import LightTooltip from "src/components/tooltip/LightTooltip";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";

import HtmlTooltipDark from "src/components/tooltip/HTMLToolTipDark";
import DarkTooltip from "src/components/tooltip/DarkTooltip";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "src/contexts/ContextProvider";

// ----------------------------------------------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: 24,
  pt: 2,
  px: 3,
  pb: 3,
};

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index, url, ...props }) {
  const { axiosApi } = useStateContext();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openAlertDelete, setOpenAlertDetele] = useState(false);
  const [loadingModalDelete, setLoadingModalDelete] = useState(false);
  const [openModalActive, setOpenModalActive] = useState(false);
  const [openAlertActive, setOpenAlertActive] = useState(false);
  const [loadingModalActive, setLoadingModalActive] = useState(false);
  const { thumbnail, title, creator } = post;
  const createdAt = `${post.created_time.date} ${post.created_time.time}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const navigate = useNavigate();

  const POST_INFO = [
    { number: post.hearts.count, icon: "ph:heart-fill" },
    { number: post.comments.count, icon: "mingcute:comment-fill" },
    { number: 0, icon: "eva:share-fill" },
  ];

  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDeletePost = () => {
    setLoadingModalDelete(true);
    axiosApi
      .post(url.delete, { slug: post.slug })
      .then(({ data }) => {
        setLoadingModalDelete(false);
        if (data.status == "success") {
          handleCloseModalDelete();
          setOpenAlertDetele(true);
          props.onDeleted(index);
        }
      })
      .catch((e) => {
        setLoadingModalDelete(false);
        console.log(e);
      });
  };

  const handleOpenModalActive = () => {
    setOpenModalActive(true);
  };

  const handleCloseModalActive = () => {
    setOpenModalActive(false);
  };

  const handleActivePost = () => {
    setLoadingModalActive(true);
    axiosApi
      .post(url.active, { slug: post.slug })
      .then(({ data }) => {
        setLoadingModalActive(false);
        if (data.status == "success") {
          handleCloseModalActive();
          setOpenAlertActive(true);
          props.onDeleted(index);
        }
      })
      .catch((e) => {
        setLoadingModalActive(false);
        console.log(e);
      });
  };

  const handleClickEditPost = () => {
    navigate(`${url.edit}/${post.slug}`);
  };

  const handleCloseAlertDeleted = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertDetele(false);
  };

  const handleCloseAlertActive = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertActive(false);
  };

  return (
    <>
      <HtmlTooltipDark
        placement="bottom-end"
        title={
          <Fragment>
            {url.active && props.active === 0 && (
              <DarkTooltip title="Duyệt" placement="bottom-start" followCursor>
                <IconButton aria-label="active" size="large" onClick={handleOpenModalActive}>
                  <TaskTwoToneIcon color="success" />
                </IconButton>
              </DarkTooltip>
            )}
            {url.edit && (
              <DarkTooltip title="Sửa" placement="bottom-start" followCursor>
                <IconButton aria-label="edit" size="large" onClick={handleClickEditPost}>
                  <ModeEditOutlineTwoToneIcon color="info" />
                </IconButton>
              </DarkTooltip>
            )}
            {url.delete && props.active !== 2 && (
              <DarkTooltip title="Xóa" placement="bottom-start" followCursor>
                <IconButton aria-label="delete" size="large" onClick={handleOpenModalDelete}>
                  <DeleteTwoToneIcon color="error" />
                </IconButton>
              </DarkTooltip>
            )}
          </Fragment>
        }
        arrow
      >
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
          <Card sx={{ position: "relative" }}>
            <StyledCardMedia
              sx={{
                ...((latestPostLarge || latestPost) && {
                  pt: "calc(100% * 4 / 3)",
                  "&:after": {
                    top: 0,
                    content: "''",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  },
                }),
                ...(latestPostLarge && {
                  pt: {
                    xs: "calc(100% * 4 / 3)",
                    sm: "calc(100% * 3 / 4.66)",
                  },
                }),
              }}
            >
              <SvgColor
                color="paper"
                src="/assets/icons/shape-avatar.svg"
                sx={{
                  width: 80,
                  height: 36,
                  zIndex: 9,
                  bottom: -15,
                  position: "absolute",
                  color: "background.paper",
                  ...((latestPostLarge || latestPost) && { display: "none" }),
                }}
              />
              <HtmlTooltip
                placement="bottom-start"
                title={
                  <Fragment>
                    <Typography color="inherit">
                      <b>{creator.fullname}</b>
                    </Typography>
                    <em>{creator.email}</em>
                  </Fragment>
                }
                // arrow
              >
                <StyledAvatar
                  alt={creator.fullname}
                  src={creator.avatar}
                  sx={{
                    ...((latestPostLarge || latestPost) && {
                      zIndex: 9,
                      top: 24,
                      left: 24,
                      width: 40,
                      height: 40,
                    }),
                    cursor: "pointer",
                  }}
                />
              </HtmlTooltip>
              <StyledCover alt={title} src={thumbnail} />
            </StyledCardMedia>
            <CardContent
              sx={{
                pt: 4,
                ...((latestPostLarge || latestPost) && {
                  bottom: 0,
                  width: "100%",
                  position: "absolute",
                }),
              }}
            >
              <Typography gutterBottom variant="caption" sx={{ color: "text.disabled", display: "block" }}>
                {createdAt}
              </Typography>

              <LightTooltip title={title} placement="bottom-start" followCursor>
                <StyledTitle
                  onClick={() => props.onOpenContent(index)}
                  color="inherit"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    ...(latestPostLarge && { typography: "h5", height: 60 }),
                    ...((latestPostLarge || latestPost) && {
                      color: "common.white",
                    }),
                    cursor: "pointer",
                  }}
                >
                  {title}
                </StyledTitle>
              </LightTooltip>

              <StyledInfo>
                {POST_INFO.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: index === 0 ? 0 : 1.5,
                      ...((latestPostLarge || latestPost) && {
                        color: "grey.500",
                      }),
                    }}
                  >
                    <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                    {/* <Typography variant="caption">{fShortenNumber(info.number)}</Typography> */}
                    <Typography variant="caption">{info.number}</Typography>
                  </Box>
                ))}
              </StyledInfo>
            </CardContent>
          </Card>
        </Grid>
      </HtmlTooltipDark>

      {openModalDelete && (
        <Modal
          open={openModalDelete}
          onClose={handleCloseModalDelete}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 490, borderRadius: 2 }}>
            <h2 id="parent-modal-title">
              Bạn chắc chắn muốn <strong style={{ color: "red" }}>xóa</strong> {props.typeName} này?
            </h2>
            <hr />
            <Grid item xs={12}>
              <Card sx={{ position: "relative" }}>
                <StyledCardMedia
                  sx={{
                    pt: "calc(100% * 4 / 3)",
                    "&:after": {
                      top: 0,
                      content: "''",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    },
                    pt: {
                      xs: "calc(100% * 4 / 3)",
                      sm: "calc(100% * 3 / 4.66)",
                    },
                  }}
                >
                  <SvgColor
                    color="paper"
                    src="/assets/icons/shape-avatar.svg"
                    sx={{
                      width: 80,
                      height: 36,
                      zIndex: 9,
                      bottom: -15,
                      position: "absolute",
                      color: "background.paper",
                      display: "none",
                    }}
                  />
                  <HtmlTooltip
                    placement="bottom-start"
                    title={
                      <Fragment>
                        <Typography color="inherit">
                          <b>{creator.fullname}</b>
                        </Typography>
                        <em>{creator.email}</em>
                      </Fragment>
                    }
                    // arrow
                  >
                    <StyledAvatar
                      alt={creator.fullname}
                      src={creator.avatar}
                      sx={{
                        zIndex: 9,
                        top: 24,
                        left: 24,
                        width: 40,
                        height: 40,
                        cursor: "pointer",
                      }}
                    />
                  </HtmlTooltip>
                  <StyledCover alt={title} src={thumbnail} />
                </StyledCardMedia>
                <CardContent
                  sx={{
                    pt: 4,
                    bottom: 0,
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  <Typography gutterBottom variant="caption" sx={{ color: "text.disabled", display: "block" }}>
                    {createdAt}
                  </Typography>

                  <LightTooltip title={title} placement="bottom-start" followCursor>
                    <StyledTitle
                      onClick={() => props.onOpenContent(index)}
                      color="inherit"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        typography: "h5",
                        height: 60,
                        color: "common.white",
                        cursor: "pointer",
                      }}
                    >
                      {title}
                    </StyledTitle>
                  </LightTooltip>

                  <StyledInfo>
                    {POST_INFO.map((info, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: index === 0 ? 0 : 1.5,
                          color: "grey.500",
                        }}
                      >
                        <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                        <Typography variant="caption">{info.number}</Typography>
                      </Box>
                    ))}
                  </StyledInfo>
                </CardContent>
              </Card>
            </Grid>
            <p>
              <small>
                <i>
                  *Mẹo: Sau khi xóa, {props.typeName} sẽ được đưa đến mục <b>Đã xóa (Deleted)</b>, bạn có thể vào mục
                  này để khôi phục lại.
                </i>
              </small>
            </p>
            <hr />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{ marginRight: 2 }}
                size="medium"
                color="error"
                onClick={handleDeletePost}
                disabled={loadingModalDelete}
              >
                Xóa
              </Button>
              <Button variant="outlined" size="medium" onClick={handleCloseModalDelete} disabled={loadingModalDelete}>
                Hủy
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      {openModalActive && (
        <Modal
          open={openModalActive}
          onClose={handleCloseModalActive}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 490, borderRadius: 2 }}>
            <h2 id="parent-modal-title">
              Bạn chắc chắn muốn <strong style={{ color: "green" }}>duyệt</strong> {props.typeName} này?
            </h2>
            <hr />
            <Grid item xs={12}>
              <Card sx={{ position: "relative" }}>
                <StyledCardMedia
                  sx={{
                    pt: "calc(100% * 4 / 3)",
                    "&:after": {
                      top: 0,
                      content: "''",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    },
                    pt: {
                      xs: "calc(100% * 4 / 3)",
                      sm: "calc(100% * 3 / 4.66)",
                    },
                  }}
                >
                  <SvgColor
                    color="paper"
                    src="/assets/icons/shape-avatar.svg"
                    sx={{
                      width: 80,
                      height: 36,
                      zIndex: 9,
                      bottom: -15,
                      position: "absolute",
                      color: "background.paper",
                      display: "none",
                    }}
                  />
                  <HtmlTooltip
                    placement="bottom-start"
                    title={
                      <Fragment>
                        <Typography color="inherit">
                          <b>{creator.fullname}</b>
                        </Typography>
                        <em>{creator.email}</em>
                      </Fragment>
                    }
                    // arrow
                  >
                    <StyledAvatar
                      alt={creator.fullname}
                      src={creator.avatar}
                      sx={{
                        zIndex: 9,
                        top: 24,
                        left: 24,
                        width: 40,
                        height: 40,
                        cursor: "pointer",
                      }}
                    />
                  </HtmlTooltip>
                  <StyledCover alt={title} src={thumbnail} />
                </StyledCardMedia>
                <CardContent
                  sx={{
                    pt: 4,
                    bottom: 0,
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  <Typography gutterBottom variant="caption" sx={{ color: "text.disabled", display: "block" }}>
                    {createdAt}
                  </Typography>

                  <LightTooltip title={title} placement="bottom-start" followCursor>
                    <StyledTitle
                      onClick={() => props.onOpenContent(index)}
                      color="inherit"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        typography: "h5",
                        height: 60,
                        color: "common.white",
                        cursor: "pointer",
                      }}
                    >
                      {title}
                    </StyledTitle>
                  </LightTooltip>

                  <StyledInfo>
                    {POST_INFO.map((info, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: index === 0 ? 0 : 1.5,
                          color: "grey.500",
                        }}
                      >
                        <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                        <Typography variant="caption">{info.number}</Typography>
                      </Box>
                    ))}
                  </StyledInfo>
                </CardContent>
              </Card>
            </Grid>
            <p>
              <small>
                <i>
                  *Mẹo: Sau khi duyệt, {props.typeName} sẽ được đưa đến mục <b>Hiển thị (Show)</b>, bạn có thể vào mục
                  này để xóa hoặc chỉnh sửa {props.typeName}.
                </i>
              </small>
            </p>
            <hr />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{ marginRight: 2 }}
                size="medium"
                color="success"
                onClick={handleActivePost}
                disabled={loadingModalActive}
              >
                Duyệt
              </Button>
              <Button variant="outlined" size="medium" onClick={handleCloseModalActive} disabled={loadingModalActive}>
                Hủy
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      <Snackbar open={openAlertDelete} autoHideDuration={6000} onClose={handleCloseAlertDeleted}>
        <Alert onClose={handleCloseAlertDeleted} severity="success" sx={{ width: "100%", color: "#fff" }}>
          Xóa bài viết thành công!
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertActive} autoHideDuration={6000} onClose={handleCloseAlertActive}>
        <Alert onClose={handleCloseAlertActive} severity="success" sx={{ width: "100%", color: "#fff" }}>
          Duyệt bài viết thành công!
        </Alert>
      </Snackbar>
    </>
  );
}
