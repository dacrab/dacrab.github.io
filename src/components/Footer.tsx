"use client";

import SwissMotion from "./SwissMotion";
import StaggerItem from "./StaggerItem";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";

const QUICK_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vkavouras/",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/dacrab",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/killcrb/",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
];

const EMAIL = "vkavouras@proton.me";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--foreground)] relative">
      {/* Animated Swiss-style accent elements */}
      <ParallaxLayer speed={0.15} direction="down" className="absolute top-0 left-1/4">
        <ShapeAnimation 
          type="line" 
          color="var(--accent)" 
          size={64} 
          strokeWidth={4}
          variant="draw"
          delay={0.3}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.1} direction="up" className="absolute bottom-16 right-8">
        <ShapeAnimation 
          type="square" 
          color="var(--accent-secondary)" 
          size={48} 
          variant="float"
          delay={0.5}
          loop={true}
        />
      </ParallaxLayer>
      
      <div className="swiss-container py-16">
        <div className="swiss-grid mb-16">
          {/* About column */}
          <SwissMotion 
            type="slide" 
            delay={0.2} 
            duration={0.7}
            className="swiss-asymmetric-small"
          >
            <h3 className="swiss-heading-3 mb-6">ABOUT</h3>
            <SwissMotion type="reveal" delay={0.3} duration={0.5}>
              <div className="w-12 h-1 bg-[var(--foreground)] mb-4"></div>
            </SwissMotion>
            <p className="swiss-body">
              A passionate web developer focused on creating beautiful,
              functional, and user-friendly experiences.
            </p>
          </SwissMotion>

          {/* Quick links */}
          <SwissMotion 
            type="slide" 
            delay={0.3} 
            duration={0.7}
            className="swiss-asymmetric-small mt-12 md:mt-0"
          >
            <h3 className="swiss-heading-3 mb-6">LINKS</h3>
            <SwissMotion type="reveal" delay={0.4} duration={0.5}>
              <div className="w-12 h-1 bg-[var(--foreground)] mb-4"></div>
            </SwissMotion>
            <SwissMotion type="stagger" staggerChildren={0.06} className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <StaggerItem key={item.label} type="fade" whileHover="lift">
                  <li>
                    <a
                      href={item.href}
                      className="swiss-nav-item"
                    >
                      {item.label}
                    </a>
                  </li>
                </StaggerItem>
              ))}
            </SwissMotion>
          </SwissMotion>

          {/* Connect column */}
          <SwissMotion 
            type="slide" 
            delay={0.4} 
            duration={0.7}
            className="swiss-asymmetric-small mt-12 md:mt-0"
          >
            <h3 className="swiss-heading-3 mb-6">CONNECT</h3>
            <SwissMotion type="reveal" delay={0.5} duration={0.5}>
              <div className="w-12 h-1 bg-[var(--foreground)] mb-4"></div>
            </SwissMotion>
            
            <SwissMotion type="stagger" staggerChildren={0.08} className="flex space-x-6 mb-8">
              {SOCIAL_LINKS.map((social) => (
                <StaggerItem key={social.name} type="fade" whileHover="scale">
                  <a
                    href={social.url}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    {social.icon}
                  </a>
                </StaggerItem>
              ))}
            </SwissMotion>

            <SwissMotion 
              type="scale" 
              delay={0.6} 
              duration={0.5}
              whileHover="lift"
              className="swiss-card"
            >
              <p className="swiss-caption mb-2">
                Want to get in touch? Send me an email at:
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[var(--accent)] font-bold uppercase"
              >
                {EMAIL}
              </a>
            </SwissMotion>
          </SwissMotion>
        </div>

        {/* Copyright */}
        <SwissMotion type="fade" delay={0.7} duration={0.6} className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <SwissMotion type="rotate" delay={0.8} duration={0.5} className="w-6 h-6 bg-[var(--accent)] mr-3 flex items-center justify-center">
              <div className="w-3 h-3 bg-[var(--background)]"></div>
            </SwissMotion>
            <span className="font-bold uppercase">VAGGELIS KAVOURAS</span>
          </div>
          
          <div className="text-[var(--muted)] text-sm uppercase tracking-wider">
            © {currentYear} ALL RIGHTS RESERVED
          </div>
        </SwissMotion>
      </div>
    </footer>
  );
}