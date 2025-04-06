
import { TreeForm } from '@/components/trees/TreeForm';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddTreePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Tree</h1>
        <TreeForm onSuccess={() => navigate('/my-trees')} />
      </div>
    </Layout>
  );
};

export default AddTreePage;
