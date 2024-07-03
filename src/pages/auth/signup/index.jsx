import SignUpForm from '../../../components/auth/signupForm';
import AuthLayout from '../../../layouts/authLayout';

function SignIn() {
  return (
    <>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}

export default SignIn;
