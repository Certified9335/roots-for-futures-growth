
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tree } from '@/types';
import { Heart, Info, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface TreeCardProps {
  tree: Tree;
  onTreeLiked?: () => void;
  showLikeButton?: boolean;
  isLikedByUser?: boolean;
  likeCount?: number;
}

export function TreeCard({ 
  tree, 
  onTreeLiked, 
  showLikeButton = true, 
  isLikedByUser = false,
  likeCount = 0
}: TreeCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likes, setLikes] = useState(likeCount);
  const [isLiking, setIsLiking] = useState(false);

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
        setLikes(prev => prev - 1);
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
        setLikes(prev => prev + 1);
        toast({
          title: "Liked!",
          description: "You've liked this tree.",
        });
      }

      if (onTreeLiked) {
        onTreeLiked();
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

  const handleViewDetails = () => {
    navigate(`/trees/${tree.id}`);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
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
      <CardHeader>
        <CardTitle className="truncate">{tree.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="truncate">{tree.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>{format(new Date(tree.planting_date), 'MMM d, yyyy')}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">
          {tree.description || `A ${tree.species} tree planted in ${tree.location}`}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto">
        <Button variant="outline" onClick={handleViewDetails}>
          <Info className="mr-2 h-4 w-4" />
          Details
        </Button>
        
        {showLikeButton && (
          <Button 
            variant={isLiked ? "default" : "outline"} 
            onClick={handleLike} 
            disabled={isLiking}
            className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {likes}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
