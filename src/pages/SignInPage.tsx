
import { SignInForm } from '@/components/auth/SignInForm';
import { Layout } from '@/components/layout/Layout';

const SignInPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <SignInForm />
      </div>
    </Layout>
  );
};

export default SignInPage;
