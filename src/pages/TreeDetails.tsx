
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/hooks/use-toast';
import { TreeDeciduous, MapPin, Calendar, Ruler, Heart, PencilLine, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Database } from '@/integrations/supabase/types';

type Tree = Database['public']['Tables']['trees']['Row'] & {
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  }
};

const TreeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const { data: tree, isLoading, error } = useQuery({
    queryKey: ['tree-details', id],
    queryFn: async () => {
      if (!id) throw new Error('Tree ID is required');
      
      const { data, error } = await supabase
        .from('trees')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Tree;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tree details. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  const isOwner = user?.id === tree?.user_id;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Link to="/trees" className="inline-flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Trees
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : tree ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {tree.image_url ? (
                      <img 
                        src={tree.image_url} 
                        alt={tree.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <TreeDeciduous className="h-24 w-24 text-muted-foreground/30" />
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h1 className="text-3xl font-bold mb-2">{tree.name}</h1>
                  
                  <div className="flex items-center text-sm mb-1">
                    <span className="bg-forest-100 text-forest-800 rounded-full px-2 py-0.5 text-xs font-medium">
                      {tree.species}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{tree.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>Planted on {format(new Date(tree.planting_date), 'MMMM d, yyyy')}</span>
                    </div>
                    
                    {tree.height_cm && (
                      <div className="flex items-center">
                        <Ruler className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>Current height: {tree.height_cm}cm</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" className="flex-1">
                      <Heart className="mr-2 h-4 w-4" /> Like
                    </Button>
                    {isOwner && (
                      <Link to={`/trees/${tree.id}/edit`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <PencilLine className="mr-2 h-4 w-4" /> Edit Tree
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>About This Tree</CardTitle>
                </CardHeader>
                <CardContent>
                  {tree.description ? (
                    <p className="whitespace-pre-line">{tree.description}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No description available</p>
                  )}
                </CardContent>
              </Card>
              
              {tree.latitude && tree.longitude && (
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-center text-muted-foreground">
                        Map showing location at coordinates:<br />
                        {tree.latitude}, {tree.longitude}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/40 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-forest-600">~21kg</p>
                      <p className="text-sm text-muted-foreground">CO₂ Absorbed Yearly</p>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-forest-600">~7300kg</p>
                      <p className="text-sm text-muted-foreground">Oxygen Produced Lifetime</p>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-forest-600">~1000L</p>
                      <p className="text-sm text-muted-foreground">Water Filtered Yearly</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <TreeDeciduous className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-medium mb-2">Tree not found</h3>
              <p className="text-muted-foreground mb-6">
                The tree you're looking for doesn't exist or has been removed
              </p>
              <Link to="/trees">
                <Button variant="outline">Back to My Trees</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TreeDetails;
