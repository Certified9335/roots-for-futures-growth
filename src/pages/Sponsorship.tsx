
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SponsorshipForm from '@/components/sponsorship/SponsorshipForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Heart, TreePine } from 'lucide-react';

const Sponsorship = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Our Reforestation Mission</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Help us grow a greener future by sponsoring tree planting initiatives around the world.
              Your contribution directly impacts communities and ecosystems.
            </p>
          </div>
          
          <Tabs defaultValue="sponsor-tree" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="sponsor-tree" className="text-base flex items-center gap-2">
                <TreePine className="h-5 w-5" />
                <span className="hidden sm:inline">Sponsor a Tree</span>
              </TabsTrigger>
              <TabsTrigger value="general-donation" className="text-base flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="hidden sm:inline">General Donation</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sponsor-tree" className="mt-4">
              <div className="bg-card border rounded-lg p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Leaf className="h-6 w-6 text-forest-500" />
                  <h2 className="text-2xl font-bold">Sponsor a Tree</h2>
                </div>
                <SponsorshipForm />
              </div>
            </TabsContent>
            
            <TabsContent value="general-donation" className="mt-4">
              <div className="bg-card border rounded-lg p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="h-6 w-6 text-forest-500" />
                  <h2 className="text-2xl font-bold">Make a General Donation</h2>
                </div>
                <div className="text-center py-10">
                  <p className="text-lg mb-6">
                    Support our overall mission with a general donation. These funds help us expand our operations, develop
                    educational materials, and support local communities involved in tree planting.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                    <a href="/payment?amount=10&type=donation" className="w-full px-8 py-4 bg-white border-2 border-forest-500 rounded-lg hover:bg-gray-50 transition-colors">
                      <p className="font-bold text-xl text-forest-600">$10</p>
                      <p className="text-sm text-muted-foreground">Plant 1 tree</p>
                    </a>
                    <a href="/payment?amount=50&type=donation" className="w-full px-8 py-4 bg-white border-2 border-forest-500 rounded-lg hover:bg-gray-50 transition-colors">
                      <p className="font-bold text-xl text-forest-600">$50</p>
                      <p className="text-sm text-muted-foreground">Plant 5 trees</p>
                    </a>
                    <a href="/payment?amount=100&type=donation" className="w-full px-8 py-4 bg-white border-2 border-forest-500 rounded-lg hover:bg-gray-50 transition-colors">
                      <p className="font-bold text-xl text-forest-600">$100</p>
                      <p className="text-sm text-muted-foreground">Plant 10 trees</p>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sponsorship;
