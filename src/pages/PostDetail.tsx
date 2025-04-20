import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlog } from '@/contexts/BlogContext';
import MainLayout from '@/components/layout/MainLayout';
import Comments from '@/components/blog/Comments';
import { LeafIcon, GhibliBookmarkIcon } from '@/components/icons/GhibliIcons';
import { Edit, Trash2 } from 'lucide-react';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getPostBySlug, getCategoryById, deletePost } = useBlog();
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const category = post ? getCategoryById(post.categoryId) : undefined;

  // Set document title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Ghibli Scribbles`;
    } else {
      document.title = 'Post Not Found - Ghibli Scribbles';
    }
  }, [post]);

  // Handle post deletion
  const handleDelete = () => {
    if (!post) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/posts');
    }
  };

  // Format post date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-playfair text-3xl text-ghibli-bark mb-4">Post Not Found</h1>
          <p className="text-ghibli-bark mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/posts"
            className="inline-block px-6 py-2 bg-ghibli-moss text-white rounded-full hover:bg-ghibli-sun transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </MainLayout>
    );
  }

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

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={post.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          {/* Hero image */}
          <div className="w-full h-[40vh] relative">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${post.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ghibli-forest/90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {category && (
                  <motion.div variants={contentVariants}>
                    <Link 
                      to={`/category/${category.slug}`}
                      className="category-label inline-block bg-ghibli-forest/70 backdrop-blur-sm text-white px-4 py-1 rounded-full mb-4"
                    >
                      {category.name}
                    </Link>
                  </motion.div>
                )}
                
                <motion.h1 
                  className="font-playfair text-4xl md:text-5xl text-white mb-2"
                  variants={contentVariants}
                >
                  {post.title}
                </motion.h1>
                
                <motion.div 
                  className="flex items-center text-ghibli-mist text-sm mb-4"
                  variants={contentVariants}
                >
                  <time>{formatDate(post.createdAt)}</time>
                  {post.updatedAt !== post.createdAt && (
                    <span className="ml-2">(Updated: {formatDate(post.updatedAt)})</span>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 -mt-10 relative">
              {/* Main content */}
              <motion.article 
                className="flex-1 bg-white/90 backdrop-blur-sm shadow-xl rounded-t-2xl p-6 lg:p-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Post actions */}
                <motion.div 
                  className="flex justify-end gap-2 mb-6"
                  variants={contentVariants}
                >
                  <motion.button
                    onClick={() => navigate(`/edit-post/${post.slug}`)}
                    className="p-2 text-ghibli-moss hover:text-ghibli-forest transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={20} />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDelete}
                    className="p-2 text-ghibli-moss hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </motion.div>
                
                {/* Post content */}
                <motion.div 
                  className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-ghibli-forest prose-p:text-ghibli-bark/90 prose-strong:text-ghibli-forest prose-a:text-ghibli-moss prose-a:no-underline hover:prose-a:text-ghibli-sun prose-blockquote:border-l-ghibli-moss prose-blockquote:bg-ghibli-mist/20 prose-blockquote:p-2 prose-blockquote:rounded-r-lg"
                  variants={contentVariants}
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                />
                
                {/* Post metadata */}
                <motion.div 
                  className="mt-10 pt-6 border-t border-ghibli-mist flex items-center justify-between"
                  variants={contentVariants}
                >
                  <div className="flex items-center">
                    <LeafIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm text-ghibli-bark">Filed under: </span>
                    <Link
                      to={`/category/${category?.slug}`}
                      className="ml-1 text-sm text-ghibli-moss hover:text-ghibli-forest"
                    >
                      {category?.name}
                    </Link>
                  </div>
                  
                  <motion.button
                    className="flex items-center text-ghibli-moss hover:text-ghibli-sun transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GhibliBookmarkIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">Bookmark</span>
                  </motion.button>
                </motion.div>
              </motion.article>
            </div>
            
            {/* Comments section */}
            <div className="bg-ghibli-mist/30 backdrop-blur-sm rounded-b-2xl mb-20">
              <Comments postId={post.id} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
};

export default PostDetail;
