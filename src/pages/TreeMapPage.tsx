
import { Layout } from '@/components/layout/Layout';
import { TreeMap } from '@/components/map/TreeMap';

const TreeMapPage = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Tree Map</h1>
        <p className="mb-6 text-lg">
          Explore trees planted by our community members around the world. 
          Click on a tree marker to learn more about it.
        </p>
        <TreeMap />
      </div>
    </Layout>
  );
};

export default TreeMapPage;
