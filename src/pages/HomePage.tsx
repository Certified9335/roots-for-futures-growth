
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { TreeCard } from '@/components/trees/TreeCard';
import { ResourceCard } from '@/components/learn/ResourceCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from '@/integrations/supabase/client';
import { Tree, EducationalResource } from '@/types';
import { Leaf, Map, BookOpen, Users, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [recentTrees, setRecentTrees] = useState<Tree[]>([]);
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent trees
        const { data: treesData } = await supabase
          .from('trees')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);
          
        if (treesData) {
          setRecentTrees(treesData);
        }
        
        // Fetch featured resources
        const { data: resourcesData } = await supabase
          .from('educational_resources')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (resourcesData) {
          setResources(resourcesData);
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">One Tree One Child</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Join our mission to plant trees, track their growth, and learn about environmental conservation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/sign-up')} 
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/learn')}
              className="border-white text-white hover:bg-green-700"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plant a Tree</h3>
              <p className="text-gray-600">
                Plant a tree in your community and register it in our app.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Map className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Growth</h3>
              <p className="text-gray-600">
                Document the tree's growth and see it on our interactive map.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="text-gray-600">
                Access educational resources about trees and environmental conservation.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Join a community of tree enthusiasts and share your experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Trees Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Trees</h2>
            <Link to="/map">
              <Button variant="outline" className="flex items-center gap-2">
                View All Trees
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <p className="text-center py-12">Loading trees...</p>
          ) : recentTrees.length === 0 ? (
            <p className="text-center py-12">No trees have been added yet.</p>
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {recentTrees.map(tree => (
                  <CarouselItem key={tree.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <TreeCard tree={tree} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          )}
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Learn About Trees</h2>
            <Link to="/learn">
              <Button variant="outline" className="flex items-center gap-2">
                View All Resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <p className="text-center py-12">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="text-center py-12">No resources available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be a part of our mission to create a greener world, one tree at a time.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/sign-up')} 
            className="bg-white text-green-600 hover:bg-gray-100"
          >
            Sign Up Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
