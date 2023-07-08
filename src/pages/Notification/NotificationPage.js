import { Helmet } from 'react-helmet-async';
// @mui
import { Badge, Box, Button, Container, Grid, LinearProgress, Stack, Tab, Tabs, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from 'src/api';
import { BlogPostCard, BlogPostsSort } from 'src/sections/@dashboard/blog';
import InfiniteScroll from 'react-infinite-scroll-component';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'new', label: 'Mới nhất' },
    { value: 'old', label: 'Cũ nhất' },
];

// ----------------------------------------------------------------------

export default function NotificationPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(1);
    const [posts, setPosts] = useState([]);
    const [apiNotificationUrl, setApiNotificationUrl] = useState('/notifications');
    const [order, setOrder] = useState('new');
    const [active, setActive] = useState(1);
    const [pendingStatus, setPendingStatus] = useState(true);

    useEffect(() => {
        handleFetchPosts();
    }, [order, active])

    useEffect(() => {
        handleFetchCountPending();
    }, [active])

    const handleFetchCountPending = () => {
        api.post('/admin/post/notification/pending-count')
            .then(({ data }) => {
                if (data.count > 0) {
                    setPendingStatus(false);
                } else {
                    setPendingStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleFetchPosts = () => {

        let activeStatus;
        switch (active) {
            case 0:
                activeStatus = 'wait'
                break;
            case 1:
                activeStatus = 'active'
                break;
            case 2:
                activeStatus = 'deleted'
                break;
            default:
                activeStatus = 'active'
                break;
        }

        api.post(apiNotificationUrl, {
            paginate: 7,
            order,
            active: activeStatus
        })
            .then(({ data }) => {
                setApiNotificationUrl(data.next_page_url);
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

    const handleNotificationSort = (e) => {
        setPosts([]);
        setOrder(e.target.value);
        setApiNotificationUrl('/notifications');
        setLoading(1);
    }

    const handleClickCreateNotification = () => {
        navigate('tao-moi');
    }
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleTabChange = (event, newValue) => {
        setPosts([]);
        setApiNotificationUrl('/notifications');
        setLoading(1);
        setActive(newValue);
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

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={active} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label={
                                <Badge invisible={pendingStatus} variant="dot" color="success">
                                    <Box>Pending</Box>
                                </Badge>
                            } {...a11yProps(0)} />
                            <Tab label="Show" {...a11yProps(1)} />
                            <Tab label="Deleted" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <BlogPostsSort options={SORT_OPTIONS} onSort={handleNotificationSort} defaultValue={order} />
                </Stack>
                {
                    posts.length === 0 && loading &&
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
                        <p style={{ textAlign: 'center', marginTop: 22 }}>
                            {
                                posts.length > 0
                                    ? <b>Đã hiển thị tất cả thông báo!</b>
                                    : <b>Hiện chưa có thông báo nào!</b>
                            }
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
