import Signin from './auth/signin';
import Signup from './auth/signup';
import Dashboard from './main/dashboard';

const pages = [
  {
    path: '/',
    element: <Dashboard />,
    title: 'Dashboard',
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
