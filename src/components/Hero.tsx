
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Users, Search, TreeDeciduous } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-muted py-20 md:py-28">
      <div className="leaf-pattern absolute inset-0 opacity-30"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-grow">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-forest-600 bg-white mb-4">
              <span className="flex h-2 w-2 rounded-full bg-forest-500 mr-2"></span>
              Join the movement for a greener planet
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-forest-500">One Tree</span>, One Child,
              <span className="block mt-1">One Better Future</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Join our global community planting trees for children around the world.
              Track your environmental impact and help create a sustainable future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-forest-500 hover:bg-forest-600">
                <Leaf className="mr-2 h-5 w-5" />
                Plant Your First Tree
              </Button>
              <Button size="lg" variant="outline" className="border-forest-200">
                <Search className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <TreeDeciduous className="h-5 w-5 text-forest-500" />
                <span className="text-sm font-medium">10,457 Trees Planted</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-forest-500" />
                <span className="text-sm font-medium">2,300+ Active Users</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-400/80 to-forest-600/80 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" 
              alt="Child planting a tree" 
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-medium mb-1">Plant. Track. Grow.</h3>
              <p className="text-sm opacity-90">Watch your impact flourish with every tree planted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
