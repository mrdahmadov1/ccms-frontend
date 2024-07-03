import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CustomTextField from '../../reusable/customTextField';
import * as Yup from 'yup';
import { loginUser } from '../../../store/userSlice';
import { useAuthForm } from '../../../hooks/useAuthForm';

const SignInForm = () => {
  const { formik, status } = useAuthForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: {
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
    },
    onSubmitAction: loginUser,
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <CustomTextField id="email" name="email" label="Email Address" formik={formik} />
        <CustomTextField
          id="password"
          name="password"
          label="Password"
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
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignInForm;
