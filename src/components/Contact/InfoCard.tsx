"use client";

import { motion } from "framer-motion";
import ContactMethod from "./ContactMethod";
import SocialLink from "./SocialLink";
import { contactMethods, socialLinks } from "./contactData";

interface InfoCardProps {
  isInView: boolean;
  contentY: any;
}

export default function InfoCard({ isInView, contentY }: InfoCardProps) {
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
        {/* Abstract background shapes with animation */}
        <div className="absolute -z-10 inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-2/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, -5, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 3
            }}
          />
          <motion.div 
            className="absolute inset-0 grid-pattern-dots opacity-20"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* Contact methods */}
        <div className="mb-10">
          <motion.h3 
            className="text-xl font-semibold mb-6 text-gradient"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: isInView ? 0 : -10, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: isInView ? 0 : -10, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Follow Me
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.5
                }
              }
            }}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {socialLinks.map((social, i) => (
              <SocialLink
                key={social.name}
                name={social.name}
                url={social.url}
                icon={social.icon}
                index={i}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
} 