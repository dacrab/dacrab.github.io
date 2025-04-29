import { ReactNode } from "react";
import { Github, Instagram, Linkedin } from "lucide-react";

// Type definitions for Contact components
export interface ContactMethod {
  title: string;
  value: string;
  icon: ReactNode;
  link: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: typeof Github | typeof Linkedin | typeof Instagram;
}

// Contact methods data
export const contactMethods: ContactMethod[] = [
  {
    title: "Email",
    value: "vkavouras@proton.me",
    link: "mailto:vkavouras@proton.me",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Phone",
    value: "+30 6906004150",
    link: "tel:+306906004150",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

// Social links data
export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vkavouras/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/dacrab",
    icon: Github,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/killcrb/",
    icon: Instagram,
  },
]; 