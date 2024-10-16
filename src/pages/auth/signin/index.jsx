import SignInForm from '../../../components/auth/signinForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkLogin } from '../../../store/userSlice';

function SignIn() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkLogin());
    if (user && isLoggedIn) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'user') navigate('/');
    }
  }, [isLoggedIn, user, navigate, dispatch]);

  return (
    <>
      <SignInForm />
    </>
  );
}

export default SignIn;
