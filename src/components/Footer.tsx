"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer className="bg-background relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* About column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.5 }}
              viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-muted mb-6">
                A passionate web developer focused on creating beautiful, 
                functional, and user-friendly experiences.
              </p>
            </motion.div>
          </div>

          {/* Quick links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.5, delay: isMobile ? 0.15 : 0.2 }}
              viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item, index) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: isMobile ? -7 : -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: isMobile ? 0.25 : 0.3, 
                      delay: (isMobile ? 0.2 : 0.3) + index * (isMobile ? 0.07 : 0.1)
                    }}
                    viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
                  >
                    <motion.a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-muted flex items-center transition-colors duration-300 hover:text-accent"
                      whileHover={{ x: isMobile ? 3 : 5 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: isMobile ? 350 : 400, 
                        damping: isMobile ? 20 : 25
                      }}
                    >
                      <svg 
                        className="w-3 h-3 mr-2 text-accent" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Connect column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.5, delay: isMobile ? 0.3 : 0.4 }}
              viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-6">
                {/* Social media icons with improved hover effects */}
                {[
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/vkavouras/",
                    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                  },
                  {
                    name: "GitHub",
                    url: "https://github.com/dacrab",
                    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                  },
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/killcrb/",
                    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                          </svg>
                  }
                ].map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="relative group"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
                    whileTap={{ scale: isMobile ? 0.97 : 0.95 }}
                    transition={{ duration: isMobile ? 0.15 : 0.2 }}
                  >
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
                    <div className="flex items-center justify-center w-10 h-10 bg-card/50 hover:bg-card/80 border border-border/40 rounded-full transition-all duration-300">
                      <span className="text-muted group-hover:text-accent transition-colors duration-300">
                        {social.icon}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Email section with fixed hover animations */}
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 7 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.4 : 0.5 }}
                viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
                className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                whileHover={{ y: isMobile ? -2 : -3 }}
              >
                <p className="text-sm text-muted">
                  Want to get in touch? Send me an email at:
                </p>
                <motion.a 
                  href="mailto:vkavouras@proton.me" 
                  className="text-accent block mt-1 relative inline-block"
                  whileHover={{ 
                    textDecoration: "underline",
                    textDecorationColor: "rgba(var(--accent-rgb), 1)" 
                  }}
                  transition={{ duration: isMobile ? 0.15 : 0.2 }}
                >
                  vkavouras@proton.me
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: isMobile ? 0.4 : 0.5, delay: isMobile ? 0.5 : 0.6 }}
          viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted mb-4 md:mb-0">
            © {currentYear} Vaggelis Kavouras. All rights reserved.
          </p>
          <div className="text-sm text-muted">
            Built with 
            <span className="mx-1">❤️</span> 
            using Next.js, TypeScript & Tailwind CSS
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 