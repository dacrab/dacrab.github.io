interface Project {
  title: string;
  blurb: string;
  tech: string[];
  link: string;
}

export const projects: Project[] = [
  {
    title: 'AUREUS & ARGENT',
    blurb: 'Trust-forward pawn shop website with interactive tools and a clear, compact UI.',
    tech: ['Svelte', 'SvelteKit', 'TailwindCSS', 'TypeScript'],
    link: 'https://gsm-beta.vercel.app/',
  },
  {
    title: 'VoidHaus',
    blurb: 'Production-ready luxury fashion website benchmarked against Rick Owens and Maison Margiela.',
    tech: ['Astro', 'Svelte', 'GSAP', 'TypeScript'],
    link: 'https://voidhaus.vercel.app',
  },
  {
    title: 'DesignDASH',
    blurb: 'Showcasing construction work with structured galleries and specs.',
    tech: ['Astro', 'TailwindCSS', 'GSAP', 'TypeScript'],
    link: 'https://designdash.gr',
  },
  {
    title: 'FeedbackFlow AI',
    blurb: 'Micro-SaaS to ingest public feedback, analyze with LLMs for sentiment, topics, and triage.',
    tech: ['NextJS', 'Neon', 'TypeScript', 'TailwindCSS'],
    link: 'https://feedbackflow-ai.vercel.app',
  },
  {
    title: 'ClubOS',
    blurb: 'Modern point-of-sale system for clubs and venues with real-time inventory.',
    tech: ['Svelte', 'SvelteKit', 'Supabase', 'TypeScript'],
    link: 'https://clubos.vercel.app',
  },
  {
    title: 'Mise',
    blurb: 'Recipe sharing platform with social interactions, real-time presence, and ingredient scaling.',
    tech: ['TanStack Start', 'React', 'Convex', 'TypeScript'],
    link: 'https://mise-tan.vercel.app',
  },
  {
    title: 'Planet Pulse',
    blurb: 'Real-time global event monitoring — earthquakes, news, space, weather, crypto, and sports.',
    tech: ['NextJS', 'TypeScript', 'TailwindCSS', 'APIs'],
    link: 'https://planet-pulse-pi.vercel.app',
  },
];
