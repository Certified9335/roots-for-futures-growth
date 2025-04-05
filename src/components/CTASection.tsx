
import React from 'react';
import { Button } from '@/components/ui/button';
import { TreeDeciduous, Leaf } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-forest-600 to-forest-400 opacity-90 z-0"></div>
          <div className="relative z-10 py-16 px-6 md:px-16 lg:px-20 flex flex-col lg:flex-row items-center text-white">
            <div className="flex-1 lg:pr-8 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to make a difference?</h2>
              <p className="text-lg opacity-90 max-w-xl">
                Join thousands of others who are creating a greener future by planting trees for children. Each tree planted is a step toward a more sustainable world.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-8">
                <Button size="lg" className="bg-white text-forest-600 hover:bg-gray-100 hover:text-forest-700">
                  <TreeDeciduous className="mr-2 h-5 w-5" />
                  Plant Your Tree
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white text-forest-600 rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-forest-100 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Start Today</h3>
                    <p className="text-sm text-forest-500">It only takes minutes</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-forest-100 flex items-center justify-center text-xs font-medium text-forest-600">1</div>
                    <span className="text-sm">Create your account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-forest-100 flex items-center justify-center text-xs font-medium text-forest-600">2</div>
                    <span className="text-sm">Register your tree</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-forest-100 flex items-center justify-center text-xs font-medium text-forest-600">3</div>
                    <span className="text-sm">Track growth & impact</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-forest-500 hover:bg-forest-600 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
