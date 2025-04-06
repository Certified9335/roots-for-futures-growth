
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { TreeForm } from '@/components/trees/TreeForm';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AddTreePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    navigate('/my-trees');
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Add a New Tree</h1>
        
        <TreeForm isSubmitting={isLoading} setIsSubmitting={setIsLoading} onSubmitSuccess={handleSuccess} />
      </div>
    </Layout>
  );
};

export default AddTreePage;
