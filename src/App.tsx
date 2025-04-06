
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MyTreesPage from "./pages/MyTreesPage";
import AddTreePage from "./pages/AddTreePage";
import EditTreePage from "./pages/EditTreePage";
import TreeDetailPage from "./pages/TreeDetailPage";
import TreeMapPage from "./pages/TreeMapPage";
import LearnPage from "./pages/LearnPage";
import ResourceDetailPage from "./pages/ResourceDetailPage";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            
            {/* Protected Tree Routes */}
            <Route path="/my-trees" element={<ProtectedRoute><MyTreesPage /></ProtectedRoute>} />
            <Route path="/add-tree" element={<ProtectedRoute><AddTreePage /></ProtectedRoute>} />
            <Route path="/trees/:id/edit" element={<ProtectedRoute><EditTreePage /></ProtectedRoute>} />
            
            {/* Public Tree Routes */}
            <Route path="/trees/:id" element={<TreeDetailPage />} />
            <Route path="/map" element={<TreeMapPage />} />
            
            {/* Learn Routes */}
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:id" element={<ResourceDetailPage />} />
            
            {/* Community Routes */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/new" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
            <Route path="/community/:id" element={<PostDetailPage />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
