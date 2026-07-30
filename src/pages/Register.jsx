import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our community of donors and volunteers. Create your account to manage donations and participate in campaigns."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;