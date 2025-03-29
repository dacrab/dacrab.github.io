import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Animated Backgrounds */}
      <div className="fixed inset-0 -z-20">
        <AnimatedBackground variant="particles" color="accent" intensity={0.7} />
      </div>
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress showPercentage showArrow position="top" />
      
      {/* Content */}
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
