import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PostPage from './pages/Post/PostPage';
import PostCreatePage from './pages/Post/PostCreatePage';
import NotificationPage from './pages/Notification/NotificationPage';
import NotificationCreate from './pages/Notification/NotificationCreate';
import PostEditPage from './pages/Post/PostEditPage';
import NotificationEditPage from './pages/Notification/NotificationEditPage';
import TestPage from './pages/TestPage';
import ApprovalGoodStudent from './pages/GoodStudent/ApprovalGoodStudent';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'bai-viet', element: <PostPage /> },
        { path: 'bai-viet/dang-bai', element: <PostCreatePage /> },
        { path: 'bai-viet/edit/:slug', element: <PostEditPage /> },
        { path: 'thong-bao', element: <NotificationPage /> },
        { path: 'thong-bao/tao-moi', element: <NotificationCreate /> },
        { path: 'thong-bao/edit/:slug', element: <NotificationEditPage /> },
        { path: 'xet-sinh-vien-5-tot', element: <ApprovalGoodStudent /> },
        { path: 'test', element: <TestPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
        { path: '*', element: <Page404 /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
