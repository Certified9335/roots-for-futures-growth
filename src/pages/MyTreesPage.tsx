
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { TreeCard } from '@/components/trees/TreeCard';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Tree } from '@/types';
import { Plus } from 'lucide-react';

const MyTreesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view your trees.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }

    // Fetch user's trees
    const fetchTrees = async () => {
      try {
        const { data, error } = await supabase
          .from('trees')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setTrees(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching trees",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, [user, navigate, toast]);

  const handleAddTree = () => {
    navigate('/add-tree');
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Trees</h1>
          <Button onClick={handleAddTree} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Tree
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading trees...</p>
          </div>
        ) : trees.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">You haven't added any trees yet</h2>
            <p className="text-gray-600 mb-6">Start by adding a tree you've planted!</p>
            <Button onClick={handleAddTree} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Tree
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trees.map(tree => (
              <TreeCard 
                key={tree.id} 
                tree={tree} 
                showLikeButton={false}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyTreesPage;
