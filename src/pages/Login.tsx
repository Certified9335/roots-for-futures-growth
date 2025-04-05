
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';
import { Leaf } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="hidden lg:block">
              <div className="relative h-full min-h-[600px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-400/80 to-forest-600/80 mix-blend-multiply"></div>
                <img 
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                  alt="Trees in forest" 
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="h-6 w-6" />
                    <span className="text-xl font-bold">One Tree One Child</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                  <p className="opacity-90">
                    Sign in to continue your journey of environmental conservation and making a positive impact on our planet.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
