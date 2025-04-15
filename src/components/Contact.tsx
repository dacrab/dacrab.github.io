"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeading from "./Contact/SectionHeading";
import { contactMethods, socialLinks } from "./Contact/contactData";
import ContactMethod from "./Contact/ContactMethod";
import SocialLink from "./Contact/SocialLink";

const Contact = memo(function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isInView && !hasBeenVisible) setHasBeenVisible(true);
  }, [isInView, hasBeenVisible]);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isMobile ? [0.7, 1, 1, 0.7] : [0.4, 1, 1, 0.8]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isMobile ? [0.998, 1, 1, 0.998] : [0.99, 1, 1, 0.99]
  );

  // Social links animation variants
  const socialVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 }
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Background glows (desktop only, after first view) */}
      {!isMobile && hasBeenVisible && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-[25%] h-[30%] rounded-full bg-accent/20 blur-[100px]"
            animate={{
              opacity: isInView ? 0.4 : 0,
              y: isInView ? [0, 10, 0] : 0
            }}
            transition={{
              opacity: { duration: 1.2 },
              y: {
                repeat: Infinity,
                duration: 16,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[5%] w-[35%] h-[40%] rounded-full bg-accent/15 blur-[150px]"
            animate={{
              opacity: isInView ? 0.5 : 0,
              scale: isInView ? [1, 1.05, 1] : 0.9
            }}
            transition={{
              opacity: { duration: 1.5, delay: 0.2 },
              scale: {
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading isMobile={isMobile} />

        <motion.div
          className="max-w-6xl mx-auto"
          style={{ opacity, scale }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative"
            style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            {/* Animated border glow */}
            {hasBeenVisible && (
              <motion.div
                className="absolute inset-0 border border-accent/10 rounded-xl pointer-events-none"
                animate={{
                  opacity: isInView ? [0, 0.5, 0] : 0,
                  boxShadow: [
                    "inset 0 0 0px rgba(147, 51, 234, 0)",
                    "inset 0 0 20px rgba(147, 51, 234, 0.3)",
                    "inset 0 0 0px rgba(147, 51, 234, 0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                  repeatType: "mirror"
                }}
              />
            )}

            {/* Contact Info */}
            <div className="lg:col-span-7 p-5 md:p-8 relative">
              <div className="h-full flex flex-col justify-between">
                <div className="mb-8">
                  <motion.h3
                    className="text-xl md:text-2xl font-bold mb-3 text-gradient"
                    initial={false}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    Let&apos;s Work Together
                  </motion.h3>
                  <motion.p
                    className="text-muted max-w-lg text-sm md:text-base"
                    initial={false}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -2 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    I&apos;m currently available for freelance work and collaboration opportunities.
                    Feel free to reach out if you have a project in mind or just want to connect.
                  </motion.p>
                </div>
                <div className="space-y-5 md:space-y-8">
                  {contactMethods.map((method, i) => (
                    <ContactMethod
                      key={method.title}
                      {...method}
                      index={i}
                      isInView={isInView}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-5 bg-gradient-to-br from-card/80 to-card p-5 md:p-8 flex flex-col justify-between relative"
              style={{ borderLeft: "1px solid rgba(var(--border-rgb), 0.1)" }}>
              <div className="relative z-10">
                <motion.h3
                  className="text-xl font-bold mb-6 text-gradient"
                  initial={false}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 3 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  Connect With Me
                </motion.h3>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={socialVariants}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  {socialLinks.map((social) => (
                    <div key={social.name} className="flex flex-col items-center">
                      <SocialLink {...social} isMobile={isMobile} />
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
              <motion.div
                className="mt-8 pt-4 border-t border-border/20"
                initial={false}
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
                      repeatType: "mirror"
                    }}
                  />
                  <span className="text-xs text-accent">Available for new projects</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="mt-12 text-center"
          initial={false}
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

Contact.displayName = "Contact";

export default Contact;