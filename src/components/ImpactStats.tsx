
import React from 'react';
import { TreeDeciduous, Globe, UserPlus, CloudCog } from 'lucide-react';

const StatCard = ({
  icon: Icon,
  value,
  label,
  className
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  className?: string;
}) => {
  return (
    <div className={`rounded-lg p-6 ${className}`}>
      <Icon className="h-8 w-8 mb-4" />
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm opacity-80">{label}</p>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Collective Impact</h2>
          <p className="text-muted-foreground text-lg">
            Together, we're making a measurable difference for our planet and future generations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={TreeDeciduous}
            value="10,457"
            label="Trees Planted"
            className="bg-forest-500 text-white"
          />
          
          <StatCard
            icon={UserPlus}
            value="2,348"
            label="Active Members"
            className="bg-earth-400 text-forest-900"
          />
          
          <StatCard
            icon={Globe}
            value="43"
            label="Countries Reached"
            className="bg-sky-400 text-white"
          />
          
          <StatCard
            icon={CloudCog}
            value="209.1"
            label="Tons of CO₂ Absorbed"
            className="bg-forest-600 text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
