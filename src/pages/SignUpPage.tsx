
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Layout } from '@/components/layout/Layout';

const SignUpPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <SignUpForm />
      </div>
    </Layout>
  );
};

export default SignUpPage;
