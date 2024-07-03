import SignInForm from '../../../components/auth/signinForm';
import AuthLayout from '../../../layouts/authLayout';

function SignIn() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}

export default SignIn;
