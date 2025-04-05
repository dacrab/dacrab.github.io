"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Import modular components
import SectionHeading from "./Contact/SectionHeading";
import { contactMethods, socialLinks } from "./Contact/contactData";
import ContactMethod from "./Contact/ContactMethod";
import SocialLink from "./Contact/SocialLink";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Simplified scroll animation setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Simplified transform values
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);
  
  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section heading */}
        <SectionHeading />
        
        {/* Main content */}
        <motion.div 
          className="max-w-6xl mx-auto"
          style={{ opacity, scale }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 shadow-xl"
               style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            
            {/* Left column - Contact Info */}
            <div className="lg:col-span-7 p-8 md:p-12 relative">
              <div className="h-full flex flex-col justify-between">
                {/* Heading */}
                <div className="mb-12">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    Let&apos;s Work Together
                  </motion.h3>
                  <motion.p 
                    className="text-muted max-w-lg"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    I&apos;m currently available for freelance work and collaboration opportunities.
                    Feel free to reach out if you have a project in mind or just want to connect.
                  </motion.p>
                </div>
                
                {/* Contact methods */}
                <div className="space-y-8 md:space-y-10">
                  {contactMethods.map((method, i) => (
                    <ContactMethod
                      key={method.title}
                      title={method.title}
                      value={method.value}
                      icon={method.icon}
                      index={i}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Social Links */}
            <div className="lg:col-span-5 bg-gradient-to-br from-card/80 to-card p-8 md:p-12 flex flex-col justify-between relative"
                 style={{ borderLeft: "1px solid rgba(var(--border-rgb), 0.1)" }}>
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl font-bold mb-8 text-gradient"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Connect With Me
                </motion.h3>
                
                {/* Social links grid */}
                <motion.div 
                  className="grid grid-cols-2 gap-6"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08, delayChildren: 0.5 }
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
                      />
                      <motion.span 
                        className="text-sm text-muted mt-2"
                        variants={{
                          hidden: { opacity: 0, y: 5 },
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
                className="mt-12 pt-6 border-t border-border/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-sm text-muted">
                  Prefer a quick response? Send me a direct message on LinkedIn or email me for 
                  project inquiries.
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span className="text-xs text-accent">Available for new projects</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Footer note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.7 : 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="text-sm text-muted">Thanks for viewing my portfolio</p>
          <motion.div
            className="w-2 h-2 bg-accent/30 rounded-full mx-auto mt-4"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
      </div>
    </section>
  );
}