
import React from 'react';
import { TreeDeciduous, MapPin, BarChart3, Book, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconClass
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconClass?: string;
}) => {
  return (
    <Card className="tree-card h-full">
      <CardContent className="p-6">
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${iconClass || 'bg-forest-100'}`}>
          <Icon className={`h-6 w-6 ${iconClass ? 'text-white' : 'text-forest-500'}`} />
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: 'Plant Trees',
      description: 'Register trees for children or yourself and track their growth over time.',
      iconClass: 'forest-gradient'
    },
    {
      icon: MapPin,
      title: 'Interactive Map',
      description: 'Explore trees planted worldwide and see your contribution on the global map.',
      iconClass: 'earth-gradient'
    },
    {
      icon: BarChart3,
      title: 'Track Impact',
      description: 'Visualize your environmental impact with detailed statistics and analytics.',
      iconClass: 'sky-gradient'
    },
    {
      icon: Book,
      title: 'Educational Resources',
      description: 'Access guides and articles about tree species, planting techniques, and environmental benefits.',
    },
    {
      icon: Award,
      title: 'Earn Achievements',
      description: 'Collect badges and complete challenges to track your conservation journey.',
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with fellow tree planters, share updates, and participate in campaigns.',
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Our platform makes it easy to contribute to environmental conservation while creating a meaningful connection to nature.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconClass={feature.iconClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
