"use client";

import { Linkedin, Github, Instagram } from "lucide-react";
import SwissMotion from "./SwissMotion";
import StaggerItem from "./StaggerItem";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";

// Constants
const QUICK_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vkavouras/",
    icon: <Linkedin size={20} />,
  },
  {
    name: "GitHub",
    url: "https://github.com/dacrab",
    icon: <Github size={20} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/killcrb/",
    icon: <Instagram size={20} />,
  },
];

const EMAIL = "vkavouras@proton.me";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--foreground)] relative">
      {/* Decorative elements */}
      <ParallaxLayer speed={0.15} direction="down" className="absolute top-0 left-1/4">
        <ShapeAnimation 
          type="line" 
          color="var(--accent)" 
          size={64} 
          strokeWidth={4}
          variant="draw"
          delay={0.3}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.1} direction="up" className="absolute bottom-16 right-8">
        <ShapeAnimation 
          type="square" 
          color="var(--accent-secondary)" 
          size={48} 
          variant="float"
          delay={0.5}
          loop={true}
        />
      </ParallaxLayer>
      
      <div className="swiss-container py-16">
        <div className="swiss-grid mb-16">
          {/* About Section */}
          <FooterSection 
            title="ABOUT" 
            delay={0.2}
            className="swiss-asymmetric-small"
          >
            <p className="swiss-body">
              A passionate web developer focused on creating beautiful,
              functional, and user-friendly experiences.
            </p>
          </FooterSection>

          {/* Links Section */}
          <FooterSection 
            title="LINKS" 
            delay={0.3}
            className="swiss-asymmetric-small mt-12 md:mt-0"
          >
            <SwissMotion type="stagger" staggerChildren={0.06} className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <StaggerItem key={item.label} type="fade" whileHover="lift">
                  <li>
                    <a href={item.href} className="swiss-nav-item">
                      {item.label}
                    </a>
                  </li>
                </StaggerItem>
              ))}
            </SwissMotion>
          </FooterSection>

          {/* Connect Section */}
          <FooterSection 
            title="CONNECT" 
            delay={0.4}
            className="swiss-asymmetric-small mt-12 md:mt-0"
          >
            <div className="flex space-x-6 mb-8">
              {SOCIAL_LINKS.map((social) => (
                <StaggerItem key={social.name} type="fade" whileHover="scale">
                  <a
                    href={social.url}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    {social.icon}
                  </a>
                </StaggerItem>
              ))}
            </div>

            <SwissMotion 
              type="scale" 
              delay={0.6} 
              duration={0.5}
              whileHover="lift"
              className="swiss-card"
            >
              <p className="swiss-caption mb-2">
                Want to get in touch? Send me an email at:
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[var(--accent)] font-bold uppercase"
              >
                {EMAIL}
              </a>
            </SwissMotion>
          </FooterSection>
        </div>

        {/* Copyright */}
        <CopyrightSection year={currentYear} />
      </div>
    </footer>
  );
}

function FooterSection({ title, children, delay, className }: {
  title: string;
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <SwissMotion type="slide" delay={delay} duration={0.7} className={className}>
      <h3 className="swiss-heading-3 mb-6">{title}</h3>
      <SwissMotion type="reveal" delay={delay + 0.1} duration={0.5}>
        <div className="w-12 h-1 bg-[var(--foreground)] mb-4" />
      </SwissMotion>
      {children}
    </SwissMotion>
  );
}

function CopyrightSection({ year }: { year: number }) {
  return (
    <SwissMotion type="fade" delay={0.7} duration={0.6} className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <SwissMotion type="rotate" delay={0.8} duration={0.5} className="w-6 h-6 bg-[var(--accent)] mr-3 flex items-center justify-center">
          <div className="w-3 h-3 bg-[var(--background)]" />
        </SwissMotion>
        <span className="font-bold uppercase">VAGGELIS KAVOURAS</span>
      </div>
      
      <div className="text-[var(--muted)] text-sm uppercase tracking-wider">
        © {year} ALL RIGHTS RESERVED
      </div>
    </SwissMotion>
  );
}