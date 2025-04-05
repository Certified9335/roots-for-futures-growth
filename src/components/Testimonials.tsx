
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

const TestimonialCard = ({ quote, name, title, avatarUrl }: TestimonialProps) => {
  return (
    <Card className="h-full tree-card">
      <CardContent className="p-6">
        <QuoteIcon className="h-8 w-8 text-forest-300 mb-4" />
        <p className="text-lg mb-6">{quote}</p>
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Planting a tree for my daughter's birthday was such a meaningful gift. We love tracking its growth together and seeing our impact on the environment.",
      name: "Sarah Johnson",
      title: "Parent & Environmental Advocate",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      quote: "As a teacher, I've used One Tree One Child to teach my students about environmental responsibility. Each student planted a tree and they're excited to track their growth.",
      name: "Michael Chen",
      title: "Elementary School Teacher",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      quote: "The visualization of our environmental impact has been incredibly motivating. My family has planted 5 trees so far, and we plan to add more every year.",
      name: "Emily Rodriguez",
      title: "Sustainability Consultant",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80"
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground text-lg">
            Hear from people who are making a difference through One Tree One Child.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
