import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// components
import { Fragment } from 'react';
import HtmlTooltipDark from 'src/components/tooltip/HTMLToolTipDark';

// ----------------------------------------------------------------------

const StyledApprovalImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ApprovalCard.propTypes = {
  approval: PropTypes.object,
};

export default function ApprovalCard({ approval }) {
  const { request_sender, created_time } = approval;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledApprovalImg alt={request_sender.fullname} src={request_sender.avatar} />
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <HtmlTooltipDark
          placement="bottom-start"
          title={
            <Fragment>
              <Typography color="inherit" noWrap>
                <b>{request_sender.fullname}</b>
              </Typography>
              <hr />
              <Typography color="inherit" noWrap>
                lớp: <b>{request_sender.class_info?.code}</b>
              </Typography>
              (<em>{request_sender.class_info?.name}</em>)
              <Typography color="inherit">
                mssv: <b>{request_sender.stu_code}</b>
              </Typography>
              <hr />
              <Typography color="inherit">
                email: <b>{request_sender.email}</b>
              </Typography>
            </Fragment>
          }
          // arrow
        >
          <Link color="inherit" underline="hover" sx={{cursor: 'pointer'}}>
            <Typography variant="subtitle1" noWrap>
              {request_sender.fullname}
            </Typography>
          </Link>
        </HtmlTooltipDark>
        <small style={{marginTop: 1}}>
          <i>
            Mssv: {request_sender.stu_code} <br />
          </i>
          <b style={{marginTop: 3, display: 'block'}}>
            Đã gửi 5 file đính kèm
          </b>
          <i>Ngày gửi: {created_time.date} {created_time.time}</i>
        </small>
      </Stack>
    </Card>
  );
}
