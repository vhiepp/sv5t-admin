import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { BlogPostCard, BlogPostsSort } from "../blog";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment, useEffect, useState } from "react";
import { useStateContext } from "src/contexts/ContextProvider";
import "./style-content-ckeditor.css";
import Iconify from "src/components/iconify/Iconify";
import HtmlTooltip from "src/components/tooltip/HTMLToolTip";
import CommentList from "./CommentList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SORT_OPTIONS = [
  { value: "new", label: "Mới nhất" },
  { value: "old", label: "Cũ nhất" },
];

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

function ItemInfo({ icon, number }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 1.5,
      }}
    >
      <Iconify icon={icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
      <Typography variant="caption">{number}</Typography>
    </Box>
  );
}

export default function PostList({ type, url, typeName }) {
  const [active, setActive] = useState(1);
  const [posts, setPosts] = useState([]);
  const [apiPostUrl, setApiPostUrl] = useState(`/${type}`);
  const [order, setOrder] = useState("new");
  const [loading, setLoading] = useState(1);
  const [pendingStatus, setPendingStatus] = useState(true);
  const [openDialogPostContent, setOpenDialogPostContent] = useState(false);
  const [indexPostDialogContent, setIndexPostDialogContent] = useState(0);
  const { axiosApi } = useStateContext();

  useEffect(() => {
    handleFetchPosts();
  }, [order, active]);

  useEffect(() => {
    handleFetchCountPending();
  }, [active]);

  const handleFetchCountPending = () => {
    axiosApi
      .post(`/admin/forum/${type}/pending-count`)
      .then(({ data }) => {
        if (data.count > 0) {
          setPendingStatus(false);
        } else {
          setPendingStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetchPosts = () => {
    let activeStatus;
    switch (active) {
      case 0:
        activeStatus = "wait";
        break;
      case 1:
        activeStatus = "active";
        break;
      case 2:
        activeStatus = "deleted";
        break;
      default:
        activeStatus = "active";
        break;
    }

    axiosApi
      .post(apiPostUrl, {
        paginate: 7,
        order,
        active: activeStatus,
      })
      .then(({ data }) => {
        setApiPostUrl(data.next_page_url);
        setPosts([...posts, ...data.data]);
        if (!data.next_page_url) {
          setLoading(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTabChange = (event, newValue) => {
    setPosts([]);
    setApiPostUrl(`/${type}`);
    setLoading(1);
    setActive(newValue);
  };

  const handlePostSort = (e) => {
    setPosts([]);
    setOrder(e.target.value);
    setApiPostUrl(`/${type}`);
    setLoading(1);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleDeletedPost = (index) => {
    let newPost = [...posts];
    newPost.splice(index, 1);
    setPosts(newPost);
  };

  const handleOpenDialogPostContent = (index) => {
    setIndexPostDialogContent(index);
    setOpenDialogPostContent(true);
  };

  const handleCloseDialogPostContent = () => {
    setOpenDialogPostContent(false);
  };

  return (
    <>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={active} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab
              label={
                <Badge invisible={pendingStatus} variant="dot" color="success">
                  <Box>Pending</Box>
                </Badge>
              }
              {...a11yProps(0)}
            />
            <Tab label="Show" {...a11yProps(1)} />
            <Tab label="Deleted" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <BlogPostsSort options={SORT_OPTIONS} onSort={handlePostSort} defaultValue={order} />
      </Stack>
      {posts.length === 0 && loading && <LinearProgress color="inherit" />}
      <InfiniteScroll
        dataLength={posts.length}
        next={handleFetchPosts}
        hasMore={loading}
        hasChildren={1}
        loader={
          <p style={{ textAlign: "center" }}>
            <LinearProgress color="inherit" />
          </p>
        }
        endMessage={
          <p style={{ textAlign: "center", marginTop: 22 }}>
            {posts.length > 0 ? <b>Đã hiển thị tất cả bài viết!</b> : <b>Hiện chưa có bài viết nào!</b>}
          </p>
        }
      >
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard
              key={index}
              typeName={typeName}
              post={post}
              index={index}
              onDeleted={handleDeletedPost}
              url={url}
              active={active}
              onOpenContent={handleOpenDialogPostContent}
            />
          ))}
        </Grid>
      </InfiniteScroll>
      {openDialogPostContent && (
        <Dialog
          fullWidth={true}
          scroll={"body"}
          maxWidth="md"
          open={openDialogPostContent}
          onClose={handleCloseDialogPostContent}
        >
          <DialogContent dividers={false}>
            <h1>{posts[indexPostDialogContent].title || ""}</h1>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "grey.500",
              }}
            >
              <Iconify icon="ion:calendar" sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption">
                {`${posts[indexPostDialogContent].created_time.date} ${posts[indexPostDialogContent].created_time.time}`}
              </Typography>
            </Box>
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography fontSize=".8rem" fontWeight="500">
                  Nội dung
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontWeight="600">{posts[indexPostDialogContent].description}</Typography>
                <DialogContentText
                  component="div"
                  dangerouslySetInnerHTML={{ __html: posts[indexPostDialogContent].content }}
                  className="ck-content"
                ></DialogContentText>
              </AccordionDetails>
            </Accordion>
            <StyledInfo sx={{ mr: 2 }}>
              <ItemInfo icon="ph:heart-fill" number={posts[indexPostDialogContent].hearts.count} />
              <ItemInfo icon="mingcute:comment-fill" number={posts[indexPostDialogContent].comments.count} />
              <ItemInfo icon="eva:share-fill" number={0} />
            </StyledInfo>
            <Divider sx={{ my: 2 }} />
            <Typography component="h2" fontWeight="600">
              Bình luận:
            </Typography>
            <CommentList comments={posts[indexPostDialogContent].comments.data} />
            <Divider sx={{ mt: 1 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogPostContent}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
