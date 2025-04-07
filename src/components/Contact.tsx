"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Import modular components
import SectionHeading from "./Contact/SectionHeading";
import { contactMethods, socialLinks } from "./Contact/contactData";
import ContactMethod from "./Contact/ContactMethod";
import SocialLink from "./Contact/SocialLink";

// Memoize the component to prevent unnecessary re-renders
const Contact = memo(function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 }); // Reduced threshold for earlier animation
  
  // State to track if component has ever been visible - for lazy loading
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Only perform expensive animations/calculations after component has been visible once
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  // Simplified scroll animation setup with reduced transform values
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Very simplified transform values for better mobile performance
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [isMobile ? 0.4 : 0.3, 1, 1, isMobile ? 0.9 : 0.8]
  );
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [isMobile ? 0.99 : 0.98, 1, 1, isMobile ? 0.995 : 0.99]
  );
  
  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden" // Removed bg-background class
    >
      {/* Only render complex animations if component has been visible at least once */}
      {hasBeenVisible && (
        <>
          {/* Accent glow effects */}
          <motion.div 
            className="absolute top-0 left-0 w-[25%] h-[30%] rounded-full bg-accent/20 blur-[100px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.3 : 0.4) : 0,
              y: isInView ? [0, 10, 0] : 0,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5 },
              y: { 
                repeat: Infinity,
                duration: isMobile ? 20 : 16,
                ease: "easeInOut" 
              }
            }}
          />
          <motion.div 
            className="absolute bottom-[10%] right-[5%] w-[35%] h-[40%] rounded-full bg-accent/15 blur-[150px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.4 : 0.6) : 0,
              scale: isInView ? [1, 1.1, 1, 0.95, 1] : 0.9,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.5 : 2, delay: isMobile ? 0.2 : 0.3 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 18 : 14,
                ease: "easeInOut" 
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section heading */}
        <SectionHeading isMobile={isMobile} />
        
        {/* Main content */}
        <motion.div 
          className="max-w-6xl mx-auto"
          style={{ opacity, scale }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative" // Reduced shadow, radius and gap
               style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            
            {/* Subtle inner glow effect - only render if component has been visible */}
            {hasBeenVisible && (
              <motion.div
                className="absolute inset-0 border-[1px] border-accent/10 rounded-xl opacity-0"
                animate={{ 
                  opacity: isInView ? [0, isMobile ? 0.4 : 0.5, isMobile ? 0.5 : 0.7, isMobile ? 0.4 : 0.5, 0] : 0,
                  boxShadow: [
                    "inset 0 0 0px rgba(147, 51, 234, 0)",
                    "inset 0 0 15px rgba(147, 51, 234, 0.2)",
                    "inset 0 0 30px rgba(147, 51, 234, 0.3)",
                    "inset 0 0 15px rgba(147, 51, 234, 0.2)",
                    "inset 0 0 0px rgba(147, 51, 234, 0)",
                  ]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: isMobile ? 15 : 10,
                  ease: "easeInOut" 
                }}
              />
            )}
            
            {/* Left column - Contact Info */}
            <div className="lg:col-span-7 p-5 md:p-8 relative"> {/* Reduced padding for mobile */}
              <div className="h-full flex flex-col justify-between">
                {/* Heading */}
                <div className="mb-8"> {/* Reduced margin */}
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold mb-3 text-gradient" // Smaller text and margin
                    initial={{ opacity: 0, y: isMobile ? -3 : -5 }} // Reduced animation distance
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : (isMobile ? -3 : -5) }}
                    transition={{ duration: isMobile ? 0.3 : 0.4 }} // Faster animation
                  >
                    Let&apos;s Work Together
                  </motion.h3>
                  <motion.p 
                    className="text-muted max-w-lg text-sm md:text-base" // Responsive text size
                    initial={{ opacity: 0, y: isMobile ? -2 : -3 }} // Reduced animation distance
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : (isMobile ? -2 : -3) }}
                    transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.1 : 0.15 }} // Faster animation, reduced delay
                  >
                    I&apos;m currently available for freelance work and collaboration opportunities.
                    Feel free to reach out if you have a project in mind or just want to connect.
                  </motion.p>
                </div>
                
                {/* Contact methods */}
                <div className="space-y-5 md:space-y-8"> {/* Reduced spacing for mobile */}
                  {contactMethods.map((method, i) => (
                    <ContactMethod
                      key={method.title}
                      title={method.title}
                      value={method.value}
                      icon={method.icon}
                      index={i}
                      isInView={isInView}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Social Links */}
            <div className="lg:col-span-5 bg-gradient-to-br from-card/80 to-card p-5 md:p-8 flex flex-col justify-between relative" // Reduced padding
                 style={{ borderLeft: "1px solid rgba(var(--border-rgb), 0.1)" }}>
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-xl font-bold mb-6 text-gradient" // Smaller text and margin
                  initial={{ opacity: 0, x: isMobile ? 3 : 5 }} // Reduced animation distance
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (isMobile ? 3 : 5) }}
                  transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.15 : 0.2 }} // Faster animation, reduced delay
                >
                  Connect With Me
                </motion.h3>
                
                {/* Social links grid */}
                <motion.div 
                  className="grid grid-cols-2 gap-4" // Reduced gap
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { 
                        staggerChildren: isMobile ? 0.03 : 0.05, 
                        delayChildren: isMobile ? 0.2 : 0.3 
                      } // Faster stagger, reduced delay
                    }
                  }}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  {socialLinks.map((social) => (
                    <div key={social.name} className="flex flex-col items-center">
                      <SocialLink
                        name={social.name}
                        url={social.url}
                        icon={social.icon}
                        isMobile={isMobile}
                      />
                      <motion.span 
                        className="text-xs text-muted mt-2" // Smaller text
                        variants={{
                          hidden: { opacity: 0, y: isMobile ? 2 : 3 }, // Reduced animation distance
                          show: { opacity: 1, y: 0 }
                        }}
                      >
                        {social.name}
                      </motion.span>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Availability indicator */}
              <motion.div 
                className="mt-8 pt-4 border-t border-border/20" // Reduced spacing
                initial={{ opacity: 0, y: isMobile ? 3 : 5 }} // Reduced animation distance
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : (isMobile ? 3 : 5) }}
                transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.4 : 0.5 }} // Faster animation, reduced delay
              >
                <p className="text-xs md:text-sm text-muted"> {/* Responsive text size */}
                  Prefer a quick response? Send me a direct message on LinkedIn or email me for 
                  project inquiries.
                </p>
                <div className="mt-3 flex items-center space-x-2"> {/* Reduced margin */}
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-accent"
                    animate={{ 
                      boxShadow: [
                        "0 0 0px rgba(147, 51, 234, 0.3)",
                        "0 0 8px rgba(147, 51, 234, 0.7)",
                        "0 0 0px rgba(147, 51, 234, 0.3)"
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: isMobile ? 2.5 : 2,
                      ease: "easeInOut" 
                    }}
                  ></motion.div>
                  <span className="text-xs text-accent">Available for new projects</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Footer note - simplified */}
        <motion.div
          className="mt-12 text-center" // Reduced margin
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.7 : 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.4, delay: isMobile ? 0.6 : 0.8 }} // Faster animation, reduced delay
        >
          <p className="text-sm text-muted">Thanks for viewing my portfolio</p>
          <motion.div
            className="w-2 h-2 bg-accent/30 rounded-full mx-auto mt-3" // Reduced margin
            animate={{ 
              scale: [1, isMobile ? 1.2 : 1.3, 1], 
              opacity: [0.3, isMobile ? 0.4 : 0.5, 0.3],
              boxShadow: [
                "0 0 0px rgba(147, 51, 234, 0.1)",
                "0 0 5px rgba(147, 51, 234, 0.4)",
                "0 0 0px rgba(147, 51, 234, 0.1)"
              ]
            }} // Reduced animation range
            transition={{ duration: isMobile ? 1.8 : 1.5, repeat: Infinity, repeatType: "reverse" }} // Faster animation
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;