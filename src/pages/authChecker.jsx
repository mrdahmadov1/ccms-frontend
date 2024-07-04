import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkLogin } from '../store/userSlice';
import NotFoundPage from '../../404';

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  if (!isLoggedIn && !user) {
    return <Navigate to="/signin" />;
  }

  if (
    (user?.role === 'user' && location.pathname.startsWith('/admin')) ||
    (user?.role === 'admin' && !location.pathname.includes('admin'))
  ) {
    return <NotFoundPage />;
  }

  return children;
};

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthChecker;
