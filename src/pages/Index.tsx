
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import ImpactStats from '@/components/ImpactStats';
import TreeGallery from '@/components/TreeGallery';
import CTASection from '@/components/CTASection';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <ImpactStats />
        <TreeGallery />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
