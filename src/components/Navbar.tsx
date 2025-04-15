"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import GlowEffect from "./GlowEffect";
import { useIsMobile } from "@/hooks/useIsMobile";

const NAV_HEIGHT = 60;
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

  const isClickNavigating = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const toggleButton = document.getElementById('mobile-menu-toggle');
      if (toggleButton?.contains(e.target as Node)) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Update active section and scrolled state on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isClickNavigating.current) return;
      const threshold = window.innerHeight * 0.3;
      let found = "home";
      for (const { href } of NAV_ITEMS) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom >= threshold) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigation click handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      setIsOpen(false);
      setTimeout(() => {
        isClickNavigating.current = true;
        setActiveSection(id);
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT,
          behavior: "smooth"
        });
        if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
        clickTimerRef.current = setTimeout(() => {
          isClickNavigating.current = false;
        }, 1000);
      }, 10);
    },
    []
  );

  // Animation variants
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

  const menuVariants = {
    hidden: { opacity: 0, height: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.05 }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  const getBlurValue = scrolled ? 'backdrop-blur-md' : 'backdrop-blur-0';

  const handleLogoClick = useCallback(() => {
    setIsOpen(false);
    setActiveSection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(v => !v), []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
        scrolled ? 'bg-opacity-80 bg-[var(--background)] shadow-sm' : 'bg-transparent'
      } ${getBlurValue}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo onClick={handleLogoClick} showFullName={!isMobile} />
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <GlowEffect
                    color="accent"
                    size={0.7}
                    intensity={0.4}
                    followCursor={!isMobile}
                    pulseEffect={false}
                    mobileOptimized
                  >
                    <a
                      href={href}
                      onClick={e => handleNavClick(e, href)}
                      className={`relative px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--foreground)]/70 hover:text-[var(--foreground)]'
                      }`}
                    >
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
                          style={{ willChange: "transform, opacity" }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        />
                      )}
                    </a>
                  </GlowEffect>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          id="mobile-menu-toggle"
          className="md:hidden relative w-10 h-10 flex items-center justify-center p-2 rounded-md z-20 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <motion.div className="flex flex-col justify-center items-center w-6 h-6" initial={false}>
            <motion.span
              className="block h-0.5 w-full transition-all duration-300 ease-out absolute"
              animate={{
                rotate: isOpen ? 45 : 0,
                translateY: isOpen ? 0 : -5,
                backgroundColor: isOpen ? "var(--accent)" : "var(--foreground)"
              }}
              style={{ transformOrigin: "center" }}
            />
            <motion.span
              className="block h-0.5 w-full transition-all duration-300 ease-out"
              animate={{
                opacity: isOpen ? 0 : 1,
                width: isOpen ? "0%" : "100%",
                backgroundColor: isOpen ? "var(--accent)" : "var(--foreground)"
              }}
            />
            <motion.span
              className="block h-0.5 w-full transition-all duration-300 ease-out absolute"
              animate={{
                rotate: isOpen ? -45 : 0,
                translateY: isOpen ? 0 : 5,
                backgroundColor: isOpen ? "var(--accent)" : "var(--foreground)"
              }}
              style={{ transformOrigin: "center" }}
            />
          </motion.div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden fixed top-[57px] left-0 right-0 max-h-[calc(100vh-57px)] overflow-auto bg-[var(--background)]/95 backdrop-blur-md z-10 shadow-lg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="container mx-auto py-6 px-4">
              <nav>
                <h3 className="text-xs uppercase tracking-wider text-[var(--foreground)]/60 mb-3 font-medium">Navigation</h3>
                <ul className="space-y-1">
                  {NAV_ITEMS.map(({ label, href }) => {
                    const isActive = activeSection === href.slice(1);
                    return (
                      <motion.li key={href} variants={navItemVariants}>
                        <a
                          href={href}
                          onClick={e => handleNavClick(e, href)}
                          className={`block px-4 py-3 text-lg rounded-md transition-all duration-300 ${
                            isActive
                              ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium border-l-2 border-[var(--accent)] pl-[calc(1rem-2px)]'
                              : 'text-[var(--foreground)] hover:bg-[var(--card)]/50 hover:pl-5'
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {label}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}