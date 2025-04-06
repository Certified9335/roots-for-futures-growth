
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommunityPost, Profile } from '@/types';
import { MessageSquare, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

interface PostCardProps {
  post: CommunityPost;
  commentCount?: number;
}

export function PostCard({ post, commentCount = 0 }: PostCardProps) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', post.user_id)
          .single();
          
        if (data) {
          setAuthor(data);
        }
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };

    fetchAuthor();
  }, [post.user_id]);

  const handleClick = () => {
    navigate(`/community/${post.id}`);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col cursor-pointer" onClick={handleClick}>
      {post.image_url && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="truncate">{post.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>By {author?.full_name || 'Anonymous'}</span>
          <span className="mx-2">•</span>
          <Calendar className="mr-1 h-4 w-4" />
          <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex items-center text-sm text-muted-foreground">
          <MessageSquare className="mr-1 h-4 w-4" />
          <span>{commentCount} comments</span>
        </div>
      </CardFooter>
    </Card>
  );
}
