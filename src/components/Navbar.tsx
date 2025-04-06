"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Logo from "./Logo";
import GlowEffect from "./GlowEffect";

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
  const { scrollY } = useScroll();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
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
    const updateScrollState = (y: number) => {
      setScrolled(y > 20);
      
      if (isClickNavigating.current) return;
      
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = y + window.innerHeight / 3;
      
      for (const section of sections) {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionBottom = sectionTop + sectionElement.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    return scrollY.onChange(updateScrollState);
  }, [scrollY]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // Handlers
  const toggleMenu = () => setIsOpen(prev => !prev);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    // Close mobile menu first
    if (isOpen) setIsOpen(false);
    
    // Set active section immediately
    setActiveSection(targetId);
    
    // Prevent scroll events from changing activeSection during navigation
    isClickNavigating.current = true;
    
    // Clear any existing timers
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }
    
    // Small delay to allow mobile menu to close before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth'
      });
      
      // Reset flag after animation completes
      clickTimerRef.current = setTimeout(() => {
        isClickNavigating.current = false;
      }, 1000);
    }, isOpen ? 300 : 0);
  };

  // Styles
  const navbarStyle = {
    backgroundColor: scrolled ? 'var(--card)' : 'transparent',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    boxShadow: scrolled ? '0 2px 10px rgba(var(--foreground-rgb), 0.05)' : 'none',
    opacity: scrolled ? 0.95 : 1,
    transition: 'all 0.25s ease-out'
  };

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: isMobile ? 0.2 : 0.3 }
  };

  // Component rendering functions
  const renderNavItem = (item: typeof NAV_ITEMS[0], index: number, isMobile = false) => {
    const isActive = activeSection === item.href.substring(1);
    const delay = isMobile ? 0.05 * index : 0.1 * index;
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return (
      <motion.div
        key={item.label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.2 }}
        className="relative"
      >
        <a
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={`${isMobile ? 'block py-2.5 px-4 rounded-lg my-1' : 'px-4 py-2 rounded-lg relative'} 
            transition-all duration-200 ${
            isActive
              ? isMobile ? "bg-accent/10 text-accent" : "text-accent"
              : isMobile ? "hover:bg-accent/5" : "text-foreground hover:text-accent"
          }`}
        >
          {!isMobile && isActive && !prefersReducedMotion && (
            <motion.span
              layoutId="navIndicator"
              className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                duration: 0.2
              }}
            />
          )}
          
          {!isMobile && isActive && prefersReducedMotion && (
            <span className="absolute inset-0 bg-accent/10 rounded-lg -z-10" />
          )}
          
          {item.label}
        </a>
      </motion.div>
    );
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-250 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
      {...animationProps}
      transition={{ duration: 0.3 }}
      style={navbarStyle}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative">
            <GlowEffect 
              color="accent" 
              intensity={0.15} 
              size={1.2} 
              pulseEffect={!isMobile}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
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
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200"
              style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
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
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-card/90 backdrop-blur-md border border-border mx-4 mt-2 rounded-xl shadow-md"
          >
            <div className="px-4 py-2">
              {NAV_ITEMS.map((item, index) => renderNavItem(item, index, true))}
              
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="block py-2.5 px-4 mt-3 mb-1 bg-accent text-white rounded-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
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