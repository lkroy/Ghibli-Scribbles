
import React from 'react';
import { motion } from 'framer-motion';
import { KodamaIcon } from '@/components/icons/GhibliIcons';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
    { name: 'Facebook', url: 'https://facebook.com', icon: Facebook },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <footer className="bg-ghibli-forest/90 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="wavy-divider -mt-16 mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="font-playfair text-2xl text-ghibli-sun mb-3"
              variants={itemVariants}
            >
              Ghibli Scribbles
            </motion.h2>
            <motion.p 
              className="text-sm text-ghibli-mist mb-4 text-center md:text-left"
              variants={itemVariants}
            >
              A magical space for Studio Ghibli enthusiasts to share their thoughts, 
              art, and love for Miyazaki's enchanted universes.
            </motion.p>
          </motion.div>

          {/* Quick links */}
          <motion.div 
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h3 
              className="font-playfair text-xl text-ghibli-sun mb-4"
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <motion.div 
              className="flex flex-col space-y-2 items-center"
              variants={containerVariants}
            >
              <motion.a 
                href="/" 
                className="text-ghibli-mist hover:text-ghibli-sun transition-colors"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                Home
              </motion.a>
              <motion.a 
                href="/new-post" 
                className="text-ghibli-mist hover:text-ghibli-sun transition-colors"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                New Post
              </motion.a>
              <motion.a 
                href="/about" 
                className="text-ghibli-mist hover:text-ghibli-sun transition-colors"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                About
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social media */}
          <motion.div 
            className="flex flex-col items-center md:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h3 
              className="font-playfair text-xl text-ghibli-sun mb-4"
              variants={itemVariants}
            >
              Follow Us
            </motion.h3>
            <motion.div 
              className="flex space-x-4"
              variants={containerVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-ghibli-mist hover:text-ghibli-sun transition-colors"
                >
                  <link.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-10 pt-4 border-t border-ghibli-bark/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-ghibli-mist/70 font-quicksand">
            &copy; {new Date().getFullYear()} Ghibli Scribbles. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
