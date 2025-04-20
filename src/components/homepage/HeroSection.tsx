import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

// Falling leaf animation component
const FallingLeaf = ({ delay = 0, top = 0, left = 0 }) => {
  const leafVariants = {
    initial: { top, left, opacity: 0 },
    animate: {
      top: "120vh",
      left: `${left + Math.random() * 100}px`,
      opacity: [0, 1, 1, 0],
      rotate: 720,
      transition: {
        duration: 10 + Math.random() * 5,
        delay,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="absolute z-10"
      variants={leafVariants}
      initial="initial"
      animate="animate"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2C10 2 3 5.5 3 10C3 14.5 10 18 10 18C10 18 17 14.5 17 10C17 5.5 10 2 10 2Z"
          fill="#6B8E23"
          fillOpacity="0.6"
        />
        <path
          d="M10 2V18"
          stroke="#2E4A3D"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const [leaves, setLeaves] = useState<
    { delay: number; top: number; left: number }[]
  >([]);

  // Start animation when component mounts
  useEffect(() => {
    controls.start("visible");

    // Create falling leaves
    const generateLeaves = () => {
      const newLeaves = [];
      for (let i = 0; i < 15; i++) {
        newLeaves.push({
          delay: Math.random() * 15,
          top: -20,
          left: Math.random() * window.innerWidth,
        });
      }
      setLeaves(newLeaves);
    };

    generateLeaves();

    // Regenerate leaves every 15 seconds
    const interval = setInterval(generateLeaves, 15000);

    return () => clearInterval(interval);
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-ghibli-forest/5 to-ghibli-forest/20 z-0" />

      {/* Falling leaves */}
      {leaves.map((leaf, index) => (
        <FallingLeaf
          key={index}
          delay={leaf.delay}
          top={leaf.top}
          left={leaf.left}
        />
      ))}

      {/* Hero content */}
      <div className="container px-4 mx-auto z-10 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.p
            className="text-4xl md:text-5xl text-ghibli-bark/80 font-shojumaru mb-4"
            variants={itemVariants}
          >
            ジブリ
          </motion.p>

          <motion.h1
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-ghibli-forest"
            variants={itemVariants}
          >
            Welcome to the Enchanted Forest
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-ghibli-bark mb-10 font-quicksand"
            variants={itemVariants}
          >
            A magical collection of stories, art, and musings inspired by the
            wonderful world of Studio Ghibli.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/posts"
                className="inline-block bg-ghibli-sun text-ghibli-bark hover:bg-ghibli-moss/80 py-3 px-8 rounded-full font-shojumaru transition-colors shadow-lg"
              >
                Explore Posts
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* Desktop - Learn More */}
              <a
                href="https://ghiblicollection.com/"
                className="hidden sm:inline-block bg-ghibli-moss text-white hover:bg-ghibli-sun hover:text-ghibli-bark py-3 px-8 rounded-full font-shojumaru transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>

              {/* Mobile - New Post */}
              <Link
                to="/new-post"
                className="sm:hidden inline-block bg-ghibli-moss text-white hover:bg-ghibli-sun hover:text-ghibli-bark py-3 px-8 rounded-full font-shojumaru transition-colors"
              >
                New Post
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wavy divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 wavy-divider" />
    </section>
  );
};

export default HeroSection;
