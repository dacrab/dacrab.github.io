"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import SwissMotion from "../SwissMotion";
import { ButtonGroupProps } from "./types";
import { smoothScroll } from "./utils";

/**
 * Button group with project view and CV download functionality
 */
const ButtonGroup = memo(function ButtonGroup({ 
  showCVDropdown, 
  setShowCVDropdown, 
  handleCVDownload,
  isMobile
}: ButtonGroupProps) {
  const buttonSize = isMobile ? "text-xs" : "text-sm";
  
  // Handler to view projects section
  const handleViewProjects = () => smoothScroll('projects');
  
  // Handler for CV button click
  const handleCVButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCVDropdown(!showCVDropdown);
  };
  
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      <SwissMotion type="fade" delay={0.9} whileHover="lift" whileTap="press">
        <button 
          className={`swiss-button ${buttonSize}`}
          onClick={handleViewProjects}
          aria-label="View projects"
        >
          VIEW PROJECTS
        </button>
      </SwissMotion>
      
      <div className="relative">
        <SwissMotion type="fade" delay={1.1} whileHover="lift" whileTap="press">
          <button
            className={`swiss-button-outline ${buttonSize}`}
            onClick={handleCVButtonClick}
            aria-label="Download CV"
            aria-expanded={showCVDropdown}
            aria-haspopup="true"
          >
            DOWNLOAD CV
          </button>
        </SwissMotion>
        
        {/* CV Download Dropdown */}
        {showCVDropdown && (
          <motion.div 
            className="absolute top-full left-0 mt-2 w-full bg-[var(--background)] swiss-border z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            role="menu"
            aria-orientation="vertical"
          >
            <button
              onClick={() => handleCVDownload("english")}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--accent)]/10 transition-colors duration-150 uppercase"
              role="menuitem"
            >
              English
            </button>
            <button
              onClick={() => handleCVDownload("greek")}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--accent)]/10 transition-colors duration-150 uppercase"
              role="menuitem"
            >
              Greek
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
});

export default ButtonGroup; 