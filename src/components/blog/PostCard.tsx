
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post, Category } from '@/types/blog';
import { useBlog } from '@/contexts/BlogContext';
import { GhibliStarIcon } from '@/components/icons/GhibliIcons';

interface PostCardProps {
  post: Post;
  index?: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, index = 0 }) => {
  const { getCategoryById } = useBlog();
  const category = getCategoryById(post.categoryId);

  return (
    <motion.article 
      className="post-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <Link to={`/post/${post.slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          {/* Image */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Category tag */}
          <div className="absolute top-3 left-3">
            <motion.span
              className="category-label inline-block bg-ghibli-forest/70 backdrop-blur-sm text-white px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              {category?.name || 'Uncategorized'}
            </motion.span>
          </div>
          
          {/* Featured badge */}
          {post.featured && (
            <motion.div 
              className="absolute top-3 right-3"
              initial={{ rotate: -15 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GhibliStarIcon className="h-6 w-6 drop-shadow-lg" />
            </motion.div>
          )}
        </div>
        
        <div className="p-5 relative">
          {/* Watercolor wash for the moss green behind the title */}
          <div 
            className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl" 
            style={{ 
              background: 'radial-gradient(circle at top right, rgba(107, 142, 35, 0.1), transparent 70%)'
            }}
          />

          {/* Post title */}
          <h3 className="font-playfair text-xl md:text-2xl font-bold mb-2 text-ghibli-bark transition-colors group-hover:text-ghibli-forest">
            {post.title}
          </h3>
          
          {/* Post excerpt */}
          <p className="text-ghibli-bark/80 text-sm line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          
          {/* Read more link */}
          <motion.div 
            className="inline-flex items-center text-ghibli-moss group-hover:text-ghibli-sun"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm font-medium">Read more</span>
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
