"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, AnimatePresence, motion } from "framer-motion"; 
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionBackground from "@/components/SectionBackground";

// Define section types for type safety
type SectionType = "hero" | "about" | "projects" | "experience" | "contact" | null;
// Define background variant type to match SectionBackground component
type BackgroundVariant = "code" | "tech" | "grid" | "blueprint";

export default function Home() {
  // Create refs for each section
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  
  // Use InView hooks with different threshold to determine when each section is in view
  const heroInView = useInView(heroRef, { amount: 0.5, once: false });
  const aboutInView = useInView(aboutRef, { amount: 0.5, once: false });
  const projectsInView = useInView(projectsRef, { amount: 0.5, once: false });
  const experienceInView = useInView(experienceRef, { amount: 0.5, once: false });
  const contactInView = useInView(contactRef, { amount: 0.5, once: false });

  // State to track the current active section for smoother transitions
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
  
  // Update active section based on which section is most in view
  useEffect(() => {
    // Set active section with a slight debounce to avoid flicker
    const timer = setTimeout(() => {
      if (heroInView) setActiveSection("hero");
      else if (aboutInView) setActiveSection("about");
      else if (projectsInView) setActiveSection("projects");
      else if (experienceInView) setActiveSection("experience");
      else if (contactInView) setActiveSection("contact");
    }, 50);
    
    return () => clearTimeout(timer);
  }, [heroInView, aboutInView, projectsInView, experienceInView, contactInView]);

  // Background configuration for each section
  const backgroundConfig: Record<Exclude<SectionType, null>, {variant: BackgroundVariant, intensity: number, color: string}> = {
    hero: { variant: "grid", intensity: 0.6, color: "accent" },
    about: { variant: "tech", intensity: 0.7, color: "accent" },
    projects: { variant: "code", intensity: 0.8, color: "accent" },
    experience: { variant: "blueprint", intensity: 0.7, color: "accent" },
    contact: { variant: "grid", intensity: 0.5, color: "accent" }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Section-specific Backgrounds with smooth transitions using AnimatePresence */}
      <div className="fixed inset-0 -z-10">
        <AnimatePresence mode="wait">
          {/* Default base background - always shown when no other section is active */}
          {!activeSection && (
            <motion.div
              key="default-bg"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <SectionBackground variant="grid" intensity={0.3} color="accent" isInView={true} />
            </motion.div>
          )}
          
          {activeSection && (
            <motion.div 
              key={`${activeSection}-bg`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <SectionBackground 
                variant={backgroundConfig[activeSection].variant}
                intensity={backgroundConfig[activeSection].intensity} 
                color={backgroundConfig[activeSection].color}
                isInView={true} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Content with refs */}
      <div className="relative z-10">
        <Navbar />
        <section ref={heroRef} className="min-h-screen">
          <Hero />
        </section>
        <section ref={aboutRef} className="min-h-screen">
          <About />
        </section>
        <section ref={projectsRef} className="min-h-screen">
          <Projects />
        </section>
        <section ref={experienceRef} className="min-h-screen">
          <Experience />
        </section>
        <section ref={contactRef} className="min-h-screen">
          <Contact />
        </section>
        <Footer />
      </div>
    </main>
  );
}
