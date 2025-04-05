
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-forest-500" />
            <span className="text-lg font-bold text-forest-500">One Tree One Child</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Growing a greener future, one tree at a time.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a href="https://twitter.com" className="text-muted-foreground hover:text-forest-500 transition-colors">
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://facebook.com" className="text-muted-foreground hover:text-forest-500 transition-colors">
              <Facebook size={18} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://instagram.com" className="text-muted-foreground hover:text-forest-500 transition-colors">
              <Instagram size={18} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://github.com" className="text-muted-foreground hover:text-forest-500 transition-colors">
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-4">Plant & Track</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/plant" className="hover:text-forest-500 transition-colors">Plant a Tree</Link></li>
            <li><Link to="/trees" className="hover:text-forest-500 transition-colors">My Trees</Link></li>
            <li><Link to="/map" className="hover:text-forest-500 transition-colors">Tree Map</Link></li>
            <li><Link to="/impact" className="hover:text-forest-500 transition-colors">Environmental Impact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/learn" className="hover:text-forest-500 transition-colors">Learn</Link></li>
            <li><Link to="/species" className="hover:text-forest-500 transition-colors">Tree Species</Link></li>
            <li><Link to="/blog" className="hover:text-forest-500 transition-colors">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-forest-500 transition-colors">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-4">About</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-forest-500 transition-colors">Our Mission</Link></li>
            <li><Link to="/team" className="hover:text-forest-500 transition-colors">Team</Link></li>
            <li><Link to="/contact" className="hover:text-forest-500 transition-colors">Contact</Link></li>
            <li><Link to="/donate" className="hover:text-forest-500 transition-colors">Support Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} One Tree One Child. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-forest-500 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-forest-500 transition-colors">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-forest-500 transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
