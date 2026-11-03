# Vaggelis Kavouras

Personal portfolio for Vaggelis Kavouras, a full-stack web developer.

**Live demo:** https://dacrab.github.io — also served at [dacrab.is-a.dev](https://dacrab.is-a.dev)

It's one long page: a brief introduction, a list of selected projects with links, and a few words about how he works. His CV is available in English and Greek, alongside GitHub, LinkedIn, and email.

## What's on it

- A short intro with the CV downloads
- Selected projects, ordered strongest first, each linking to the live site or repo
- An about section and contact details
- A light opening that gives way to dark, high-contrast sections, with smooth scrolling and subtle motion

## Running it

```bash
bun install
bun run dev
```

`bun run build` generates the static site.

## Editing content

- `src/data/site.ts` holds the name, role, social links, email, and CV paths
- `src/data/projects.ts` holds the selected work
- The CVs themselves are PDFs in `public/CV/`

Built with Astro, Tailwind CSS v4, GSAP, and Lenis.

## License

MIT
