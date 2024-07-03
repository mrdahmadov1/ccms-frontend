import Signin from './auth/signin';
import Signup from './auth/signup';
import Admin from './main/admin';
import Dashboard from './main/dashboard';
import NotFoundPage from '../../404';

const pages = [
  {
    path: '/',
    element: <Dashboard />,
    title: 'Dashboard',
  },
  {
    path: '/admin',
    element: <Admin />,
    title: 'Admin',
  },
  {
    path: '/signin',
    element: <Signin />,
    title: 'Sign in',
  },
  {
    path: '/signup',
    element: <Signup />,
    title: 'Sign up',
  },
  {
    path: '*',
    element: <NotFoundPage />,
    title: '404 Not Found',
  },
];

export default pages;
