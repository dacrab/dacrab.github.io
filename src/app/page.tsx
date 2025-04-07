"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";

// Lazy load components with loading priority and suspense
const About = dynamic(() => import('@/components/About'), { 
  ssr: false,
  loading: () => <div className="min-h-[300px]" /> // Placeholder to prevent layout shift
});
const Projects = dynamic(() => import('@/components/Projects'), { 
  ssr: false,
  loading: () => <div className="min-h-[300px]" />
});
const Experience = dynamic(() => import('@/components/Experience'), { 
  ssr: false, 
  loading: () => <div className="min-h-[300px]" />
});
const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: false,
  loading: () => <div className="min-h-[300px]" />
});

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Progressively load sections as user scrolls with increased threshold */}
      <LazySection component={About} id="about" preloadMargin="500px" />
      <LazySection component={Projects} id="projects" preloadMargin="500px" />
      <LazySection component={Experience} id="experience" preloadMargin="500px" />
      <LazySection component={Contact} id="contact" preloadMargin="500px" />
      
      <Footer />
    </main>
  );
}
