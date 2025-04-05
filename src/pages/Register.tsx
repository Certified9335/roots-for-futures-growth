
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/auth/RegisterForm';
import { Leaf } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="hidden lg:block">
              <div className="relative h-full min-h-[700px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-400/80 to-forest-600/80 mix-blend-multiply"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Child planting tree" 
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="h-6 w-6" />
                    <span className="text-xl font-bold">One Tree One Child</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
                  <p className="opacity-90">
                    Create an account to start your journey of planting trees, tracking their growth, and making a positive impact on the environment.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="font-bold text-lg">10K+</span>
                      </div>
                      <span>Trees planted by our community</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="font-bold text-lg">43</span>
                      </div>
                      <span>Countries with registered trees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
