
import { Layout } from '@/components/layout/Layout';
import { CreatePostForm } from '@/components/community/CreatePostForm';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CreatePostPage = () => {
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
        <Button variant="outline" onClick={() => navigate('/community')} className="mb-4">
          &larr; Back to Community
        </Button>
        <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
        <CreatePostForm />
      </div>
    </Layout>
  );
};

export default CreatePostPage;
