"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";

// Lazy load components - without immediate mounting
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Progressively load sections as user scrolls */}
      <LazySection component={About} id="about" preloadMargin="400px" />
      <LazySection component={Projects} id="projects" preloadMargin="400px" />
      <LazySection component={Experience} id="experience" preloadMargin="400px" />
      <LazySection component={Contact} id="contact" preloadMargin="400px" />
      
      <Footer />
    </main>
  );
}
