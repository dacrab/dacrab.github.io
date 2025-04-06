"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Create refs for each section
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <main className="min-h-screen bg-background">
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
