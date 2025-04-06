
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface AddCommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export function AddCommentForm({ postId, onCommentAdded }: AddCommentFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a comment.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('comments')
        .insert({
          content: comment.trim(),
          post_id: postId,
          user_id: user.id
        });
        
      if (error) throw error;
      
      setComment('');
      
      toast({
        title: "Comment added!",
        description: "Your comment has been added successfully.",
      });
      
      onCommentAdded();
    } catch (error: any) {
      toast({
        title: "Error adding comment",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Add a Comment</h3>
      {user ? (
        <>
          <Textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full min-h-[100px]"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </>
      ) : (
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-center">
            Please <Button variant="link" className="p-0" onClick={() => navigate('/sign-in')}>sign in</Button> to add a comment.
          </p>
        </div>
      )}
    </form>
  );
}
