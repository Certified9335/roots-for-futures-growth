
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TreePine, Share } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You For Your Support!</h1>
          
          <div className="bg-card border rounded-lg p-6 md:p-8 my-8">
            <p className="text-lg mb-6">
              Your contribution has been successfully processed. Your generosity is helping us create a greener planet
              and support local communities around the world.
            </p>

            <div className="bg-muted/50 border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="h-5 w-5 text-forest-500" />
                <h3 className="font-semibold text-lg">Your Impact</h3>
              </div>
              <p>
                Your sponsorship will help plant and maintain trees that will absorb approximately
                1 ton of CO2 over their lifetime, provide habitat for wildlife, and support local ecosystems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-forest-500 hover:bg-forest-600">
                <Link to="/trees" className="flex items-center gap-2">
                  <TreePine className="h-5 w-5" />
                  View My Trees
                </Link>
              </Button>
              <Button variant="outline" className="gap-2">
                <Share className="h-5 w-5" />
                Share on Social Media
              </Button>
            </div>
          </div>

          <div className="text-muted-foreground">
            <p className="mb-2">A confirmation email has been sent to your email address.</p>
            <p>
              Have questions? <Link to="/contact" className="text-forest-500 hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
