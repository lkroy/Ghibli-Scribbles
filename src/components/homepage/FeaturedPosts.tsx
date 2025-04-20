
import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '@/types/blog';
import { useBlog } from '@/contexts/BlogContext';
import PostCard from '@/components/blog/PostCard';

const FeaturedPosts: React.FC = () => {
  const { featuredPosts } = useBlog();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className="py-20 relative">
      {/* Mossy green wash behind "Featured Posts" */}
      <div 
        className="absolute top-20 left-0 right-0 h-48 bg-ghibli-moss/5 -z-10" 
        style={{ 
          clipPath: 'polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)'
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-block mb-2"
            variants={titleVariants}
          >
            <span className="category-label bg-ghibli-moss/10 text-ghibli-moss px-4 py-1 rounded-full">
              EDITOR'S PICKS
            </span>
          </motion.div>
          
          <motion.h2 
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-ghibli-forest"
            variants={titleVariants}
          >
            Featured Posts
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-ghibli-sun mx-auto mt-4 rounded-full"
            variants={titleVariants}
          />
        </motion.div>
        
        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-ghibli-bark">No featured posts yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
