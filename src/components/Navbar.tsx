"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import FloatingElement from "./FloatingElement";
import GlowEffect from "./GlowEffect";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu if window resizes beyond mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);
  
  // Track scroll position to apply styles
  useEffect(() => {
    const unsubscribe = scrollY.onChange(y => {
      // Set boolean scrolled state
      setScrolled(y > 20);
      
      // Simple approach - apply blur immediately when scrolling starts
      setScrollProgress(y > 0 ? 1 : 0);
    });
    return unsubscribe;
  }, [scrollY]);
  
  // Observe sections to highlight active nav item
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  // Navigation items
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];
  
  // Generate dynamic styles based on scroll progress
  const navbarStyle = {
    backgroundColor: scrollProgress > 0 ? 'var(--card)' : 'transparent',
    backdropFilter: scrollProgress > 0 ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrollProgress > 0 ? 'blur(12px)' : 'none',
    borderBottom: scrollProgress > 0 ? '1px solid var(--border)' : 'none',
    boxShadow: scrollProgress > 0 ? '0 4px 20px rgba(var(--foreground-rgb), 0.05)' : 'none',
    opacity: scrollProgress > 0 ? 0.9 : 1,
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
          {/* Logo */}
          <FloatingElement intensity={0.2} speed={0.5}>
            <motion.a 
              href="#home" 
              className="text-xl font-bold relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GlowEffect color="accent" intensity={0.3} size={1.2} pulseEffect={true}>
                <span className="text-gradient-animated">Portfolio</span>
              </GlowEffect>
            </motion.a>
          </FloatingElement>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <FloatingElement intensity={0.2} speed={0.5}>
                  <a
                    href={item.href}
                    className={`px-4 py-2 rounded-lg relative transition-all duration-300 ${
                      activeSection === item.href.substring(1)
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {activeSection === item.href.substring(1) && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                </FloatingElement>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <FloatingElement intensity={0.3} speed={1}>
                <a
                  href="#contact"
                  className="ml-4 px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
                >
                  Hire Me
                </a>
              </FloatingElement>
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
                {isOpen ? (
                  <path 
                    d="M18 6L6 18M6 6L18 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                ) : (
                  <path 
                    d="M4 6H20M4 12H20M4 18H20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                )}
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
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg my-1 ${
                    activeSection === item.href.substring(1)
                      ? "bg-accent/10 text-accent"
                      : "hover:bg-accent/5"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 mt-3 mb-1 bg-accent text-white rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
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