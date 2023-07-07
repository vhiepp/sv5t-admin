import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography, LinearProgress, Tooltip } from '@mui/material';
// components
import InfiniteScroll from 'react-infinite-scroll-component';
import { Fragment, useEffect, useState } from 'react';
import Iconify from '../../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
// mock
import api from '../../api';
import LoadingSpinner from '../../components/spinner';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'new', label: 'Mới nhất' },
  { value: 'old', label: 'Cũ nhất' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(1);
  const [posts, setPosts] = useState([]);
  const [apiBlogUrl, setApiBlogUrl] = useState('/blogs');
  const [order, setOrder] = useState('new');

  useEffect(() => {
    handleFetchPosts();
  }, [order])

  const handleFetchPosts = () => {
    api.post(apiBlogUrl, {
      paginate: 7,
      order,
    })
      .then(({ data }) => {
        setApiBlogUrl(data.next_page_url);
        setPosts([
          ...posts,
          ...data.data
        ]);
        if (!data.next_page_url) {
          setLoading(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleBlogSort = (e) => {
    setPosts([]);
    setOrder(e.target.value);
    setApiBlogUrl('/blogs');
    setLoading(1);
  }

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

        <Stack mb={5} direction="row" alignItems="center" justifyContent="end">
          {/* <BlogPostsSearch posts={POSTS} /> */}
          <BlogPostsSort options={SORT_OPTIONS} onSort={handleBlogSort} defaultValue={order} />
        </Stack>
        {
          posts.length === 0 &&
          <LinearProgress color="inherit" />
        }
        <InfiniteScroll
          dataLength={posts.length}
          next={handleFetchPosts}
          hasMore={loading}
          hasChildren={1}
          loader={
            <p style={{ textAlign: 'center' }}>
              <LinearProgress color="inherit" />
            </p>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Đã hiển thị tất cả bài viết!</b>
            </p>
          }
        >
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <BlogPostCard key={index} post={post} index={index} />
            ))}
          </Grid>
        </InfiniteScroll>

      </Container>
    </>
  );
}
