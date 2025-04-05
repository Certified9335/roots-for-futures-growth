
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Plus, User, Heart, MessageSquare, Image, Send } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['community_posts']['Row'] & {
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  }
};

type Comment = Database['public']['Tables']['comments']['Row'] & {
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  }
};

const Community = () => {
  const { user } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // Query for community posts
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['community-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Post[];
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load community posts. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  // Submit new post
  const handlePostSubmit = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to create a post.',
        variant: 'destructive',
      });
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter both a title and content for your post.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          title: newPostTitle.trim(),
          content: newPostContent.trim(),
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your post has been published.',
      });

      setNewPostTitle('');
      setNewPostContent('');
      setIsPostDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to publish your post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Community</h1>
              <p className="text-muted-foreground mt-1">
                Connect with fellow tree planters and share your experiences
              </p>
            </div>
            
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-forest-500 hover:bg-forest-600 mt-4 sm:mt-0">
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create a new post</DialogTitle>
                  <DialogDescription>
                    Share your tree planting journey or ask the community for advice
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <Input
                    placeholder="Post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="What's on your mind?"
                    className="min-h-[150px]"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" type="button">
                      <Image className="h-4 w-4 mr-2" /> Add Image
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsPostDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={handlePostSubmit} 
                    className="bg-forest-500 hover:bg-forest-600"
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  >
                    Post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <CommunityPost key={post.id} post={post} refetchPosts={refetch} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-medium mb-2">No community posts yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share your tree planting experience with the community
              </p>
              <Button 
                onClick={() => setIsPostDialogOpen(true)} 
                className="bg-forest-500 hover:bg-forest-600"
              >
                <Plus className="mr-2 h-4 w-4" /> Create First Post
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface CommunityPostProps {
  post: Post;
  refetchPosts: () => void;
}

const CommunityPost = ({ post, refetchPosts }: CommunityPostProps) => {
  const { user } = useAuth();
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const { data: comments, isLoading: loadingComments, refetch: refetchComments } = useQuery({
    queryKey: ['post-comments', post.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true });
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Comment[];
    },
    enabled: showComments,
  });

  const handleAddComment = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to comment.',
        variant: 'destructive',
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        description: 'Comment cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsCommenting(true);
      
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: user.id,
          content: commentText.trim()
        });

      if (error) throw error;

      setCommentText('');
      refetchComments();
      
      toast({
        description: 'Comment added successfully.',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add your comment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="px-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage 
              src={post.profiles?.avatar_url || undefined} 
              alt={post.profiles?.full_name || 'User'} 
            />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.profiles?.full_name || 'Anonymous'}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <h3 className="text-xl font-medium mb-2">{post.title}</h3>
        <p className="whitespace-pre-line">{post.content}</p>
        
        {post.image_url && (
          <div className="mt-4">
            <img 
              src={post.image_url} 
              alt="Post content" 
              className="rounded-md max-h-96 w-auto"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 pt-0 flex-col items-stretch">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>Like</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Comment</span>
            </Button>
          </div>
        </div>
        
        {showComments && (
          <div className="mt-4 space-y-4">
            <Separator />
            
            {loadingComments ? (
              <div className="py-4 flex justify-center">
                <Spinner size="sm" />
              </div>
            ) : comments && comments.length > 0 ? (
              <div className="space-y-4 py-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={comment.profiles?.avatar_url || undefined} 
                        alt={comment.profiles?.full_name || 'User'} 
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="bg-muted rounded-lg p-3">
                        <p className="font-medium text-sm">
                          {comment.profiles?.full_name || 'Anonymous'}
                        </p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No comments yet</p>
            )}
            
            <div className="flex gap-3 items-center">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt={user?.user_metadata?.full_name || 'User'} 
                />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..." 
                  className="flex-1"
                  disabled={!user || isCommenting}
                />
                <Button 
                  size="icon" 
                  onClick={handleAddComment}
                  disabled={!user || !commentText.trim() || isCommenting}
                  className="bg-forest-500 hover:bg-forest-600"
                >
                  {isCommenting ? (
                    <Spinner size="sm" className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Community;
