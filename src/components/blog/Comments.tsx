
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlog } from '@/contexts/BlogContext';
import { Comment } from '@/types/blog';
import { DragonIcon } from '@/components/icons/GhibliIcons';
import { Pencil, Trash2 } from 'lucide-react';

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { getCommentsByPostId, createComment, updateComment, deleteComment } = useBlog();
  const comments = getCommentsByPostId(postId);
  
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) return;
    
    createComment({
      postId,
      author,
      content
    });
    
    // Reset form
    setAuthor('');
    setContent('');
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdate = () => {
    if (!editingCommentId || !editingContent.trim()) return;
    
    const commentToUpdate = comments.find(c => c.id === editingCommentId);
    if (!commentToUpdate) return;
    
    updateComment({
      ...commentToUpdate,
      content: editingContent
    });
    
    // Reset editing state
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(id);
    }
  };

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

  const commentVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    exit: { 
      x: -50, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24, delay: 0.2 }
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center gap-2 mb-6"
          variants={commentVariants}
        >
          <DragonIcon className="h-6 w-6" />
          <h3 className="font-playfair text-2xl">Comments</h3>
        </motion.div>
        
        {/* Comments list */}
        <AnimatePresence>
          {comments.length > 0 ? (
            <motion.div 
              className="space-y-4 mb-8"
              variants={containerVariants}
            >
              {comments.map(comment => (
                <motion.div
                  key={comment.id}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-ghibli-mist/30"
                  variants={commentVariants}
                  exit="exit"
                  layout
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-ghibli-forest">{comment.author}</h4>
                    
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(comment)}
                        className="text-ghibli-moss hover:text-ghibli-forest transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Pencil size={16} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDelete(comment.id)}
                        className="text-ghibli-moss hover:text-red-500 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                  
                  {editingCommentId === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editingContent}
                        onChange={e => setEditingContent(e.target.value)}
                        className="w-full p-2 border border-ghibli-mist rounded-md focus:outline-none focus:ring-2 focus:ring-ghibli-moss"
                        rows={3}
                      />
                      
                      <div className="flex justify-end gap-2 mt-2">
                        <motion.button
                          onClick={() => setEditingCommentId(null)}
                          className="px-3 py-1 text-sm border border-ghibli-mist rounded-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Cancel
                        </motion.button>
                        
                        <motion.button
                          onClick={handleUpdate}
                          className="px-3 py-1 text-sm bg-ghibli-moss text-white rounded-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Update
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1 text-ghibli-bark">{comment.content}</p>
                  )}
                  
                  <p className="text-xs text-ghibli-bark/60 mt-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                    {comment.updatedAt && comment.updatedAt !== comment.createdAt && 
                      ' (edited)'}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p 
              className="text-ghibli-bark mb-8"
              variants={commentVariants}
            >
              No comments yet. Be the first to share your thoughts!
            </motion.p>
          )}
        </AnimatePresence>
        
        {/* Add comment form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-ghibli-mist/30"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h4 className="font-playfair text-xl mb-4">Add Your Comment</h4>
          
          <div className="mb-4">
            <label 
              htmlFor="author" 
              className="block text-sm font-medium text-ghibli-bark mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full p-2 border border-ghibli-mist rounded-md focus:outline-none focus:ring-2 focus:ring-ghibli-moss"
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-ghibli-bark mb-1"
            >
              Your Comment
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full p-2 border border-ghibli-mist rounded-md focus:outline-none focus:ring-2 focus:ring-ghibli-moss"
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="bg-ghibli-moss hover:bg-ghibli-sun text-white py-2 px-6 rounded-full transition-colors font-shojumaru text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Comment
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Comments;
