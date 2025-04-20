
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlog } from '@/contexts/BlogContext';
import { LeafIcon } from '@/components/icons/GhibliIcons';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CategorySidebar: React.FC = () => {
  const { categories } = useBlog();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: { duration: 0.3 }
    },
    collapsed: {
      width: '60px',
      transition: { duration: 0.3 }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.aside
      className="bg-ghibli-forest/10 backdrop-blur-sm border-r border-ghibli-bark/20 h-screen sticky top-0 pt-20 overflow-hidden"
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Toggle button */}
        <motion.button
          className="absolute top-20 right-2 p-2 rounded-full bg-ghibli-moss/20 hover:bg-ghibli-moss/40 text-ghibli-forest"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </motion.button>

        {/* Title */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h2
              className="font-playfair text-xl text-ghibli-forest mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Categories
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Category list */}
        <div className="space-y-2">
          <Link to="/">
            <motion.div
              className={`flex items-center p-2 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'bg-ghibli-moss/20 text-ghibli-bark hover:text-ghibli-bark' 
                  : 'hover:bg-ghibli-moss/10 text-ghibli-bark hover:text-ghibli-bark'
              }`}
              whileHover={{ x: isCollapsed ? 0 : 5 }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={categoryVariants}
            >
              <LeafIcon className="h-5 w-5" />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className="ml-3 font-anime-ace text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    All Posts
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Categories */}
          {categories.map((category, index) => (
            <Link key={category.id} to={`/category/${category.slug}`}>
              <motion.div
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  location.pathname === `/category/${category.slug}` 
                    ? 'bg-ghibli-moss/20 text-ghibli-bark hover:text-ghibli-bark' 
                    : 'hover:bg-ghibli-moss/10 text-ghibli-bark hover:text-ghibli-bark'
                }`}
                whileHover={{ x: isCollapsed ? 0 : 5 }}
                custom={index + 1}
                initial="hidden"
                animate="visible"
                variants={categoryVariants}
              >
                <LeafIcon className="h-5 w-5" />
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="ml-3 font-anime-ace text-sm truncate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {category.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default CategorySidebar;
