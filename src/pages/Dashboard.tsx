
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TreeDeciduous, ArrowUp, Users, Calendar, MapPin, List, Grid3X3, Plus, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for the dashboard
const userData = {
  name: "Alex Johnson",
  treesPlanted: 5,
  co2Absorbed: 125, // kg
  lastUpdate: "2023-04-15",
  treesData: [
    { id: 1, name: "Emma's Oak", species: "Oak", location: "Backyard", plantingDate: "2023-01-10", height: 45 },
    { id: 2, name: "Noah's Pine", species: "Pine", location: "Grandparents' Farm", plantingDate: "2023-02-22", height: 32 },
    { id: 3, name: "Family Cedar", species: "Cedar", location: "Community Garden", plantingDate: "2023-03-15", height: 38 },
    { id: 4, name: "School Project Maple", species: "Maple", location: "Elementary School", plantingDate: "2023-04-05", height: 28 },
    { id: 5, name: "Park Birch", species: "Birch", location: "City Park", plantingDate: "2023-04-10", height: 25 }
  ]
};

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your environmental impact</p>
          </header>
          
          {/* New donation/sponsorship call-to-action */}
          <div className="bg-forest-50 border border-forest-200 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold flex items-center">
                <Heart className="mr-2 h-5 w-5 text-forest-500" />
                Support Our Reforestation Efforts
              </h2>
              <p className="text-muted-foreground mt-1">
                Make a difference by sponsoring trees or contributing to our mission
              </p>
            </div>
            <Link to="/sponsorship">
              <Button className="bg-forest-500 hover:bg-forest-600 w-full md:w-auto">
                Sponsor or Donate Now
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Trees Planted</CardDescription>
                <CardTitle className="text-3xl flex items-center">
                  {userData.treesPlanted}
                  <TreeDeciduous className="ml-2 h-5 w-5 text-forest-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1 text-forest-500" />
                  <span>2 trees added this year</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>CO₂ Absorbed</CardDescription>
                <CardTitle className="text-3xl">{userData.co2Absorbed} kg</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Equivalent to 500 km not driven by car
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Community Ranking</CardDescription>
                <CardTitle className="text-3xl flex items-center">
                  Top 15%
                  <Users className="ml-2 h-5 w-5 text-forest-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Among 2,348 active members
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Trees</h2>
            <div className="flex gap-2">
              <Link to="/sponsorship">
                <Button variant="outline" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-forest-500" />
                  Sponsor Tree
                </Button>
              </Link>
              <Button className="bg-forest-500 hover:bg-forest-600">
                <Plus className="mr-2 h-4 w-4" />
                Plant New Tree
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="grid"><Grid3X3 className="h-4 w-4 mr-1" /> Grid View</TabsTrigger>
                <TabsTrigger value="list"><List className="h-4 w-4 mr-1" /> List View</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center">
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </div>
            
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.treesData.map(tree => (
                  <Card key={tree.id} className="tree-card">
                    <div className="h-40 bg-muted rounded-t-md flex items-center justify-center">
                      <TreeDeciduous className="h-12 w-12 text-forest-300" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{tree.name}</CardTitle>
                      <CardDescription>{tree.species}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Planted on {tree.plantingDate}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{tree.location}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground bg-muted">
                      <div>Name</div>
                      <div>Species</div>
                      <div>Location</div>
                      <div>Planting Date</div>
                      <div>Height (cm)</div>
                    </div>
                    {userData.treesData.map(tree => (
                      <div key={tree.id} className="grid grid-cols-5 p-4 text-sm border-t hover:bg-muted/50 transition-colors">
                        <div className="font-medium">{tree.name}</div>
                        <div>{tree.species}</div>
                        <div>{tree.location}</div>
                        <div>{tree.plantingDate}</div>
                        <div>{tree.height}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
