
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { MapPin, Info, Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { Link } from 'react-router-dom';

// Import mapbox-gl after npm install mapbox-gl
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Tree = Database['public']['Tables']['trees']['Row'];

const TreeMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  
  const { data: trees, isLoading, error } = useQuery({
    queryKey: ['trees-for-map'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trees')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Tree[];
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tree locations. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  // Initialize map when trees data and token are available
  useEffect(() => {
    if (!mapContainer.current || !trees || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 1.5,
      center: [0, 20], // Default to world view
    });

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.current.addControl(nav, 'top-right');

    // Add tree markers when map is loaded
    map.current.on('load', () => {
      // Add markers for each tree
      trees.forEach(tree => {
        if (tree.latitude && tree.longitude) {
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h3 class="font-bold">${tree.name}</h3>
              <p>${tree.species}</p>
              <p>${tree.location}</p>
            `);

          // Create a DOM element for the marker
          const el = document.createElement('div');
          el.className = 'tree-marker';
          el.style.backgroundColor = '#34d399';
          el.style.width = '24px';
          el.style.height = '24px';
          el.style.borderRadius = '50%';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22v-7l4-2 4 2v7"/><path d="M12 13V7"/><path d="M10 5.5a2 2 2 0 1 4 0"/><path d="M8.5 2.5a4 4 2 0 1 7 0"/></svg>';

          new mapboxgl.Marker(el)
            .setLngLat([tree.longitude, tree.latitude])
            .setPopup(popup)
            .addTo(map.current!);
        }
      });

      // If we have trees with coordinates, fit the map to them
      if (trees.length > 0 && trees.some(t => t.latitude && t.longitude)) {
        const bounds = new mapboxgl.LngLatBounds();
        
        trees.forEach(tree => {
          if (tree.latitude && tree.longitude) {
            bounds.extend([tree.longitude, tree.latitude]);
          }
        });
        
        map.current!.fitBounds(bounds, {
          padding: 80,
          maxZoom: 15
        });
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [trees, mapboxToken]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Global Tree Map</h1>
              <p className="text-muted-foreground">
                Explore trees planted by our community members around the world
              </p>
            </div>
            <Link to="/plant" className="mt-4 sm:mt-0">
              <Button className="bg-forest-500 hover:bg-forest-600">
                <MapPin className="mr-2 h-4 w-4" /> Add Your Tree
              </Button>
            </Link>
          </div>

          {!mapboxToken ? (
            <div className="border-2 border-dashed rounded-xl p-6 text-center mb-6">
              <h3 className="text-lg font-bold mb-2">Mapbox API Token Required</h3>
              <p className="mb-4">Please enter your Mapbox public token to view the tree map:</p>
              <div className="max-w-lg mx-auto">
                <input 
                  type="text"
                  placeholder="Enter your Mapbox token here"
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                  onChange={(e) => setMapboxToken(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mb-2">
                  <Info className="h-4 w-4 inline mr-1" />
                  You can get a free token at <a href="https://www.mapbox.com/" target="_blank" rel="noreferrer" className="text-forest-500 hover:underline">mapbox.com</a>
                </p>
              </div>
            </div>
          ) : null}

          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
                <Spinner size="lg" />
              </div>
            )}
            
            <div 
              ref={mapContainer} 
              className={`w-full h-[70vh] rounded-lg border overflow-hidden ${!mapboxToken ? 'hidden' : ''}`}
            />
            
            {(!trees || trees.length === 0) && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Leaf className="h-12 w-12 text-forest-300 mb-4" />
                <h3 className="text-xl font-medium">No trees on the map yet</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Be the first to add a tree to our global map
                </p>
                <Link to="/plant">
                  <Button className="bg-forest-500 hover:bg-forest-600">
                    Plant Your First Tree
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/40 rounded-lg">
              <h3 className="font-bold text-xl text-forest-600">{trees?.length || 0}</h3>
              <p className="text-sm text-muted-foreground">Trees Planted</p>
            </div>
            <div className="p-4 bg-muted/40 rounded-lg">
              <h3 className="font-bold text-xl text-forest-600">
                {trees?.reduce((total, tree) => total + (tree.height_cm || 0), 0) || 0}cm
              </h3>
              <p className="text-sm text-muted-foreground">Total Growth</p>
            </div>
            <div className="p-4 bg-muted/40 rounded-lg">
              <h3 className="font-bold text-xl text-forest-600">
                {Math.round((trees?.length || 0) * 21)}kg
              </h3>
              <p className="text-sm text-muted-foreground">CO₂ Absorbed Yearly</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TreeMap;
