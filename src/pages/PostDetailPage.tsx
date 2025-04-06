
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CommentItem } from '@/components/community/CommentItem';
import { AddCommentForm } from '@/components/community/AddCommentForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { CommunityPost, Comment, Profile } from '@/types';
import { format } from 'date-fns';
import { Trash, Edit, Calendar } from 'lucide-react';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [author, setAuthor] = useState<Profile | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      if (!id) return;
      
      // Fetch post data
      const { data: postData, error: postError } = await supabase
        .from('community_posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (postError) throw postError;
      
      setPost(postData);
      setIsOwner(user?.id === postData.user_id);
      
      // Fetch post author profile
      const { data: authorData, error: authorError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', postData.user_id)
        .single();
        
      if (!authorError) {
        setAuthor(authorData);
      }
      
      // Fetch post comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
        
      if (!commentsError) {
        setComments(commentsData || []);
      }
      
    } catch (error: any) {
      toast({
        title: "Error fetching post",
        description: error.message,
        variant: "destructive",
      });
      navigate('/community');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, user, navigate, toast]);

  const handleRefreshComments = () => {
    fetchData();
  };

  const handleDelete = async () => {
    if (!post) return;
    
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', post.id);
        
      if (error) throw error;
      
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully.",
      });
      
      navigate('/community');
    } catch (error: any) {
      toast({
        title: "Error deleting post",
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
          <p>Loading post...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Post not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="outline" onClick={() => navigate('/community')} className="mb-4">
            &larr; Back to Community
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {post.image_url && (
              <div className="w-full h-80">
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <span>By {author?.full_name || 'Anonymous'}</span>
                <span className="mx-2">•</span>
                <Calendar className="mr-1 h-4 w-4" />
                <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="whitespace-pre-line">{post.content}</p>
              </div>
              
              {isOwner && (
                <div className="flex gap-4 mb-6 pt-4 border-t">
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Comments ({comments.length})
            </h2>
            
            <div className="mb-8">
              {comments.length === 0 ? (
                <p className="text-gray-500 mb-8">No comments yet. Be the first to comment!</p>
              ) : (
                <div className="space-y-2">
                  {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </div>
            
            <AddCommentForm 
              postId={post.id} 
              onCommentAdded={handleRefreshComments} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
