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

// Social links to add to mobile menu
const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/dacrab", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/vaggelis-kavouras", icon: "linkedin" },
  { name: "Email", url: "mailto:contact@example.com", icon: "mail" },
];

// Render social icons
const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case 'mail':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      );
    default:
      return null;
  }
};

export default function Navbar() {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  
  // Refs
  const isClickNavigating = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Hooks
  useScroll();
  const isMobile = useIsMobile();
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
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
  
  // Mobile menu variants - enhanced animations
  const menuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.05 : 0.07,
        delayChildren: 0.05
      }
    }
  };
  
  // Mobile nav items variants - enhanced for a smoother experience
  const navItemVariants = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? -5 : -10, 
      y: isMobile ? -5 : -10 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 300,
        damping: isMobile ? 25 : 20
      }
    }
  };
  
  // Social links variants for staggered animation
  const socialLinkVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 300,
        damping: isMobile ? 25 : 20
      }
    }
  };

  // Create backdrop blur effect that increases with scroll
  const getBlurValue = () => {
    if (!scrolled) return 'backdrop-blur-0';
    return 'backdrop-blur-md';
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${scrolled ? 'bg-base-100/80 shadow-sm' : 'bg-transparent'} ${getBlurValue()}`}
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
        
        {/* Mobile Menu Hamburger - Enhanced with subtle animations */}
        <motion.button
          className="md:hidden relative w-10 h-10 flex items-center justify-center p-2 rounded-md z-20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.95 }}
          whileHover={{ backgroundColor: isOpen ? "rgba(var(--accent-rgb), 0.1)" : "rgba(var(--card-rgb), 0.1)" }}
        >
          <div className="flex flex-col justify-center items-center w-6 h-6">
            <motion.span 
              className="block h-0.5 w-full bg-base-content transition-all duration-300 ease-out"
              animate={{ 
                rotate: isOpen ? 45 : 0, 
                translateY: isOpen ? 2 : 0,
                backgroundColor: isOpen ? "var(--accent)" : "currentColor"
              }}
              style={{ transformOrigin: "center" }}
            />
            <motion.span 
              className="block h-0.5 w-full bg-base-content transition-all duration-300 ease-out my-1"
              animate={{ 
                opacity: isOpen ? 0 : 1,
                width: isOpen ? "0%" : "100%",
                backgroundColor: isOpen ? "var(--accent)" : "currentColor"
              }}
            />
            <motion.span 
              className="block h-0.5 w-full bg-base-content transition-all duration-300 ease-out"
              animate={{ 
                rotate: isOpen ? -45 : 0, 
                translateY: isOpen ? -2 : 0,
                backgroundColor: isOpen ? "var(--accent)" : "currentColor" 
              }}
              style={{ transformOrigin: "center" }}
            />
          </div>
        </motion.button>
      </div>
      
      {/* Mobile Navigation Menu - Enhanced with proper layout and animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden fixed top-[57px] left-0 right-0 min-h-screen overflow-auto bg-base-100/95 backdrop-blur-md z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            style={{ willChange: "transform, opacity", originY: "top" }}
          >
            <div className="container mx-auto py-8 px-6">
              {/* Mobile menu content container */}
              <div className="grid grid-cols-1 gap-8">
                {/* Navigation links */}
                <nav>
                  <h3 className="text-xs uppercase tracking-wider text-muted mb-3 font-medium">Navigation</h3>
                  <ul className="space-y-1">
                    {NAV_ITEMS.map(({ label, href }) => {
                      const isActive = activeSection === href.substring(1);
                      
                      return (
                        <motion.li 
                          key={href}
                          variants={navItemVariants}
                          className="overflow-hidden"
                        >
                          <a
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className={`block px-4 py-3 text-lg rounded-md transition-all duration-300 ${
                              isActive 
                                ? 'bg-accent/10 text-accent font-medium border-l-2 border-accent pl-[calc(1rem-2px)]' 
                                : 'text-base-content hover:bg-base-200/30 hover:pl-5'
                            }`}
                          >
                            {label}
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                
                {/* Social links */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted mb-3 font-medium">Connect</h3>
                  <motion.div 
                    className="flex space-x-3"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {SOCIAL_LINKS.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-card/50 hover:bg-accent/10 hover:text-accent transition-colors border border-border/20"
                        variants={socialLinkVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.name}
                      >
                        <SocialIcon type={social.icon} />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
                
                {/* Resume/CV download button */}
                <motion.div 
                  variants={navItemVariants}
                  className="pt-2"
                >
                  <a 
                    href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                    download
                    className="flex items-center justify-center px-5 py-3 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download CV</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}