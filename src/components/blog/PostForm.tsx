
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlog } from '@/contexts/BlogContext';
import { Post } from '@/types/blog';

interface PostFormProps {
  post?: Post; // If editing an existing post
  isEdit?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ post, isEdit = false }) => {
  const { categories, createPost, updatePost } = useBlog();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [categoryId, setCategoryId] = useState(post?.categoryId || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86');
  const [featured, setFeatured] = useState(post?.featured || false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!categoryId) newErrors.categoryId = 'Category is required';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (isEdit && post) {
      // Update existing post
      updatePost({
        ...post,
        title,
        content,
        excerpt,
        categoryId,
        imageUrl,
        featured
      });
      
      navigate(`/post/${post.slug}`);
    } else {
      // Create new post
      const slug = generateSlug(title);
      const newPost = createPost({
        title,
        slug,
        content,
        excerpt,
        categoryId,
        imageUrl,
        featured
      });
      
      navigate(`/post/${newPost.slug}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="font-playfair text-3xl text-ghibli-forest mb-6"
        variants={itemVariants}
      >
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </motion.h2>
      
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-ghibli-mist/30"
        variants={containerVariants}
      >
        {/* Title field */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-ghibli-bark mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-ghibli-mist'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-moss`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </motion.div>
        
        {/* Excerpt field */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label 
            htmlFor="excerpt" 
            className="block text-sm font-medium text-ghibli-bark mb-1"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            className={`w-full p-3 border ${errors.excerpt ? 'border-red-500' : 'border-ghibli-mist'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-moss`}
            rows={2}
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>
          )}
        </motion.div>
        
        {/* Content field */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-ghibli-bark mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className={`w-full p-3 border ${errors.content ? 'border-red-500' : 'border-ghibli-mist'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-moss`}
            rows={12}
          />
          <p className="mt-1 text-xs text-ghibli-bark">
            You can use Markdown for formatting.
          </p>
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
          )}
        </motion.div>
        
        {/* Category field */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label 
            htmlFor="category" 
            className="block text-sm font-medium text-ghibli-bark mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className={`w-full p-3 border ${errors.categoryId ? 'border-red-500' : 'border-ghibli-mist'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-moss`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
          )}
        </motion.div>
        
        {/* Image URL field */}
        <motion.div className="mb-6" variants={itemVariants}>
          <label 
            htmlFor="imageUrl" 
            className="block text-sm font-medium text-ghibli-bark mb-1"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className={`w-full p-3 border ${errors.imageUrl ? 'border-red-500' : 'border-ghibli-mist'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-moss`}
          />
          {imageUrl && (
            <div className="mt-2 h-32 w-full overflow-hidden rounded-lg">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86';
                }}
              />
            </div>
          )}
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>
          )}
        </motion.div>
        
        {/* Featured checkbox */}
        <motion.div className="mb-6 flex items-center" variants={itemVariants}>
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={e => setFeatured(e.target.checked)}
            className="h-4 w-4 text-ghibli-moss focus:ring-ghibli-moss border-ghibli-mist rounded"
          />
          <label 
            htmlFor="featured" 
            className="ml-2 block text-sm font-medium text-ghibli-bark"
          >
            Featured post
          </label>
        </motion.div>
        
        {/* Form actions */}
        <motion.div 
          className="flex justify-end gap-4"
          variants={itemVariants}
        >
          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-ghibli-moss text-ghibli-moss rounded-full transition-colors hover:bg-ghibli-moss/10 font-shojumaru text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            className="px-6 py-2 bg-ghibli-moss text-white rounded-full transition-colors hover:bg-ghibli-sun font-shojumaru text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEdit ? 'Update Post' : 'Create Post'}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default PostForm;
