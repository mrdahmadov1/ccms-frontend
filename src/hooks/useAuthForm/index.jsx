import { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export const useAuthForm = ({ initialValues, validationSchema, onSubmitAction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      dispatch(onSubmitAction(values));
    },
  });

  const handleSuccess = useCallback(() => {
    if (status === 'success' && user) {
      formik.resetForm();
      navigate('/');
    }
  }, [formik, status, user, navigate]);

  const handleError = useCallback(() => {
    if (error) {
      // Handle error (e.g., show toast)
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
