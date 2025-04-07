import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

interface LoadingSpinnerProps {
  delay?: number;
}

// Memoize the component to prevent unnecessary re-renders
const LoadingSpinner = memo(function LoadingSpinner({ delay = 600 }: LoadingSpinnerProps) {
  const [showSpinner, setShowSpinner] = useState(false);
  
  // Only show spinner after a delay to avoid flashing for quick loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!showSpinner) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center py-10"
    >
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-t-2 border-accent/70 rounded-full animate-spin mb-2"></div>
        <p className="text-muted text-xs">Loading projects...</p>
      </div>
    </motion.div>
  );
});

export default LoadingSpinner; 