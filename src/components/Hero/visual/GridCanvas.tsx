"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import GridLines from "./GridLines";
import GridIntersections from "./GridIntersections";
import GeometricShapes from "./GeometricShapes";
import TypographyElements from "./TypographyElements";
import FloatingElements from "./FloatingElements";

/**
 * Grid canvas that combines all visual elements into a cohesive Swiss design composition
 */
const GridCanvas = memo(function GridCanvas() {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
    >
      {/* Central geometric composition */}
      <div className="relative w-4/5 h-4/5">
        {/* Animated grid lines */}
        <GridLines />
        
        {/* Animated grid intersections */}
        <GridIntersections />
        
        {/* Geometric shapes */}
        <GeometricShapes />
        
        {/* Typography elements */}
        <TypographyElements />
        
        {/* Floating elements */}
        <FloatingElements />
      </div>
    </motion.div>
  );
});

export default GridCanvas;