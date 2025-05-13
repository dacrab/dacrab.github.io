"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { contactMethods, socialLinks } from "./Contact/contactData";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";
import { SectionHeader } from "./common";

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
      {/* Simplified background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Single horizontal line animation */}
        <ParallaxLayer speed={0.1} direction="right" className="absolute left-0 top-1/3 z-0">
          <ShapeAnimation 
            type="line" 
            color="var(--accent)" 
            size={200}
            strokeWidth={2}
            variant="draw"
            delay={0.2}
            duration={1.2}
          />
        </ParallaxLayer>
        
        {/* Single clean geometric shape */}
        <ParallaxLayer speed={0.08} direction="up" className="absolute right-16 bottom-1/4 z-0">
          <ShapeAnimation 
            type="square" 
            color="var(--accent-secondary)" 
            size={60}
            strokeWidth={1}
            variant="draw"
            delay={0.4}
            duration={1.0}
          />
        </ParallaxLayer>
      </div>

      <div className="swiss-container relative z-10">
        <SectionHeader 
          title="CONTACT"
          description="Let's connect and discuss your project needs. I'm available for freelance work and open to exploring new opportunities for collaboration."
          accentColor="secondary"
          textAnimationVariant="reveal"
          motionDelay={0.2}
          className="mb-16 md:mb-20"
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12"
          style={{ y: contentY }}
        >
          {/* Contact Information - Cleaner layout */}
          <SwissMotion 
            type="slide" 
            delay={0.3} 
            duration={0.6} 
            className="lg:col-span-5"
          >
            <div className="swiss-card relative overflow-hidden p-8 md:p-10">
              {/* Swiss style accent line */}
              <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]"></div>
              
              <h3 className="swiss-heading-3 mb-8">GET IN TOUCH</h3>
              
              <div className="space-y-8">
                {contactMethods.map((method, index) => (
                  <SwissMotion 
                    key={method.title} 
                    type="slide" 
                    delay={0.4 + (index * 0.1)} 
                    className="flex"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--card-hover)] mr-4">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wide mb-1">
                        {method.title}
                      </h4>
                      <a 
                        href={method.link} 
                        className="text-[var(--accent)] hover:underline transition-colors duration-200"
                        target={method.title === "Email" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                      >
                        {method.value}
                      </a>
                    </div>
                  </SwissMotion>
                ))}
              </div>
              
              {/* Availability status - More subtle and professional */}
              <SwissMotion 
                type="fade" 
                delay={0.7} 
                className="mt-10 pt-6 border-t border-[var(--border)]"
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <div className="w-3 h-3 bg-[var(--accent)]"></div>
                    <div 
                      className="absolute inset-0 w-3 h-3 bg-[var(--accent)] animate-ping opacity-75"
                      style={{ animationDuration: '3s' }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium">
                    Currently available for new projects
                  </p>
                </div>
              </SwissMotion>
            </div>
          </SwissMotion>

          {/* Social Links - Simplified and more elegant */}
          <SwissMotion 
            type="slide" 
            delay={0.4} 
            duration={0.6} 
            className="lg:col-span-7"
          >
            <div className="swiss-card relative p-8 md:p-10">
              {/* Swiss style accent lines */}
              <div className="absolute top-0 right-0 w-1 h-1/4 bg-[var(--accent-secondary)]"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-[var(--accent-tertiary)]"></div>
              
              <h3 className="swiss-heading-3 mb-8">CONNECT WITH ME</h3>
              
              {/* Clean, consistent grid layout for social links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialLinks.map((social, index) => (
                  <SwissMotion
                    key={social.name}
                    type="scale"
                    delay={0.5 + (index * 0.1)}
                    whileHover="lift"
                    className={`${index === 0 ? 'md:col-span-3' : ''}`}
                  >
                    <div className={`
                      group relative 
                      border border-[var(--border)] 
                      ${index === 0 ? 'p-6 flex items-center' : 'p-5 flex flex-col items-center text-center'}
                      hover:border-[var(--accent)] transition-colors duration-300
                    `}>
                      {/* Accent dot - swiss design element */}
                      <div className={`absolute ${index % 2 === 0 ? 'top-0 right-0' : 'bottom-0 left-0'} w-1 h-1 bg-[var(--accent${index % 3 === 0 ? '' : index % 3 === 1 ? '-secondary' : '-tertiary'})]`}></div>
                      
                      {index === 0 ? (
                        <>
                          <div className="mr-6 bg-[var(--card-hover)] p-4 relative">
                            <social.icon size={32} className="text-[var(--accent)] transition-transform group-hover:scale-110 duration-300" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold mb-1">{social.name}</h4>
                            <p className="text-sm text-[var(--muted)] mb-2">Professional Network</p>
                            <a 
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[var(--accent)] text-sm font-medium hover:underline"
                            >
                              Connect with me
                              <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-3">
                            <social.icon size={24} className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-all duration-300" />
                          </div>
                          <h4 className="text-sm font-bold mb-1">{social.name}</h4>
                          <a 
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--accent)] hover:underline"
                          >
                            View Profile
                          </a>
                        </>
                      )}
                    </div>
                  </SwissMotion>
                ))}
              </div>
            </div>
          </SwissMotion>
        </motion.div>

        {/* Refined footer note */}
        <SwissMotion type="fade" delay={0.7} className="mt-16 text-center flex flex-col items-center">
          <p className="text-sm tracking-wider text-[var(--muted)] uppercase mb-4 max-w-md mx-auto">
            Thanks for visiting my portfolio. I look forward to connecting with you and bringing your vision to life.
          </p>
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-8 h-8 border border-[var(--accent-secondary)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-2 h-2 bg-[var(--accent)]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </div>
        </SwissMotion>
      </div>
    </section>
  );
}