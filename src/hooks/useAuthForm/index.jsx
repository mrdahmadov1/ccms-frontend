import { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useAuthForm = ({ initialValues, validationSchema, onSubmitAction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(onSubmitAction(values));
    },
  });

  const handleSuccess = useCallback(() => {
    if (status === 'success' && user) {
      formik.resetForm();
      switch (user.role) {
        case 'user':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          // For Other Roles Handling
          break;
      }
    }
  }, [formik, status, user, navigate]);

  const handleError = useCallback(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    handleSuccess();
  }, [handleSuccess]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  return {
    formik,
    status,
  };
};
