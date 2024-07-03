import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CustomTextField from '../../reusable/customTextField';
import * as Yup from 'yup';
import { registerUser } from '../../../store/userSlice';
import { useAuthForm } from '../../../hooks/useAuthForm';

const SignUpForm = () => {
  const { formik, status } = useAuthForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: {
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    },
    onSubmitAction: registerUser,
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <CustomTextField id="name" name="name" label="Full Name" formik={formik} />
        <CustomTextField id="email" name="email" label="Email Address" formik={formik} />
        <CustomTextField
          id="password"
          name="password"
          label="Password"
          type="password"
          formik={formik}
        />
        <CustomTextField
          id="passwordConfirm"
          name="passwordConfirm"
          label="Password Confirm"
          type="password"
          formik={formik}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3, mb: 2 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing up...' : 'Sign up'}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/signin" variant="body2">
              {'Already have an account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpForm;
