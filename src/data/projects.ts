export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Portfolio Website",
    description: "A responsive portfolio website built with Next.js, TailwindCSS, and Framer Motion. Features Swiss style design principles and animated UI elements.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    image: "/images/projects/portfolio.jpg",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
    featured: true
  },
  {
    id: "project-2",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with product catalog, shopping cart, and payment processing capabilities.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    image: "/images/projects/ecommerce.jpg",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://yourecommerce.com"
  },
  {
    id: "project-3",
    title: "Task Management App",
    description: "A productivity application for organizing tasks with drag-and-drop functionality, priority levels, and deadline tracking.",
    technologies: ["React", "Redux", "Firebase", "Material UI"],
    image: "/images/projects/taskapp.jpg",
    githubUrl: "https://github.com/yourusername/taskapp"
  },
  {
    id: "project-4",
    title: "Weather Dashboard",
    description: "A real-time weather dashboard that displays current conditions and forecasts based on user location or search queries.",
    technologies: ["JavaScript", "OpenWeather API", "Chart.js", "HTML/CSS"],
    image: "/images/projects/weather.jpg",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    liveUrl: "https://yourweatherdashboard.com"
  },
  {
    id: "project-5",
    title: "Social Media Analytics Tool",
    description: "A data visualization tool for social media metrics, helping users track engagement and growth across platforms.",
    technologies: ["Python", "Django", "D3.js", "PostgreSQL", "Social Media APIs"],
    image: "/images/projects/analytics.jpg",
    githubUrl: "https://github.com/yourusername/social-analytics"
  },
  {
    id: "project-6",
    title: "Mobile Fitness App",
    description: "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals.",
    technologies: ["React Native", "Firebase", "Redux", "Health APIs"],
    image: "/images/projects/fitness.jpg",
    githubUrl: "https://github.com/yourusername/fitness-app",
    liveUrl: "https://yourfitnessapp.com"
  }
]; 