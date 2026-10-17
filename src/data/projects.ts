interface Project {
  title: string;
  blurb: string;
  tech: string[];
  link: string;
}

// Ordered strongest-first. `tech[0]` is rendered as the primary technology on
// the collapsed row, so it should be the most representative one.
export const projects: Project[] = [
  {
    title: 'ClubOS',
    blurb:
      'Point-of-sale and club management for sports facilities and venues — checkout, bookings, multi-location tenancy, and Polar-powered subscriptions.',
    tech: ['SvelteKit', 'Svelte', 'Drizzle', 'Neon', 'TypeScript'],
    link: 'https://clubos.vercel.app',
  },
  {
    title: 'TeleStash',
    blurb:
      'Android gallery that backs up your camera roll to your own Telegram account. No middleman server, original-quality uploads, Google Photos-style grid.',
    tech: ['Kotlin', 'Jetpack Compose', 'TDLib', 'Android'],
    link: 'https://github.com/dacrab/telestash',
  },
  {
    title: 'CraftOps',
    blurb:
      'Go CLI for Minecraft server operations — Modrinth mod updates, compressed backups, Discord alerts, and a built-in health check suite.',
    tech: ['Go', 'Docker', 'Modrinth API'],
    link: 'https://github.com/dacrab/craftops',
  },
  {
    title: 'Topos',
    blurb:
      'Multi-tenant SaaS for real estate agencies. Every agency gets a branded public site with its listings and team, plus a shared dashboard.',
    tech: ['NextJS', 'React', 'Drizzle', 'Neon', 'Clerk'],
    link: 'https://topos-lyart.vercel.app',
  },
  {
    title: 'Portlane',
    blurb:
      'Client portal for freelancers and studios — projects, time tracking, files, and invoices behind one link instead of email threads.',
    tech: ['SvelteKit', 'Drizzle', 'Neon', 'Stripe', 'TypeScript'],
    link: 'https://portlane.vercel.app',
  },
  {
    title: 'FadeIn',
    blurb:
      'Barbershop booking platform — discovery, interactive maps, reviews, and appointments with real-time availability.',
    tech: ['TanStack Start', 'React', 'Convex', 'Clerk', 'Polar'],
    link: 'https://fade-in-dacrabs-projects.vercel.app',
  },
  {
    title: 'Reddit Gallery DL',
    blurb:
      'Streams Reddit galleries straight to a ZIP with no account or API keys — pure Go standard library, and it keeps working when a lookup source is blocked.',
    tech: ['Go', 'Docker', 'Stdlib'],
    link: 'https://reddit-gallery-dl.onrender.com',
  },
  {
    title: 'FeedbackFlow AI',
    blurb:
      'Turns a GitHub repo into a feedback inbox that reads itself — every issue tagged with sentiment, severity, and topics, with Slack alerts.',
    tech: ['NextJS', 'Drizzle', 'Neon', 'LLM', 'TypeScript'],
    link: 'https://feedbackflow-ai.vercel.app',
  },
  {
    title: 'VoidHaus',
    blurb:
      'Dark luxury fashion storefront — a prerendered SvelteKit catalogue with Convex-backed per-size stock and Stripe Checkout.',
    tech: ['SvelteKit', 'Svelte', 'Convex', 'Stripe', 'TypeScript'],
    link: 'https://voidhaus.vercel.app',
  },
  {
    title: 'Planet Pulse',
    blurb:
      'Real-time dashboard tracking earthquakes, news, space, weather, crypto, and sports in one view.',
    tech: ['SolidJS', 'Vite', 'TypeScript', 'TailwindCSS'],
    link: 'https://planet-pulse-pi.vercel.app',
  },
  {
    title: 'Dragon Blaze',
    blurb:
      '2D action platformer built in Unity featuring fluid movement, combat systems, and a modular architecture.',
    tech: ['Unity', 'C#', 'Game Design'],
    link: 'https://github.com/dacrab/dragon-blaze',
  },
  {
    title: 'Mise',
    blurb:
      'Recipe sharing platform with social interactions, real-time presence, and ingredient scaling.',
    tech: ['TanStack Start', 'React', 'Convex', 'TypeScript'],
    link: 'https://github.com/dacrab/mise',
  },
  {
    title: 'Aureus & Argent',
    blurb:
      'Trust-forward pawn shop website with interactive tools and a clear, compact UI.',
    tech: ['SvelteKit', 'TailwindCSS', 'TypeScript', 'Leaflet'],
    link: 'https://gsm-beta.vercel.app/',
  },
  {
    title: 'DesignDash',
    blurb:
      'Showcasing construction work with structured galleries and specs.',
    tech: ['Astro', 'TailwindCSS', 'GSAP', 'TypeScript'],
    link: 'https://designdash.gr',
  },
];
