
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TreeRegistrationForm from '@/components/trees/TreeRegistrationForm';

const PlantTree = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-muted/30">
        <div className="container">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Plant a Tree</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Register a new tree you've planted and track its growth and environmental impact over time.
            </p>
          </header>
          
          <TreeRegistrationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantTree;
