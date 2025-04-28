"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { contactMethods, socialLinks } from "./Contact/contactData";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";
import StaggerItem from "./StaggerItem";
import TextAnimation from "./TextAnimation";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Swiss style accent elements with animations - Envelope-inspired pattern for Contact */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Top left corner */}
        <ParallaxLayer speed={0.1} direction="right" className="absolute left-0 top-0 z-0">
          <ShapeAnimation 
            type="diagonal" 
            color="var(--accent)" 
            size={160}
            strokeWidth={5}
            variant="draw"
            delay={0.2}
            duration={1.2}
          />
        </ParallaxLayer>
        
        {/* Top right corner */}
        <ParallaxLayer speed={0.12} direction="left" className="absolute right-0 top-0 z-0">
          <ShapeAnimation 
            type="diagonal" 
            color="var(--accent-secondary)" 
            size={160}
            strokeWidth={5}
            variant="draw"
            delay={0.3}
            duration={1.2}
          />
        </ParallaxLayer>
        
        {/* Horizontal line - envelope center */}
        <ParallaxLayer speed={0.08} direction="down" className="absolute left-1/2 transform -translate-x-1/2 top-1/4 z-0">
          <ShapeAnimation 
            type="line" 
            color="var(--accent-tertiary)" 
            size={200}
            strokeWidth={3}
            variant="draw"
            delay={0.5}
            duration={1.0}
          />
        </ParallaxLayer>
        
        {/* Pulsing circle - stamp-like */}
        <ParallaxLayer speed={0.2} direction="up" className="absolute right-16 bottom-1/3 z-0">
          <SwissMotion type="pulse" delay={0.7} duration={2.0}>
            <div className="relative">
              <ShapeAnimation 
                type="circle" 
                color="var(--accent)" 
                size={60}
                variant="pulse"
                delay={0.7}
                loop={true}
              />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--background)] uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <TextAnimation 
                  text="Contact" 
                  variant="char-by-char" 
                  delay={1.2} 
                  duration={0.03}
                />
              </motion.div>
            </div>
          </SwissMotion>
        </ParallaxLayer>
      </div>

      <div className="swiss-container relative z-10">
        {/* Section header with Swiss style - Contact-specific 3D tilt effect */}
        <SwissMotion type="slide" delay={0.2} duration={0.8} className="mb-16 perspective">
          <motion.div 
            className="flex items-center mb-4"
            whileHover={{ rotateX: 5, rotateY: 5, transition: { duration: 0.4 } }}
          >
            <div className="w-8 h-8 bg-[var(--accent-secondary)] mr-4"></div>
            <h2 className="swiss-heading-2">CONTACT</h2>
          </motion.div>
          <div className="ml-12">
            <SwissMotion type="reveal" delay={0.5} duration={0.6}>
              <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
            </SwissMotion>
            <SwissMotion type="fade" delay={0.7} duration={0.6}>
              <p className="swiss-body max-w-2xl">
                I&apos;m currently available for freelance work and collaboration opportunities.
                Feel free to reach out if you have a project in mind or just want to connect.
              </p>
            </SwissMotion>
          </div>
        </SwissMotion>

        <motion.div
          className="swiss-grid"
          style={{ y: contentY }}
        >
          {/* Contact Info - Unique typewriter effect for contact section */}
          <SwissMotion 
            type="slide" 
            delay={0.3} 
            duration={0.7} 
            className="swiss-asymmetric-left"
          >
            <div className="swiss-card relative">
              <SwissMotion type="reveal" delay={0.4} duration={0.5}>
                <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]"></div>
              </SwissMotion>
              
              <TextAnimation
                text="LET'S WORK TOGETHER"
                variant="reveal"
                delay={0.5}
                duration={1.0}
                className="swiss-heading-3 mb-8"
              />
              
              <SwissMotion type="stagger" staggerChildren={0.1} className="space-y-8">
                {contactMethods.map((method, index) => (
                  <StaggerItem 
                    key={method.title} 
                    type="slide" 
                    direction={index % 2 === 0 ? "left" : "right"}
                    className="flex"
                  >
                    <div className="mr-4 mt-1">
                      <div className="w-6 h-6 bg-[var(--card-hover)] flex items-center justify-center">
                        {method.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wide mb-2">
                        {method.title}
                      </h4>
                      <a 
                        href={method.link} 
                        className="text-[var(--accent)] hover:underline"
                        target={method.title === "Email" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                      >
                        {method.value}
                      </a>
                    </div>
                  </StaggerItem>
                ))}
              </SwissMotion>
            </div>
          </SwissMotion>

          {/* Social Links - Grid layout unique to Contact section */}
          <SwissMotion 
            type="slide" 
            delay={0.5} 
            duration={0.7} 
            className="swiss-asymmetric-right mt-12 md:mt-0"
          >
            <div className="swiss-card relative">
              <SwissMotion type="reveal" delay={0.6} duration={0.5}>
                <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-tertiary)]"></div>
              </SwissMotion>
              
              <TextAnimation
                text="CONNECT WITH ME"
                variant="reveal"
                delay={0.7}
                duration={1.0}
                className="swiss-heading-3 mb-8"
              />
              
              <SwissMotion type="grid" staggerChildren={0.08} className="grid grid-cols-2 gap-6">
                {socialLinks.map((social, index) => (
                  <SwissMotion 
                    key={social.name} 
                    type="scale" 
                    delay={0.8 + (index * 0.1)}
                    whileHover="scale" 
                    className="flex flex-col items-center"
                  >
                    <a
                      href={social.url}
                      className="w-16 h-16 swiss-border flex items-center justify-center mb-3 hover:bg-[var(--accent)]/10 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <span className="text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent)]">
                        {social.icon}
                      </span>
                    </a>
                    <span className="text-sm uppercase tracking-wider">{social.name}</span>
                  </SwissMotion>
                ))}
              </SwissMotion>
              
              <SwissMotion type="fade" delay={0.8} duration={0.6} className="mt-12 pt-8 border-t border-[var(--border)]">
                <p className="text-sm uppercase tracking-wider mb-2">
                  Prefer a quick response? Send me a direct message on LinkedIn or email me for project inquiries.
                </p>
                <SwissMotion type="slide" delay={0.9} duration={0.5} className="flex items-center mt-4">
                  <div className="w-3 h-3 bg-[var(--accent)] mr-3"></div>
                  <span className="text-sm uppercase tracking-wider">Available for new projects</span>
                </SwissMotion>
              </SwissMotion>
            </div>
          </SwissMotion>
        </motion.div>

        {/* Footer note with continuous floating animation - signature for Contact section */}
        <SwissMotion type="fade" delay={1.0} duration={0.7} className="mt-16 text-center">
          <p className="text-sm uppercase tracking-wider text-[var(--muted)]">Thanks for viewing my portfolio</p>
          <motion.div 
            className="w-1 h-8 bg-[var(--foreground)]/30 mx-auto mt-4"
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"  
            }}
          />
        </SwissMotion>
      </div>
    </section>
  );
}