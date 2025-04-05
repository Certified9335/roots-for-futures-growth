
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, AuthRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PlantTree from "./pages/PlantTree";
import Profile from "./pages/Profile";
import MyTrees from "./pages/MyTrees";
import TreeDetails from "./pages/TreeDetails";
import TreeMap from "./pages/TreeMap";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth routes - redirect to dashboard if already logged in */}
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plant" element={<PlantTree />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trees" element={<MyTrees />} />
            <Route path="/trees/:id" element={<TreeDetails />} />
            <Route path="/trees/:id/edit" element={<Dashboard />} /> {/* Placeholder - will implement later */}
          </Route>
          
          {/* Public routes */}
          <Route path="/map" element={<TreeMap />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/community" element={<Community />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Moved Toaster components here inside the React component tree */}
        <Toaster />
        <Sonner />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
