"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Logo from "./Logo";
import GlowEffect from "./GlowEffect";
import { useIsMobile } from "@/hooks/useIsMobile";

// Navigation items
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  
  // Refs
  const isClickNavigating = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Hooks
  useScroll();
  const isMobile = useIsMobile();
  
  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Update active section on scroll
  useEffect(() => {
    const updateScroll = () => {
      // Update navbar background based on scroll position
      setScrolled(window.scrollY > 20);
      
      // Skip if user clicked a nav link recently (avoids competing with smooth scroll)
      if (isClickNavigating.current) return;
      
      // Find the active section
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      let currentSection = "home";
      
      // Throttle for performance
      const throttleCheck = () => {
        // Use a more efficient approach with getBoundingClientRect()
        for (const section of sections) {
          const element = document.getElementById(section);
          if (!element) continue;
          
          const rect = element.getBoundingClientRect();
          // Consider a section active when it's top is near the viewport top
          // with some tolerance to improve user experience
          const threshold = window.innerHeight * 0.3;
          
          if (rect.top <= threshold && rect.bottom >= threshold) {
            currentSection = section;
            break;
          }
        }
        
        setActiveSection(currentSection);
      };
      
      // Throttled function for better performance
      requestAnimationFrame(throttleCheck);
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle section navigation via links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Close mobile menu
      setIsOpen(false);
      
      // Mark as navigating to avoid scroll detection temporarily
      isClickNavigating.current = true;
      
      // Set active section immediately for better UX
      setActiveSection(targetId);
      
      // Smooth scroll to the section
      element.scrollIntoView({ behavior: "smooth" });
      
      // Clear any existing timer
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
      
      // Reset the flag after scrolling is likely complete
      clickTimerRef.current = setTimeout(() => {
        isClickNavigating.current = false;
      }, 1000);
    }
  };

  // Navbar variants - optimized for mobile
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 300,
        damping: isMobile ? 25 : 20,
        duration: isMobile ? 0.5 : 0.7
      }
    }
  };
  
  // Mobile menu variants - simplified for mobile
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: isMobile ? -20 : -30,
      transition: {
        duration: isMobile ? 0.2 : 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.05 : 0.07,
        delayChildren: 0.05
      }
    }
  };
  
  // Mobile nav items variants - simplified for mobile
  const navItemVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? -10 : -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 300,
        damping: isMobile ? 25 : 20
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${scrolled ? 'bg-base-100/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Logo onClick={() => {
          setActiveSection("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }} showFullName={!isMobile} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.substring(1);
              
              return (
                <li key={href}>
                  <GlowEffect 
                    color="accent" 
                    size={0.7} 
                    intensity={0.4} 
                    followCursor={!isMobile} 
                    pulseEffect={false}
                    mobileOptimized={true}
                  >
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={`relative px-4 py-2 text-sm rounded-md transition-colors duration-300 ${isActive ? 'text-accent' : 'text-base-content/70 hover:text-base-content'}`}
                    >
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                          style={{ willChange: "transform, opacity" }}
                          transition={{ 
                            type: "spring", 
                            stiffness: isMobile ? 350 : 500, 
                            damping: isMobile ? 30 : 25 
                          }}
                        />
                      )}
                    </a>
                  </GlowEffect>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Mobile Menu Hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="flex flex-col justify-center items-center w-6 h-6">
            <span 
              className={`block h-0.5 w-full bg-base-content transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              style={{ transformOrigin: "center" }}
            />
            <span 
              className={`block h-0.5 w-full bg-base-content transition-all duration-300 ease-out my-1 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span 
              className={`block h-0.5 w-full bg-base-content transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              style={{ transformOrigin: "center" }}
            />
          </div>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-base-100/95 backdrop-blur-md shadow-lg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            style={{ willChange: "transform, opacity" }}
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-2">
                {NAV_ITEMS.map(({ label, href }) => {
                  const isActive = activeSection === href.substring(1);
                  
                  return (
                    <motion.li 
                      key={href}
                      variants={navItemVariants}
                    >
                      <a
                        href={href}
                        onClick={(e) => handleNavClick(e, href)}
                        className={`block px-4 py-3 text-lg rounded-md transition-colors duration-300 ${isActive ? 'bg-base-200/50 text-accent font-medium' : 'text-base-content hover:bg-base-200/30'}`}
                      >
                        {label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}