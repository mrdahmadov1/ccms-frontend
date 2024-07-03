import Signin from './auth/signin';
import Signup from './auth/signup';
import Admin from './main/admin';
import Dashboard from './main/dashboard';

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
];

export default pages;
