
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PostCard } from '@/components/community/PostCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { CommunityPost } from '@/types';
import { Plus } from 'lucide-react';

const CommunityPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all posts
        const { data, error } = await supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setPosts(data || []);
        
        // Get comment counts for each post
        if (data && data.length > 0) {
          const counts: Record<string, number> = {};
          
          for (const post of data) {
            const { count, error: countError } = await supabase
              .from('comments')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.id);
              
            if (!countError && count !== null) {
              counts[post.id] = count;
            }
          }
          
          setCommentCounts(counts);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching posts",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-gray-600">Connect with other tree enthusiasts</p>
          </div>
          <Button onClick={() => navigate('/community/new')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No posts yet</h2>
            <p className="text-gray-600 mb-6">Be the first to share something with the community!</p>
            <Button onClick={() => navigate('/community/new')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create First Post
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                commentCount={commentCounts[post.id] || 0}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CommunityPage;
