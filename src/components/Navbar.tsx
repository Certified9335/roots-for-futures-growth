
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, User, Map, BookOpen, BarChart3, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-forest-500 animate-leaf-sway" />
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-forest-500">One Tree</span>
            <span className="text-xl font-light text-forest-400">One Child</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/trees" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            My Trees
          </Link>
          <Link to="/map" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Tree Map
          </Link>
          <Link to="/learn" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Learn
          </Link>
          <Link to="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Community
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button className="bg-forest-500 hover:bg-forest-600">
            <Leaf className="mr-2 h-4 w-4" />
            Plant a Tree
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
