"use client";

import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion"; 
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionBackground from "@/components/SectionBackground";

// Define section types for type safety

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

  // Update when sections are in view for use in background rendering
  useEffect(() => {
    // Logic for determining which section is most in view
    // This is now just using the boolean values directly in the JSX
  }, [heroInView, aboutInView, projectsInView, experienceInView, contactInView]);

  return (
    <main className="min-h-screen bg-background">
      {/* Only Hero Background */}
      <div className="fixed inset-0 -z-10">
        {heroInView && (
          <motion.div 
            key="hero-bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <SectionBackground 
              variant="grid"
              intensity={0.6} 
              color="accent"
              isInView={true} 
            />
          </motion.div>
        )}
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
