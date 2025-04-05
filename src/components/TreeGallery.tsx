
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreeDeciduous, MapPin, CalendarDays, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TreeCardProps {
  imageUrl: string;
  name: string;
  location: string;
  species: string;
  date: string;
  likes: number;
}

const TreeCard = ({ imageUrl, name, location, species, date, likes }: TreeCardProps) => {
  return (
    <Card className="overflow-hidden tree-card">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${name}'s tree`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center">
          <TreeDeciduous className="h-3 w-3 mr-1 text-forest-500" />
          {species}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{name}'s Tree</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1 text-forest-500" />
          {location}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 mr-1 text-forest-500" />
          Planted on {date}
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" size="sm" className="text-xs">
            View Details
          </Button>
          
          <Button variant="ghost" size="sm" className="text-xs">
            <Heart className="h-3.5 w-3.5 mr-1 text-forest-400" />
            {likes}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TreeGallery = () => {
  const trees = [
    {
      imageUrl: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      name: "Emma",
      location: "Portland, Oregon",
      species: "Red Oak",
      date: "Apr 12, 2023",
      likes: 24
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1627833246977-22Towns of CO₂ Absorbedcdee0157e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Liam",
      location: "Vancouver, Canada",
      species: "Douglas Fir",
      date: "May 5, 2023",
      likes: 18
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1533551037358-c8f7182cdb93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Sophia",
      location: "Melbourne, Australia",
      species: "River Red Gum",
      date: "Jun 18, 2023",
      likes: 32
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1548294642-3d668fa9cb88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
      name: "Noah",
      location: "Berlin, Germany",
      species: "European Beech",
      date: "Mar 3, 2023",
      likes: 15
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Recent Tree Plantings</h2>
          <p className="text-muted-foreground text-lg">
            Explore trees recently planted by our community members around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trees.map((tree, index) => (
            <TreeCard key={index} {...tree} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-forest-500 hover:bg-forest-600">
            <TreeDeciduous className="mr-2 h-4 w-4" />
            View All Trees
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TreeGallery;
