import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, IconButton } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import { Fragment } from 'react';
import HtmlTooltip from 'src/components/tooltip/HTMLToolTip';
import LightTooltip from 'src/components/tooltip/LightTooltip';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import TaskTwoToneIcon from '@mui/icons-material/TaskTwoTone';

import HtmlTooltipDark from 'src/components/tooltip/HTMLToolTipDark';
import DarkTooltip from 'src/components/tooltip/DarkTooltip';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index, url }) {

  const { thumbnail, title, creator } = post;
  const createdAt = `${post.created_time.date} ${post.created_time.time}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const navigate = useNavigate()

  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];

  const POST_INFO = [
    { number: 0, icon: 'eva:message-circle-fill' },
    { number: 0, icon: 'eva:eye-fill' },
    { number: 0, icon: 'eva:share-fill' },
  ];

  const handleClickEditPost = () => {
    navigate(`${url.edit}/${post.slug}`);
  }

  return (
    <>
      <HtmlTooltipDark
        placement="bottom-end"
        title={
          <Fragment>
            <DarkTooltip title="Duyệt" placement="bottom-start" followCursor>
              <IconButton aria-label="active" size="large" >
                <TaskTwoToneIcon color='success' />
              </IconButton>
            </DarkTooltip>
            <DarkTooltip title="Sửa" placement="bottom-start" followCursor>
              <IconButton aria-label="delete" size="large" onClick={handleClickEditPost} >
                <ModeEditOutlineTwoToneIcon color='info' />
              </IconButton>
            </DarkTooltip>
            <DarkTooltip title="Xóa" placement="bottom-start" followCursor>
              <IconButton aria-label="edit" size="large" >
                <DeleteTwoToneIcon color='error' />
              </IconButton>
            </DarkTooltip>
          </Fragment>
        }
        arrow
      >
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
          <Card sx={{ position: 'relative' }} >
            <StyledCardMedia
              sx={{
                ...((latestPostLarge || latestPost) && {
                  pt: 'calc(100% * 4 / 3)',
                  '&:after': {
                    top: 0,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  },
                }),
                ...(latestPostLarge && {
                  pt: {
                    xs: 'calc(100% * 4 / 3)',
                    sm: 'calc(100% * 3 / 4.66)',
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
                  position: 'absolute',
                  color: 'background.paper',
                  ...((latestPostLarge || latestPost) && { display: 'none' }),
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
                    cursor: "pointer"
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
                  width: '100%',
                  position: 'absolute',
                }),
              }}
            >
              <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                {createdAt}
              </Typography>

              <LightTooltip
                title={title}
                placement="bottom-start"
                followCursor
              >

                <StyledTitle
                  color="inherit"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    ...(latestPostLarge && { typography: 'h5', height: 60 }),
                    ...((latestPostLarge || latestPost) && {
                      color: 'common.white',
                    }),
                    cursor: "pointer"
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
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                      ...((latestPostLarge || latestPost) && {
                        color: 'grey.500',
                      }),
                    }}
                  >
                    <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                    <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                  </Box>
                ))}
              </StyledInfo>
            </CardContent>
          </Card>
        </Grid>
      </HtmlTooltipDark>
    </>
  );
}
