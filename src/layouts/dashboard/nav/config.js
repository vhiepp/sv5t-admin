// component
import SvgColor from '../../../components/svg-color';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import ChecklistTwoToneIcon from '@mui/icons-material/ChecklistTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Bài viết',
    path: '/dashboard/bai-viet',
    icon: <PostAddTwoToneIcon />,
  },
  {
    title: 'Thông báo',
    path: '/dashboard/thong-bao',
    icon: <NotificationsActiveTwoToneIcon />,
  },
  {
    title: 'Xét SV5T',
    path: '/dashboard/xet-sinh-vien-5-tot',
    icon: <ChecklistTwoToneIcon />,
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
];

export default navConfig;
