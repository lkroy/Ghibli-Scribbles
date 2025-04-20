
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/blog/PostCard';
import { useBlog } from '@/contexts/BlogContext';

const Posts: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { posts, categories, getPostsByCategory, getCategoryBySlug } = useBlog();
  
  // Get filtered posts based on category slug if present
  const filteredPosts = slug 
    ? getPostsByCategory(getCategoryBySlug(slug)?.id || '') 
    : posts;
  
  // Get category name for title if filtering by category
  const categoryName = slug ? getCategoryBySlug(slug)?.name : null;

  // Set document title
  useEffect(() => {
    document.title = categoryName 
      ? `${categoryName} - Ghibli Scribbles` 
      : 'All Posts - Ghibli Scribbles';
  }, [categoryName]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <motion.div
          className="mb-10 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="font-playfair text-4xl md:text-5xl text-ghibli-forest mb-4"
            variants={headerVariants}
          >
            {categoryName ? categoryName : 'All Posts'}
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-ghibli-sun mx-auto mb-4 rounded-full"
            variants={headerVariants}
          />
          
          <motion.p 
            className="text-ghibli-bark max-w-2xl mx-auto"
            variants={headerVariants}
          >
            {categoryName 
              ? `Explore our collection of posts about ${categoryName}.`
              : 'Explore our collection of stories, artwork, and musings inspired by the magical worlds of Studio Ghibli.'}
          </motion.p>
        </motion.div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-ghibli-bark">No posts found.</p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Posts;
