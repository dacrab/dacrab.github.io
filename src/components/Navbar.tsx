"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Logo from "./Logo";
import GlowEffect from "./GlowEffect";

// Constants
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isClickNavigating = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Handle scroll events
  useEffect(() => {
    const updateScrollState = (y: number) => {
      setScrolled(y > 20);
      
      // Don't update active section if click navigation is in progress
      if (isClickNavigating.current) return;
      
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = y + window.innerHeight / 3;
      
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    const unsubscribe = scrollY.onChange(updateScrollState);
    return unsubscribe;
  }, [scrollY]);

  // Handle navigation click
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      if (isOpen) setIsOpen(false);
      
      // Set active section immediately to prevent double animation
      setActiveSection(targetId);
      
      // Set flag to prevent scroll events from changing activeSection during navigation
      isClickNavigating.current = true;
      
      // Clear any existing timers
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
      
      // Scroll to the target element
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      // Reset flag after navigation animation is likely complete
      clickTimerRef.current = setTimeout(() => {
        isClickNavigating.current = false;
      }, 1000); // 1 second should cover most smooth scrolling animations
    }
  }, [isOpen]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // Navbar styles
  const navbarStyle = {
    backgroundColor: scrolled ? 'var(--card)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    boxShadow: scrolled ? '0 4px 20px rgba(var(--foreground-rgb), 0.05)' : 'none',
    opacity: scrolled ? 0.9 : 1,
  };

  // Render navigation items with optimized hover behavior
  const renderNavItem = (item: typeof NAV_ITEMS[0], index: number, isMobile = false) => {
    const isActive = activeSection === item.href.substring(1);
    
    return (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, [isMobile ? 'x' : 'y']: isMobile ? -20 : -10 }}
        animate={{ opacity: 1, [isMobile ? 'x' : 'y']: 0 }}
        transition={{ delay: index * 0.1 + (isMobile ? 0 : 0.3) }}
        className="relative"
      >
        <a
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={`${isMobile ? 'block py-3 px-4 rounded-lg my-1' : 'px-4 py-2 rounded-lg relative'} 
            transition-all duration-300 ${
            isActive
              ? isMobile ? "bg-accent/10 text-accent" : "text-accent"
              : isMobile ? "hover:bg-accent/5" : "text-foreground hover:text-accent"
          }`}
        >
          {!isMobile && isActive && (
            <motion.span
              layoutId="navIndicator"
              className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                // Important: only animate on layoutId changes, not on subsequent renders
                layout: {
                  duration: 0.3
                }
              }}
            />
          )}
          
          {/* Hover effect using animate presence */}
          {!isMobile && !isActive && (
            <motion.span
              className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-accent/40 rounded"
              initial={{ scaleX: 0, opacity: 0 }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ originX: 0.5 }}
            />
          )}
          
          {item.label}
        </a>
      </motion.div>
    );
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={navbarStyle}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo using new component */}
          <div className="relative">
            <GlowEffect 
              color="accent" 
              intensity={0.2} 
              size={1.3} 
              pulseEffect={true}
              shape="blob" 
            >
              <Logo 
                size={scrolled ? "sm" : "md"} 
                showFullName={!scrolled}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }}
              />
            </GlowEffect>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item, index) => renderNavItem(item, index))}
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="ml-4 px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
              >
                Hire Me
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground p-2 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transform transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
              >
                <path 
                  d={isOpen ? "M18 6L6 18M6 6L18 18" : "M4 6H20M4 12H20M4 18H20"} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-card/80 backdrop-blur-md border border-border mx-4 mt-2 rounded-xl shadow-lg"
          >
            <div className="px-4 py-2">
              {NAV_ITEMS.map((item, index) => renderNavItem(item, index, true))}
              
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="block py-3 px-4 mt-3 mb-1 bg-accent text-white rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}