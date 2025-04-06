
import { Layout } from '@/components/layout/Layout';
import { SponsorshipForm } from '@/components/sponsorship/SponsorshipForm';

const SponsorshipPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Sponsor a Tree</h1>
        <div className="max-w-3xl mx-auto">
          <SponsorshipForm />
        </div>
      </div>
    </Layout>
  );
};

export default SponsorshipPage;
