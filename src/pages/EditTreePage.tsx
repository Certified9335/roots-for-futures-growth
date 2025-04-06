
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TreeForm } from '@/components/trees/TreeForm';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Tree } from '@/types';

const EditTreePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tree, setTree] = useState<Tree | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const fetchTree = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabase
          .from('trees')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        // Check if this tree belongs to the current user
        if (data.user_id !== user.id) {
          toast({
            title: "Unauthorized",
            description: "You can only edit your own trees.",
            variant: "destructive",
          });
          navigate('/my-trees');
          return;
        }
        
        setTree(data);
      } catch (error: any) {
        toast({
          title: "Error fetching tree",
          description: error.message,
          variant: "destructive",
        });
        navigate('/my-trees');
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [id, user, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading tree data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Tree</h1>
        {tree && (
          <TreeForm 
            tree={tree} 
            onSuccess={() => navigate('/my-trees')} 
          />
        )}
      </div>
    </Layout>
  );
};

export default EditTreePage;
