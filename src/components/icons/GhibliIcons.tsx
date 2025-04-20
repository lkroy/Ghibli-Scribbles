
import React from "react";
import { cn } from "@/lib/utils";
import { Leaf, Home, MessageSquare, Bookmark, Star, TreeDeciduous } from "lucide-react";
import { motion } from "framer-motion";

// Base icon component
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Leaf category icon
export const LeafIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div
    initial={{ rotate: -15 }}
    animate={{ rotate: 5 }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
  >
    <Leaf 
      className={cn("text-ghibli-moss", className)} 
      {...props} 
    />
  </motion.div>
);

// Totoro home icon
export const TotoroIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <div className={cn("relative", className)}>
    <Home 
      className={cn("text-ghibli-bark", className)} 
      {...props} 
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1/3 h-1/3 rounded-full bg-white/70"></div>
    </div>
    <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-ghibli-bark"></div>
    <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-ghibli-bark"></div>
  </div>
);

// Spirited Away dragon (comments icon)
export const DragonIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="relative"
  >
    <MessageSquare 
      className={cn("text-ghibli-sky", className)} 
      {...props} 
    />
    <motion.div 
      className="absolute -top-1 -right-1 w-2 h-2 bg-ghibli-sun rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

// Firefly "New Post" icon
export const FireflyIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="relative"
  >
    <svg 
      viewBox="0 0 24 24" 
      className={cn("w-6 h-6 text-ghibli-sun fill-current", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
    </svg>
    <motion.div 
      className="absolute inset-0 rounded-full bg-ghibli-sun/30"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

// Featured star icon
export const GhibliStarIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
    <Star 
      className={cn("text-ghibli-sun", className)} 
      {...props} 
      fill="currentColor" 
    />
  </motion.div>
);

// Kodama spirit icon (for social media)
export const KodamaIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div 
    whileHover={{ rotate: [0, 15, -15, 0] }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <svg 
      viewBox="0 0 24 24" 
      className={cn("w-6 h-6 text-ghibli-mist fill-current", className)}
      {...props}
    >
      <circle cx="12" cy="10" r="6" />
      <circle cx="12" cy="9" r="4" className="text-white fill-current" />
      <circle cx="10" cy="8" r="1" className="text-ghibli-bark fill-current" />
      <circle cx="14" cy="8" r="1" className="text-ghibli-bark fill-current" />
      <path d="M12 11 L12 14" stroke="currentColor" strokeWidth="1" />
    </svg>
  </motion.div>
);

// Bookmark with animation
export const GhibliBookmarkIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
    <Bookmark 
      className={cn("text-ghibli-moss", className)} 
      {...props} 
    />
  </motion.div>
);

// Tree icon for nature category
export const GhibliTreeIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <motion.div 
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.3 }}
  >
    <TreeDeciduous 
      className={cn("text-ghibli-forest", className)} 
      {...props} 
    />
  </motion.div>
);
