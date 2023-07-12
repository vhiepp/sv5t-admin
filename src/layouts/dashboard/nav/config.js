// component
import SvgColor from '../../../components/svg-color';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';

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
    icon: icon('ic_blog'),
  },
  {
    title: 'Thông báo',
    path: '/dashboard/thong-bao',
    icon: <NotificationsActiveTwoToneIcon />,
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
