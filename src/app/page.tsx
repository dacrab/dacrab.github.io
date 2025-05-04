"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero/index";
import LazySection from "@/components/LazySection";
import ScrollIndicator from "@/components/ScrollIndicator";

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
    <main className="flex flex-col min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Add the scroll indicator */}
      <ScrollIndicator position="top" thickness={3} hideAtTop={true} />
      
      {/* Swiss-style layout with clear visual separation */}
      <div className="flex-grow">
        <Hero />
        
        {/* Alternating section backgrounds for Swiss style contrast */}
        <div className="bg-[var(--background)]">
          <LazySection component={About} id="about" preloadMargin="500px" />
        </div>
        
        <div className="relative">
          {/* Swiss style diagonal separator */}
          <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
            <div className="swiss-diagonal-divider"></div>
          </div>
          <div className="bg-[var(--card)]">
            <LazySection component={Projects} id="projects" preloadMargin="500px" />
          </div>
        </div>
        
        <div className="bg-[var(--background)]">
          <LazySection component={Experience} id="experience" preloadMargin="500px" />
        </div>
        
        <div className="relative">
          {/* Swiss style diagonal separator */}
          <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
            <div className="swiss-diagonal-divider"></div>
          </div>
          <div className="bg-[var(--card)]">
            <LazySection component={Contact} id="contact" preloadMargin="500px" />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
