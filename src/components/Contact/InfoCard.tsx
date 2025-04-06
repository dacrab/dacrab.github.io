"use client";

import { motion, MotionValue } from "framer-motion";
import ContactMethod from "./ContactMethod";
import SocialLink from "./SocialLink";
import { contactMethods, socialLinks } from "./contactData";
import { memo } from "react";

interface InfoCardProps {
  isInView: boolean;
  contentY: MotionValue<number>;
}

// Memoize the component to prevent unnecessary re-renders
const InfoCard = memo(function InfoCard({ isInView, contentY }: InfoCardProps) {
  // Simplified animation variants for better mobile performance
  const textAnimation = {
    hidden: { x: -5, opacity: 0 },
    visible: (delay: number) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, delay }
    })
  };
  
  const socialLinksAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="md:col-span-6"
      style={{ y: contentY }}
    >
      {/* Glass card with contact info - simplified animations */}
      <motion.div 
        className="glass-card rounded-xl p-6 md:p-8 overflow-hidden relative border-t border-l border-border/30 shadow-md"
        initial={{ boxShadow: "0 0 0px rgba(var(--accent-rgb), 0)" }}
        whileHover={{
          boxShadow: "0 0 20px 5px rgba(var(--accent-rgb), 0.08)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Contact methods */}
        <div className="mb-8">
          <motion.h3 
            className="text-xl font-semibold mb-5 text-gradient"
            variants={textAnimation}
            custom={0.1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Get in Touch
          </motion.h3>
          <div className="space-y-6">
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
        
        {/* Social links */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-5 text-gradient"
            variants={textAnimation}
            custom={0.3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Follow Me
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={socialLinksAnimation}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {socialLinks.map((social) => (
              <SocialLink
                key={social.name}
                name={social.name}
                url={social.url}
                icon={social.icon}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default InfoCard;