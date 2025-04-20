
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "@/contexts/BlogContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import PostForm from "./components/blog/PostForm";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

// New Post Page Component
const NewPost = () => (
  <MainLayout>
    <PostForm />
  </MainLayout>
);

// Edit Post Page Component
const EditPost = () => (
  <MainLayout>
    <PostForm isEdit={true} />
  </MainLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BlogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/edit-post/:slug" element={<EditPost />} />
            <Route path="/category/:slug" element={<Posts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
