
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Tree, TreeLike, Profile } from '@/types';
import { MapPin, Calendar, Ruler, Edit, Trash, Heart, User } from 'lucide-react';
import { format } from 'date-fns';

const TreeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tree, setTree] = useState<Tree | null>(null);
  const [owner, setOwner] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTreeAndLikes = async () => {
      try {
        if (!id) return;
        
        // Fetch tree data
        const { data: treeData, error: treeError } = await supabase
          .from('trees')
          .select('*')
          .eq('id', id)
          .single();
          
        if (treeError) throw treeError;
        
        setTree(treeData);
        setIsOwner(user?.id === treeData.user_id);
        
        // Fetch tree owner profile
        const { data: ownerData, error: ownerError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', treeData.user_id)
          .single();
          
        if (!ownerError) {
          setOwner(ownerData);
        }
        
        // Count likes
        const { count, error: countError } = await supabase
          .from('tree_likes')
          .select('*', { count: 'exact', head: true })
          .eq('tree_id', id);
          
        if (!countError && count !== null) {
          setLikeCount(count);
        }
        
        // Check if current user has liked the tree
        if (user) {
          const { data: likeData, error: likeError } = await supabase
            .from('tree_likes')
            .select('*')
            .eq('tree_id', id)
            .eq('user_id', user.id)
            .maybeSingle();
            
          if (!likeError && likeData) {
            setIsLiked(true);
          }
        }
      } catch (error: any) {
        toast({
          title: "Error fetching tree",
          description: error.message,
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchTreeAndLikes();
  }, [id, user, navigate, toast]);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like trees.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }

    if (!tree) return;

    try {
      setIsLiking(true);

      if (isLiked) {
        // Unlike the tree
        const { error } = await supabase
          .from('tree_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('tree_id', tree.id);

        if (error) throw error;

        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        toast({
          title: "Unliked",
          description: "You've unliked this tree.",
        });
      } else {
        // Like the tree
        const { error } = await supabase
          .from('tree_likes')
          .insert({ user_id: user.id, tree_id: tree.id });

        if (error) throw error;

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        toast({
          title: "Liked!",
          description: "You've liked this tree.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleEdit = () => {
    if (!tree) return;
    navigate(`/trees/${tree.id}/edit`);
  };

  const handleDelete = async () => {
    if (!tree) return;
    
    if (!confirm("Are you sure you want to delete this tree? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      
      const { error } = await supabase
        .from('trees')
        .delete()
        .eq('id', tree.id);
        
      if (error) throw error;
      
      toast({
        title: "Tree deleted",
        description: "Your tree has been deleted successfully.",
      });
      
      navigate('/my-trees');
    } catch (error: any) {
      toast({
        title: "Error deleting tree",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading tree details...</p>
        </div>
      </Layout>
    );
  }

  if (!tree) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Tree not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
              &larr; Back
            </Button>
            <h1 className="text-3xl font-bold">{tree.name}</h1>
            <p className="text-muted-foreground text-lg">{tree.species}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {tree.image_url ? (
                <img 
                  src={tree.image_url} 
                  alt={tree.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-lg">No Image</span>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">About this tree</h2>
                <p className="text-gray-700">
                  {tree.description || `A ${tree.species} tree planted in ${tree.location}.`}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{tree.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Planted on {format(new Date(tree.planting_date), 'MMMM d, yyyy')}</span>
                </div>
                
                {tree.height_cm && (
                  <div className="flex items-center">
                    <Ruler className="mr-2 h-5 w-5 text-gray-500" />
                    <span>Height: {tree.height_cm} cm</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Planted by {owner?.full_name || 'Anonymous'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  onClick={handleLike} 
                  disabled={isLiking}
                  className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Liked" : "Like"} ({likeCount})
                </Button>
                
                {isOwner && (
                  <>
                    <Button variant="outline" onClick={handleEdit}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {tree.latitude && tree.longitude && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Tree Location</h2>
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <p>Map placeholder - Tree is located at {tree.latitude}, {tree.longitude}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TreeDetailPage;
