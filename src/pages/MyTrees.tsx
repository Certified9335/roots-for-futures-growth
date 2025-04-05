
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { TreeCard } from '@/components/trees/TreeCard';
import { TreesTable } from '@/components/trees/TreesTable';
import { Spinner } from '@/components/ui/spinner';
import { Plus, Filter, Leaf } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Tree = Database['public']['Tables']['trees']['Row'];

const MyTrees = () => {
  const { user } = useAuth();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const { data: trees, isLoading, error } = useQuery({
    queryKey: ['user-trees', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('trees')
        .select('*, tree_likes(id, user_id)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Tree[];
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load your trees. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Trees</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all the trees you've planted
              </p>
            </div>
            <Link to="/plant" className="mt-4 sm:mt-0">
              <Button className="bg-forest-500 hover:bg-forest-600">
                <Plus className="mr-2 h-4 w-4" /> Plant New Tree
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : trees && trees.length > 0 ? (
            <Tabs defaultValue={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
              
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trees.map(tree => (
                    <TreeCard key={tree.id} tree={tree} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <TreesTable trees={trees} />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <div className="mx-auto w-16 h-16 mb-4 bg-muted/50 flex items-center justify-center rounded-full">
                <Leaf className="h-8 w-8 text-forest-500/50" />
              </div>
              <h3 className="text-xl font-medium mb-2">No trees yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't planted any trees yet. Start your journey by planting your first tree.
              </p>
              <Link to="/plant">
                <Button className="bg-forest-500 hover:bg-forest-600">
                  <Plus className="mr-2 h-4 w-4" /> Plant Your First Tree
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyTrees;
