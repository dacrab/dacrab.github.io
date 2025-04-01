import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center py-20"
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-2 border-accent rounded-full animate-spin mb-4"></div>
        <p className="text-muted">Loading GitHub projects...</p>
      </div>
    </motion.div>
  );
} 