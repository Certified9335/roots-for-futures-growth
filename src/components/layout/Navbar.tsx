
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Leaf, Map, BookOpen, Users, LogIn, UserPlus } from 'lucide-react';

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <Link to="/" className="text-2xl font-bold text-green-600">One Tree One Child</Link>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {user && (
              <NavigationMenuItem>
                <Link to="/my-trees">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Leaf className="mr-2 h-4 w-4" />
                    My Trees
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            
            <NavigationMenuItem>
              <Link to="/map">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Map className="mr-2 h-4 w-4" />
                  Tree Map
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/learn">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/community">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Users className="mr-2 h-4 w-4" />
                  Community
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {user ? (
            <Button variant="outline" onClick={signOut}>Sign Out</Button>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
