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
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 });
  
  // State to track if component has ever been visible - for lazy loading
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Only perform expensive animations/calculations after component has been visible once
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  // Simplified scroll animation with optimized transform values
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Optimized transform values with fewer interpolation points
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0.4, 1, 1, 0.8]
  );
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0.99, 1, 1, 0.99]
  );
  
  // Prepare staggered animation variants for social links
  const socialVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, 
        delayChildren: 0.2 
      }
    }
  };
  
  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Only render complex animations if component has been visible at least once */}
      {hasBeenVisible && (
        <>
          {/* Accent glow effects - optimized for performance */}
          <motion.div 
            className="absolute top-0 left-0 w-[25%] h-[30%] rounded-full bg-accent/20 blur-[100px] opacity-0"
            animate={{ 
              opacity: isInView ? 0.4 : 0,
              y: isInView ? [0, 10, 0] : 0, // Simplified animation keyframes
            }}
            transition={{ 
              opacity: { duration: 1.2 },
              y: { 
                repeat: Infinity,
                duration: 16,
                ease: "easeInOut",
                repeatType: "mirror" // More efficient than full cycle
              }
            }}
          />
          <motion.div 
            className="absolute bottom-[10%] right-[5%] w-[35%] h-[40%] rounded-full bg-accent/15 blur-[150px] opacity-0"
            animate={{ 
              opacity: isInView ? 0.5 : 0,
              scale: isInView ? [1, 1.05, 1] : 0.9, // Simplified animation keyframes
            }}
            transition={{ 
              opacity: { duration: 1.5, delay: 0.2 },
              scale: { 
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut",
                repeatType: "mirror" // More efficient than full cycle
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
          // Use layout='position' to optimize rendering
          layout="position"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative"
               style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            
            {/* Subtle inner glow effect - only render if component has been visible */}
            {hasBeenVisible && (
              <motion.div
                className="absolute inset-0 border-[1px] border-accent/10 rounded-xl opacity-0"
                animate={{ 
                  opacity: isInView ? [0, 0.5, 0] : 0,
                  boxShadow: [
                    "inset 0 0 0px rgba(147, 51, 234, 0)",
                    "inset 0 0 20px rgba(147, 51, 234, 0.3)",
                    "inset 0 0 0px rgba(147, 51, 234, 0)",
                  ]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                  repeatType: "mirror" // More efficient than full cycle
                }}
              />
            )}
            
            {/* Left column - Contact Info */}
            <div className="lg:col-span-7 p-5 md:p-8 relative">
              <div className="h-full flex flex-col justify-between">
                {/* Heading */}
                <div className="mb-8">
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold mb-3 text-gradient"
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    Let&apos;s Work Together
                  </motion.h3>
                  <motion.p 
                    className="text-muted max-w-lg text-sm md:text-base"
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -2 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    I&apos;m currently available for freelance work and collaboration opportunities.
                    Feel free to reach out if you have a project in mind or just want to connect.
                  </motion.p>
                </div>
                
                {/* Contact methods */}
                <div className="space-y-5 md:space-y-8">
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
            <div className="lg:col-span-5 bg-gradient-to-br from-card/80 to-card p-5 md:p-8 flex flex-col justify-between relative"
                 style={{ borderLeft: "1px solid rgba(var(--border-rgb), 0.1)" }}>
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-xl font-bold mb-6 text-gradient"
                  initial={{ opacity: 0, x: 3 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 3 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  Connect With Me
                </motion.h3>
                
                {/* Social links grid */}
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  variants={socialVariants}
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
                        className="text-xs text-muted mt-2"
                        variants={{
                          hidden: { opacity: 0, y: 2 },
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
                className="mt-8 pt-4 border-t border-border/20"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 3 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <p className="text-xs md:text-sm text-muted">
                  Prefer a quick response? Send me a direct message on LinkedIn or email me for 
                  project inquiries.
                </p>
                <div className="mt-3 flex items-center space-x-2">
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
                      duration: 2,
                      ease: "easeInOut",
                      repeatType: "mirror" // More efficient than full cycle
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
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.7 : 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <p className="text-sm text-muted">Thanks for viewing my portfolio</p>
          <motion.div
            className="w-2 h-2 bg-accent/30 rounded-full mx-auto mt-3"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.3, 0.4, 0.3],
              boxShadow: [
                "0 0 0px rgba(147, 51, 234, 0.1)",
                "0 0 5px rgba(147, 51, 234, 0.4)",
                "0 0 0px rgba(147, 51, 234, 0.1)"
              ]
            }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.div>
      </div>
    </section>
  );
});

// Add display name for better debugging in dev tools
Contact.displayName = 'Contact';

export default Contact;