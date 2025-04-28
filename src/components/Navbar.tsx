"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
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

  const handleLogoClick = useCallback(() => {
    setIsOpen(false);
    setActiveSection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(v => !v), []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
        scrolled ? 'bg-[var(--background)] border-b border-[var(--border)]' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="swiss-container flex justify-between items-center h-[60px]">
        <div className="flex items-center">
          <Logo onClick={handleLogoClick} showFullName={!isMobile} />
        </div>
        
        <nav className="hidden md:flex justify-end items-center">
          <ul className="flex space-x-8">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className={`swiss-nav-item ${isActive ? 'active' : ''}`}
                  >
                    {label.toUpperCase()}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Mobile menu button - positioned at far right */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex items-center justify-center p-2 z-20 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col justify-center items-center w-6 h-6 relative">
            <span
              className={`block h-0.5 w-full bg-[var(--foreground)] absolute transition-all duration-300 ${
                isOpen ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-[var(--foreground)] absolute transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-[var(--foreground)] absolute transition-all duration-300 ${
                isOpen ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="absolute top-[60px] left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] md:hidden overflow-hidden z-10"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="px-4 py-5 divide-y divide-[var(--border)]">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <motion.div
                    key={href}
                    variants={navItemVariants}
                    className="py-3"
                  >
                    <a
                      href={href}
                      onClick={e => handleNavClick(e, href)}
                      className={`block text-lg font-bold uppercase letter-spacing-wide ${
                        isActive ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
                      }`}
                    >
                      {label}
                      {isActive && (
                        <div className="h-1 w-8 bg-[var(--accent)] mt-1" />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}