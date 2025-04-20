
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Post, Comment, Category } from "@/types/blog";
import * as LocalStorage from "@/utils/localStorage";

interface BlogContextType {
  posts: Post[];
  categories: Category[];
  featuredPosts: Post[];
  comments: Comment[];
  
  // Post actions
  getPostById: (id: string) => Post | undefined;
  getPostBySlug: (slug: string) => Post | undefined;
  getPostsByCategory: (categoryId: string) => Post[];
  createPost: (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => Post;
  updatePost: (post: Post) => Post;
  deletePost: (id: string) => void;
  
  // Comment actions
  getCommentsByPostId: (postId: string) => Comment[];
  createComment: (comment: Omit<Comment, "id" | "createdAt">) => Comment;
  updateComment: (comment: Comment) => Comment;
  deleteComment: (id: string) => void;
  
  // Category actions
  getCategoryById: (id: string) => Category | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  createCategory: (category: Omit<Category, "id">) => Category;
  updateCategory: (category: Category) => Category;
  deleteCategory: (id: string) => void;
  
  // Refresh data (for when we need to force a rerender)
  refreshData: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  
  const loadData = () => {
    // Initialize data if not already present
    LocalStorage.seedInitialData();
    
    // Load data from localStorage
    setPosts(LocalStorage.getPosts());
    setCategories(LocalStorage.getCategories());
    setComments(LocalStorage.getComments());
    setFeaturedPosts(LocalStorage.getFeaturedPosts());
  };
  
  // Load initial data
  useEffect(() => {
    loadData();
  }, []);
  
  const refreshData = () => {
    loadData();
  };
  
  // Post actions
  const getPostById = (id: string) => LocalStorage.getPostById(id);
  const getPostBySlug = (slug: string) => LocalStorage.getPostBySlug(slug);
  const getPostsByCategory = (categoryId: string) => LocalStorage.getPostsByCategory(categoryId);
  
  const createPost = (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const newPost = LocalStorage.createPost(post);
    refreshData();
    return newPost;
  };
  
  const updatePost = (post: Post) => {
    const updatedPost = LocalStorage.updatePost(post);
    refreshData();
    return updatedPost;
  };
  
  const deletePost = (id: string) => {
    LocalStorage.deletePost(id);
    refreshData();
  };
  
  // Comment actions
  const getCommentsByPostId = (postId: string) => LocalStorage.getCommentsByPostId(postId);
  
  const createComment = (comment: Omit<Comment, "id" | "createdAt">) => {
    const newComment = LocalStorage.createComment(comment);
    refreshData();
    return newComment;
  };
  
  const updateComment = (comment: Comment) => {
    const updatedComment = LocalStorage.updateComment(comment);
    refreshData();
    return updatedComment;
  };
  
  const deleteComment = (id: string) => {
    LocalStorage.deleteComment(id);
    refreshData();
  };
  
  // Category actions
  const getCategoryById = (id: string) => LocalStorage.getCategoryById(id);
  const getCategoryBySlug = (slug: string) => LocalStorage.getCategoryBySlug(slug);
  
  const createCategory = (category: Omit<Category, "id">) => {
    const newCategory = LocalStorage.createCategory(category);
    refreshData();
    return newCategory;
  };
  
  const updateCategory = (category: Category) => {
    const updatedCategory = LocalStorage.updateCategory(category);
    refreshData();
    return updatedCategory;
  };
  
  const deleteCategory = (id: string) => {
    LocalStorage.deleteCategory(id);
    refreshData();
  };
  
  const value = {
    posts,
    categories,
    featuredPosts,
    comments,
    
    getPostById,
    getPostBySlug,
    getPostsByCategory,
    createPost,
    updatePost,
    deletePost,
    
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment,
    
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
    
    refreshData
  };
  
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
