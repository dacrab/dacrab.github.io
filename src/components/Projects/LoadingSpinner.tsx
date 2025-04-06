import { motion } from "framer-motion";
import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center py-16"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-t-2 border-accent rounded-full animate-spin mb-3"></div>
        <p className="text-muted text-sm">Loading GitHub projects...</p>
      </div>
    </motion.div>
  );
});

export default LoadingSpinner; 