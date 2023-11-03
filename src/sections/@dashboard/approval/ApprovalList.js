import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, LinearProgress, Slide, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ApprovalCard from "./ApprovalCard";
import { useStateContext } from "src/contexts/ContextProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import CancelIcon from '@mui/icons-material/Cancel';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledApprovalImg = styled('img')({
  top: 0,
  width: '15rem',
  height: '20rem',
  objectFit: 'cover',
});

const requirementCriterias = [
  'Đạo đức tốt',
  'Học tập tốt',
  'Thể lực tốt',
  'Tình nguyện tốt',
  'Hội nhập tốt'
];

export default function ApprovalList({ approvalId }) {
  const [active, setActive] = useState(0);
  const [approvalRequestList, setApprovalRequestList] = useState([]);
  const [indexApprovalRequest, setIndexApprovalRequest] = useState(0);
  const [approvalRequestListApiUrl, setApprovalRequestListApiUrl] = useState();
  const [loading, setLoading] = useState(1);
  const [openDialogApprovalRequestDetail, setOpenDialogApprovalRequestDetail] = useState(false);
  const [dialogApprovalRequestFullScreen, setDialogApprovalRequestFullScreen] = useState(true);
  const { axiosApi } = useStateContext();

  useEffect(() => {
    setApprovalRequestList([]);
    setApprovalRequestListApiUrl('/admin/approval/request');
    handleGetApprovalRequestList();
    setLoading(1);
  }, [active, approvalId])

  const handleTabChange = (event, newValue) => {
    setApprovalRequestList([]);
    setApprovalRequestListApiUrl('/admin/approval/request');
    setLoading(1);
    setActive(newValue);
  };

  const handleDialogApprovalRequestFullScreen = () => {
    setDialogApprovalRequestFullScreen(prev => !prev);
  }

  const handleGetApprovalRequestList = () => {
    let orderApprovalRequestList = 'await_approved';
    switch (active) {
      case 0:
        orderApprovalRequestList = 'await_approved';
        break;
      case 1:
        orderApprovalRequestList = 'approved';
        break;
      case 2:
        orderApprovalRequestList = 'not_approved';
        break;
      default:
        orderApprovalRequestList = 'await_approved';
        break;
    }
    axiosApi.post(!!approvalRequestListApiUrl ? approvalRequestListApiUrl : '/admin/approval/request', {
      order: orderApprovalRequestList,
      paginate: 8,
      approval_id: approvalId
    }).then(({ data }) => {
      const approvals = data.data;
      setApprovalRequestListApiUrl(data.next_page_url);
      setApprovalRequestList(prev => [...prev, ...approvals]);
      if (!data.next_page_url) {
        setLoading(null);
      }
    }).catch((err) => {
      console.log(err);
    });
  }; 

  const handleOpenDialogApprovalRequestDetail = (index) => {
    setIndexApprovalRequest(index);
    setOpenDialogApprovalRequestDetail(true);
  };

  const handleCommentRequestFile = (id, inputCommentId) => {
    const comment = document.getElementById(inputCommentId).value;
    if (comment) {
      axiosApi.post('/admin/approval/comment', {
        file_id: id,
        comment
      }).then(({ data }) => {
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  const handleCloseDialogApprovalRequestDetail = () => {
    setOpenDialogApprovalRequestDetail(false);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={active} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Chờ duyệt" {...a11yProps(0)} />
            <Tab label="Đã duyệt" {...a11yProps(1)} />
            <Tab label="Đã xóa" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/* <BlogPostsSort options={SORT_OPTIONS} onSort={handlePostSort} defaultValue={order} /> */}
      </Stack>
      {approvalRequestList.length === 0 && loading && <LinearProgress color="inherit" />}
      <InfiniteScroll
        dataLength={approvalRequestList.length}
        next={handleGetApprovalRequestList}
        hasMore={loading}
        hasChildren={1}
        loader={
          <p style={{ textAlign: "center" }}>
            <LinearProgress color="inherit" />
          </p>
        }
        endMessage={
          <p style={{ textAlign: "center", marginTop: 22 }}>
            {approvalRequestList.length > 0 ? <b>Đã hiển thị tất cả yêu cầu!</b> : <b>Hiện chưa có yêu cầu xét duyệt nào!</b>}
          </p>
        }
      >
        <Grid container spacing={3}>
          {approvalRequestList.map((approval, index) => (
            <Grid key={approval.id} item xs={12} sm={6} md={3} onClick={() => handleOpenDialogApprovalRequestDetail(index)}>
              <ApprovalCard approval={approval} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {approvalRequestList.length > 0 && openDialogApprovalRequestDetail && (
        <Dialog
          fullWidth={true}
          scroll={"body"}
          maxWidth="xl"
          fullScreen={dialogApprovalRequestFullScreen}
          open={openDialogApprovalRequestDetail}
          onClose={handleCloseDialogApprovalRequestDetail}
          TransitionComponent={Transition}
        >
          <DialogActions>
            {
              dialogApprovalRequestFullScreen && <FullscreenExitIcon sx={{cursor: "pointer"}} titleAccess="fullscreen exit" onClick={handleDialogApprovalRequestFullScreen} />
            }
            {
              !dialogApprovalRequestFullScreen && <FullscreenIcon sx={{cursor: "pointer"}} titleAccess="fullscreen" onClick={handleDialogApprovalRequestFullScreen} />
            }
            <CancelIcon onClick={handleCloseDialogApprovalRequestDetail} titleAccess="exit" sx={{color: "red", cursor: "pointer"}} />
          </DialogActions>
          <DialogContent dividers={false}>
            <Stack direction="row">
              <Stack maxWidth="15rem">
                <StyledApprovalImg src={approvalRequestList[indexApprovalRequest].request_sender.avatar} />
                <Typography color="inherit" mt={2}>
                  Họ tên: <b style={{fontSize: "1.2rem"}}>{approvalRequestList[indexApprovalRequest].request_sender.fullname}</b>
                </Typography>
                <Divider sx={{margin: '4px 0'}} />
                <Typography color="inherit">
                  Lớp: <b>{approvalRequestList[indexApprovalRequest].request_sender.class_info.code}</b>
                </Typography>
                <small><em>({approvalRequestList[indexApprovalRequest].request_sender.class_info.name})</em></small>
                <Typography color="inherit">
                  Mssv: <b>{approvalRequestList[indexApprovalRequest].request_sender.stu_code}</b>
                </Typography>
                <Divider sx={{margin: '4px 0'}} />
                <Typography color="inherit">
                  SĐT: <b>{approvalRequestList[indexApprovalRequest].request_sender.phone}</b>
                </Typography>
                <Typography color="inherit" noWrap title={approvalRequestList[indexApprovalRequest].request_sender.email}>
                  Email: <b>{approvalRequestList[indexApprovalRequest].request_sender.email}</b>
                </Typography>
              </Stack>
              <Stack px={2} maxHeight="100vh" overflow="auto" flex={1}>
                {
                  Object.values(approvalRequestList[indexApprovalRequest].require_detail_is_send).map((approvalRequest, index) => {
                    return (
                      <>
                        <Typography color="inherit" fontWeight={800} position="sticky">
                          {index + 1}. {requirementCriterias[index]}
                        </Typography>
                        {approvalRequest.map((approvalRequestFile) => 
                          <Accordion defaultExpanded={false} sx={{display: 'block'}} key={"filelist-" + approvalRequestFile.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{minWidth: '100%'}}>
                              <Typography fontSize="1rem"  fontWeight="500">
                                {approvalRequestFile.file_name}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <DialogContentText
                                component="div"
                                className="ck-content"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                              >
                                <embed src={approvalRequestFile.file_url} width="70%" style={{minWidth: '600px', minHeight: '80vh', border: "1px solid #ccc", borderRadius: ".3rem"}} height="860px" />
                                <FormControl sx={{minWidth: '600px', width: '70%', marginTop: '.4rem'}} variant="standard">
                                  <InputLabel htmlFor={"comment-" + approvalRequestFile.id}>Nhận xét minh chứng trên (nếu có)</InputLabel>
                                    <Input
                                      id={"comment-" + approvalRequestFile.id}
                                      variant="standard"
                                      defaultValue={approvalRequestFile.comment}
                                      endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={(e) => handleCommentRequestFile(approvalRequestFile.id, "comment-" + approvalRequestFile.id)}
                                            // onMouseDown={handleMouseDownPassword}

                                          >
                                            <ArrowCircleRightOutlinedIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      }
                                    />
                                </FormControl>
                              </DialogContentText>
                            </AccordionDetails>
                          </Accordion>
                        )}
                      </>
                    )
                  })
                }
                
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>


  );
}
