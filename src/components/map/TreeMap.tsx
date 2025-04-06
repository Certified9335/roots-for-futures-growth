
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tree } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export function TreeMap() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapApiKeyInput, setMapApiKeyInput] = useState('');
  const [mapApiKey, setMapApiKey] = useState('');

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const { data, error } = await supabase
          .from('trees')
          .select('*')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null);
          
        if (error) throw error;
        
        setTrees(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching trees",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, [toast]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMapApiKey(mapApiKeyInput);
  };

  if (!mapApiKey) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Tree Map</h2>
        <p className="mb-4">To view the tree map, please enter your Mapbox public token:</p>
        
        <form onSubmit={handleApiKeySubmit} className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your Mapbox public token"
              value={mapApiKeyInput}
              onChange={(e) => setMapApiKeyInput(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Get a free Mapbox token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
            </p>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full p-6">
        <p>Loading map data...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-center">
        Map would display here with {trees.length} trees with coordinates.
        <br />
        Would use Mapbox GL JS to show actual map with tree markers.
        <br />
        Each tree would be clickable to navigate to its detail page.
      </p>
    </div>
  );
}
