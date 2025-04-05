
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  User, 
  Map, 
  BookOpen, 
  BarChart3, 
  LogIn,
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { user, signOut } = useAuth();

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
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/trees" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                My Trees
              </Link>
            </>
          )}
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
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>One Tree One Child</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link to="/" className="text-foreground hover:text-forest-500 transition-colors">
                    Home
                  </Link>
                  {user && (
                    <>
                      <Link to="/dashboard" className="text-foreground hover:text-forest-500 transition-colors">
                        Dashboard
                      </Link>
                      <Link to="/trees" className="text-foreground hover:text-forest-500 transition-colors">
                        My Trees
                      </Link>
                    </>
                  )}
                  <Link to="/map" className="text-foreground hover:text-forest-500 transition-colors">
                    Tree Map
                  </Link>
                  <Link to="/learn" className="text-foreground hover:text-forest-500 transition-colors">
                    Learn
                  </Link>
                  <Link to="/community" className="text-foreground hover:text-forest-500 transition-colors">
                    Community
                  </Link>
                  
                  {user ? (
                    <>
                      <Link to="/profile" className="text-foreground hover:text-forest-500 transition-colors">
                        Profile
                      </Link>
                      <Button variant="outline" onClick={() => signOut()} className="mt-2">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-foreground hover:text-forest-500 transition-colors">
                        Sign In
                      </Link>
                      <Link to="/register" className="text-foreground hover:text-forest-500 transition-colors">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {user ? (
            <>
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/trees">My Trees</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link to="/plant">
                <Button className="bg-forest-500 hover:bg-forest-600 hidden md:flex">
                  <Leaf className="mr-2 h-4 w-4" />
                  Plant a Tree
                </Button>
              </Link>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-forest-500 hover:bg-forest-600">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
