
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { TreeDeciduous, Calendar, MapPin, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';
import { cn } from '@/lib/utils';

type Tree = Database['public']['Tables']['trees']['Row'];

interface TreeCardProps {
  tree: Tree;
}

export function TreeCard({ tree }: TreeCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 bg-muted flex items-center justify-center relative">
        {tree.image_url ? (
          <img 
            src={tree.image_url} 
            alt={`${tree.name}`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <TreeDeciduous className="h-12 w-12 text-forest-300" />
        )}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center">
          <TreeDeciduous className="h-3 w-3 mr-1 text-forest-500" />
          {tree.species}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{tree.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="space-y-3 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1 text-forest-500" />
            {tree.location}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1 text-forest-500" />
            Planted on {format(new Date(tree.planting_date), 'MMM d, yyyy')}
          </div>
          
          {tree.height_cm && (
            <div className="text-sm text-muted-foreground">
              Current height: {tree.height_cm}cm
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 mt-auto">
          <Link to={`/trees/${tree.id}`}>
            <Button variant="outline" size="sm" className="text-xs">
              View Details
            </Button>
          </Link>
          
          <Button variant="ghost" size="sm" className="text-xs">
            <Heart className={cn("h-3.5 w-3.5 mr-1", 
              "text-forest-400"
            )} />
            {0}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
