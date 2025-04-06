
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { TreeForm } from '@/components/trees/TreeForm';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Tree } from '@/types';

const EditTreePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tree, setTree] = useState<Tree | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        if (!id) {
          setError("Tree ID is missing");
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('trees')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (!data) {
          setError("Tree not found");
          setIsLoading(false);
          return;
        }

        // Check if the tree belongs to the current user
        if (data.user_id !== user?.id) {
          setError("You don't have permission to edit this tree");
          setIsLoading(false);
          return;
        }

        setTree(data as Tree);
      } catch (error: any) {
        console.error("Error fetching tree:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTree();
  }, [id, user]);

  const handleSuccess = () => {
    navigate('/my-trees');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !tree) {
    return (
      <Layout>
        <div className="container py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Failed to load tree data"}</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button onClick={() => navigate('/my-trees')}>Return to My Trees</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Tree</h1>
        
        <TreeForm 
          treeData={tree} 
          isSubmitting={isSubmitting} 
          setIsSubmitting={setIsSubmitting} 
          onSubmitSuccess={handleSuccess} 
          isEditing={true} 
        />
      </div>
    </Layout>
  );
};

export default EditTreePage;
