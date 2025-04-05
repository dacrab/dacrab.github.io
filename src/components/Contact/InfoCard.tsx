"use client";

import { motion, MotionValue } from "framer-motion";
import ContactMethod from "./ContactMethod";
import SocialLink from "./SocialLink";
import { contactMethods, socialLinks } from "./contactData";

interface InfoCardProps {
  isInView: boolean;
  contentY: MotionValue<number>;
}

export default function InfoCard({ isInView, contentY }: InfoCardProps) {
  // Animation variants
  const textAnimation = {
    hidden: { x: -10, opacity: 0 },
    visible: (delay: number) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay }
    })
  };
  
  const socialLinksAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="md:col-span-6"
      style={{ y: contentY }}
    >
      {/* Glass card with contact info */}
      <motion.div 
        className="glass-card rounded-xl p-8 overflow-hidden relative border-t border-l border-border/30 shadow-lg"
        initial={{ boxShadow: "0 0 0px rgba(var(--accent-rgb), 0)" }}
        whileHover={{
          boxShadow: "0 0 30px 5px rgba(var(--accent-rgb), 0.1)",
        }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(var(--accent-rgb), 0)",
            "0 0 20px 2px rgba(var(--accent-rgb), 0.07)",
            "0 0 0px rgba(var(--accent-rgb), 0)"
          ]
        }}
        transition={{ 
          duration: 0.5,
          boxShadow: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        {/* Contact methods */}
        <div className="mb-10">
          <motion.h3 
            className="text-xl font-semibold mb-6 text-gradient"
            variants={textAnimation}
            custom={0.2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Get in Touch
          </motion.h3>
          <div className="space-y-8">
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
            className="text-xl font-semibold mb-6 text-gradient"
            variants={textAnimation}
            custom={0.4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Follow Me
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-4"
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
}