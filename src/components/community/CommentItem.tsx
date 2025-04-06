
import { useState, useEffect } from 'react';
import { Comment, Profile } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const [author, setAuthor] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', comment.user_id)
          .single();
          
        if (data) {
          setAuthor(data);
        }
      } catch (error) {
        console.error('Error fetching comment author:', error);
      }
    };

    fetchAuthor();
  }, [comment.user_id]);

  return (
    <div className="border-b py-4">
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          {author?.avatar_url ? (
            <img 
              src={author.avatar_url} 
              alt={author.full_name || 'User'} 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <span className="text-sm">{author?.full_name?.[0] || '?'}</span>
          )}
        </div>
        <div>
          <p className="font-medium">{author?.full_name || 'Anonymous'}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(comment.created_at), 'MMM d, yyyy • h:mm a')}
          </p>
        </div>
      </div>
      <p className="text-sm">{comment.content}</p>
    </div>
  );
}
