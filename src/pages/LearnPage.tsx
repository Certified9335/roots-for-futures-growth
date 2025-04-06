
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ResourceCard } from '@/components/learn/ResourceCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { EducationalResource } from '@/types';
import { Button } from '@/components/ui/button';

const LearnPage = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Fetch all educational resources
        const query = supabase
          .from('educational_resources')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (selectedCategory) {
          query.eq('category', selectedCategory);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        setResources(data || []);
        
        // Get unique categories
        if (data) {
          const uniqueCategories = Array.from(
            new Set(data.map(resource => resource.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching resources",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [toast, selectedCategory]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Learn About Trees</h1>
        <p className="mb-6 text-lg">
          Explore educational resources to learn more about trees, their benefits, and how to care for them.
        </p>
        
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No resources found</h2>
            {selectedCategory && (
              <p className="text-gray-600 mb-6">
                No resources found for category: {selectedCategory}. 
                Try selecting a different category.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LearnPage;
