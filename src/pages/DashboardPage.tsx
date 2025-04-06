
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Map, BookOpen, Users, Plus, Heart } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  const handleAddTree = () => {
    navigate('/add-tree');
  };

  const handleViewMap = () => {
    navigate('/map');
  };

  const handleViewCommunity = () => {
    navigate('/community');
  };

  const handleViewResources = () => {
    navigate('/learn');
  };

  const handleViewSponsorship = () => {
    navigate('/sponsorship');
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome{user ? `, ${user.user_metadata.full_name || 'User'}` : ''}!</h1>
          <p className="text-gray-600">Manage your trees, learn about environmental conservation, and connect with the community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Trees Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                My Trees
              </CardTitle>
              <CardDescription>View and manage the trees you've planted</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Track your tree planting progress and monitor their growth.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/my-trees')}>View My Trees</Button>
              <Button onClick={handleAddTree} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Tree
              </Button>
            </CardFooter>
          </Card>

          {/* Tree Map Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-green-600" />
                Tree Map
              </CardTitle>
              <CardDescription>Explore trees around the world</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Discover trees planted by the community on an interactive map.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleViewMap} className="w-full">Explore Map</Button>
            </CardFooter>
          </Card>

          {/* Learning Resources Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Learning Resources
              </CardTitle>
              <CardDescription>Educational content about trees and environment</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Learn about different tree species, environmental conservation, and more.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleViewResources} className="w-full">Browse Resources</Button>
            </CardFooter>
          </Card>

          {/* Community Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Community
              </CardTitle>
              <CardDescription>Connect with other tree enthusiasts</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Join discussions, share experiences, and connect with like-minded individuals.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleViewCommunity} className="w-full">Join Community</Button>
            </CardFooter>
          </Card>

          {/* Sponsorship Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                Sponsorship
              </CardTitle>
              <CardDescription>Support tree planting initiatives</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Sponsor a tree planting initiative and make a positive impact on the environment.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleViewSponsorship} className="w-full">Sponsor Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
