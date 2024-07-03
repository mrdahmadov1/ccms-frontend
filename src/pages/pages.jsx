import Signin from './auth/signin';
import Signup from './auth/signup';

const pages = [
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
