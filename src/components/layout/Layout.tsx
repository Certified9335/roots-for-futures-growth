
import { Navbar } from './Navbar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container flex items-center justify-center">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} One Tree One Child. All rights reserved.
          </p>
        </div>
      </footer>
      <Toaster />
      <Sonner />
    </div>
  );
}
