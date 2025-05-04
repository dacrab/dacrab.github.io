"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { contactMethods, socialLinks } from "./Contact/contactData";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";
import StaggerItem from "./StaggerItem";
import TextAnimation from "./TextAnimation";
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
      {/* Swiss style accent elements with animations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
        <SectionHeader 
          title="CONTACT"
          description="I'm currently available for freelance work and collaboration opportunities. Feel free to reach out if you have a project in mind or just want to connect."
          accentColor="secondary"
          textAnimationVariant="typewriter"
          motionDelay={0.2}
          className="perspective"
        />

        <motion.div
          className="swiss-grid"
          style={{ y: contentY }}
        >
          {/* Contact Info */}
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

          {/* Social Links */}
          <SwissMotion 
            type="slide" 
            delay={0.5} 
            duration={0.7} 
            className="swiss-asymmetric-right mt-12 md:mt-0"
          >
            <div className="swiss-card relative overflow-hidden">
              <SwissMotion type="reveal" delay={0.6} duration={0.5}>
                <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-tertiary)]"></div>
              </SwissMotion>
              
              <SwissMotion type="reveal" delay={0.7} duration={0.5}>
                <div className="absolute bottom-0 left-0 w-2/3 h-1 bg-[var(--accent)]"></div>
              </SwissMotion>
              
              <TextAnimation
                text="CONNECT WITH ME"
                variant="reveal"
                delay={0.7}
                duration={1.0}
                className="swiss-heading-3 mb-8"
              />
              
              <div className="relative">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-[var(--foreground)]"></div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-0 relative">
                  {socialLinks.map((social, index) => (
                    <SwissMotion
                      key={social.name}
                      type="scale"
                      delay={0.8 + (index * 0.15)}
                      duration={0.6}
                      whileHover="scale"
                      className={`${index === 0 ? 'col-span-3 mb-8' : 'col-span-1'}`}
                    >
                      <div className={`
                        ${index === 0 ? 'flex items-center p-6 bg-[var(--card-hover)]' : 'flex flex-col items-center p-4'}
                        relative overflow-hidden group
                      `}>
                        <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                        
                        {index === 0 ? (
                          <>
                            <div className="mr-6 p-4 bg-[var(--background)] relative">
                              <social.icon size={36} className="text-[var(--accent)] transition-transform group-hover:scale-110 duration-300" />
                              <SwissMotion type="reveal" delay={1.0} duration={0.4}>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent-secondary)]"></div>
                              </SwissMotion>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold uppercase tracking-wide mb-2">{social.name}</h4>
                              <p className="text-sm text-[var(--muted)] mb-2">Professional Network</p>
                              <a 
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[var(--accent)] hover:underline"
                              >
                                <span>Connect</span>
                                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </a>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-4 mb-2 relative">
                              <social.icon size={28} className="text-[var(--foreground)] transition-transform group-hover:scale-110 group-hover:text-[var(--accent)] duration-300" />
                              {index === 1 && (
                                <SwissMotion type="reveal" delay={0.9} duration={0.4}>
                                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--accent)]"></div>
                                </SwissMotion>
                              )}
                              {index === 2 && (
                                <SwissMotion type="reveal" delay={0.9} duration={0.4}>
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent-tertiary)]"></div>
                                </SwissMotion>
                              )}
                            </div>
                            <h4 className="text-base font-bold uppercase tracking-wide mb-1">{social.name}</h4>
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
              
              {/* Availability indicator */}
              <SwissMotion type="fade" delay={1.1} duration={0.6} className="mt-12 pt-8 border-t border-[var(--border)]">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <motion.div 
                      className="w-4 h-4 bg-[var(--accent)]"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"  
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider mb-2 font-semibold">
                      Available for new projects and collaborations
                    </p>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider">
                      Prefer a quick response? Send me a direct message on LinkedIn or email me for project inquiries.
                    </p>
                  </div>
                </div>
              </SwissMotion>
            </div>
          </SwissMotion>
        </motion.div>

        {/* Footer note */}
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