
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { EducationalResource } from '@/types';
import { BookOpen } from 'lucide-react';

const ResourceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resource, setResource] = useState<EducationalResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabase
          .from('educational_resources')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        setResource(data);
      } catch (error: any) {
        toast({
          title: "Error fetching resource",
          description: error.message,
          variant: "destructive",
        });
        navigate('/learn');
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading resource...</p>
        </div>
      </Layout>
    );
  }

  if (!resource) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Resource not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => navigate('/learn')} className="mb-4">
            &larr; Back to Resources
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-64">
              {resource.image_url ? (
                <img 
                  src={resource.image_url} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-green-800" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full">
                {resource.category}
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
              <div className="prose max-w-none">
                <p className="text-lg mb-6">{resource.description}</p>
                
                <div dangerouslySetInnerHTML={{ __html: resource.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetailPage;
