
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/hooks/use-toast';
import { Book, Search, Leaf, TreeDeciduous, Sprout, Cloud } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type EducationalResource = Database['public']['Tables']['educational_resources']['Row'];

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['educational-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('educational_resources')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as EducationalResource[];
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load educational resources. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  const categories = resources ? 
    ['all', ...Array.from(new Set(resources.map(resource => resource.category)))] : 
    ['all'];

  const filteredResources = resources?.filter(resource => {
    const matchesQuery = searchQuery ? 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) :
      true;
      
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    return matchesQuery && matchesCategory;
  });

  // Function to get the appropriate icon for a category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environment':
        return <Cloud className="h-5 w-5" />;
      case 'species':
        return <TreeDeciduous className="h-5 w-5" />;
      case 'gardening':
        return <Sprout className="h-5 w-5" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Learn About Trees</h1>
              <p className="text-muted-foreground mt-1">
                Discover resources, guides and information about trees and environmental impact
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex overflow-x-auto pb-2 w-auto mb-4">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="capitalize"
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : filteredResources && filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-forest-100 flex items-center justify-center">
                        {getCategoryIcon(resource.category)}
                      </div>
                      <span className="text-sm capitalize text-muted-foreground">{resource.category}</span>
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="h-36 bg-muted rounded-md mb-4 overflow-hidden">
                      {resource.image_url ? (
                        <img 
                          src={resource.image_url} 
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <Book className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {resource.content.substring(0, 150)}...
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Read Full Article
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <Book className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-2">
                {searchQuery ? "We couldn't find any resources matching your search." : "No educational resources available yet."}
              </p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;
