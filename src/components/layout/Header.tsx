import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlog } from "@/contexts/BlogContext";
import { FireflyIcon, TotoroIcon } from "@/components/icons/GhibliIcons";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const { categories } = useBlog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-ghibli-forest/95 text-white backdrop-blur-sm shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <TotoroIcon className="h-8 w-8 text-ghibli-sun" />
            </motion.div>
            <motion.h1
              className="font-playfair text-2xl md:text-3xl text-ghibli-sun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ghibli Scribbles
            </motion.h1>
          </Link>

          {/* Mobile menu button */}
          <button
            className="block md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.ul
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              <motion.li whileHover={{ y: -2 }}>
                <Link
                  to="/"
                  className="text-white hover:text-ghibli-sun transition-colors"
                >
                  Home
                </Link>
              </motion.li>
              {categories.map((category) => (
                <motion.li key={category.id} whileHover={{ y: -2 }}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-white hover:text-ghibli-sun transition-colors"
                  >
                    {category.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/new-post"
                className="flex items-center gap-2 bg-ghibli-moss hover:bg-ghibli-sun text-white hover:text-ghibli-bark py-2 px-4 rounded-full transition-colors duration-300"
              >
                <FireflyIcon className="h-5 w-5" />
                <span className="font-shojumaru text-sm">New Post</span>
              </Link>
            </motion.div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  to="/"
                  className="block text-white hover:text-ghibli-sun transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="block text-white hover:text-ghibli-sun transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/new-post"
                  className="flex items-center gap-2 bg-ghibli-moss hover:bg-ghibli-sun text-white py-2 px-4 rounded-full transition-colors duration-300 w-fit"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FireflyIcon className="h-5 w-5" />
                  <span className="font-shojumaru text-sm">New Post</span>
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
