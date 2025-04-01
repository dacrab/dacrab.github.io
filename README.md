# Portfolio Website with GitHub Integration

This is a modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It features an elegant and interactive design with dynamic GitHub project integration.

## Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Animated UI**: Smooth animations and transitions powered by Framer Motion
- **GitHub Integration**: Automatically displays your GitHub repositories as projects
- **Dynamic Theming**: Visual elements adapt to project languages and technologies
- **Image-less Design**: Uses creative dynamic elements instead of static images
- **SEO Optimized**: Built with best practices for search engine visibility

## Getting Started

First, set up your GitHub username and token in the environment variables:

1. Create or modify the `.env.local` file in the root directory
2. Set your GitHub username: `NEXT_PUBLIC_GITHUB_USERNAME=your-username`
3. **Important**: Add a GitHub token to avoid API rate limits:
   - Generate a token at https://github.com/settings/tokens
   - Only the `public_repo` scope is needed for public repositories
   - Add to `.env.local`: `GITHUB_ACCESS_TOKEN=your_token_here`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GitHub API Integration

This portfolio uses a secure approach to integrate with GitHub:

### Secure API Route

Instead of making GitHub API calls directly from the client (which would expose any tokens), we use a Next.js API route that acts as a secure proxy:

- Client-side code requests data from `/api/github` route
- Server-side API route uses the GitHub token securely
- This prevents token exposure in client-side code
- Better error handling for rate limits and other GitHub API issues

### Troubleshooting GitHub Integration

If you see a "GitHub API error: 403" message, it likely means you've hit GitHub's rate limits. To fix this:

1. Generate a GitHub personal access token at https://github.com/settings/tokens
2. Add it to your `.env.local` file: `GITHUB_ACCESS_TOKEN=your_token_here`
3. Restart your development server

For other GitHub integration issues:
- Check that your GitHub username is correct in `.env.local`
- Ensure your token has the necessary permissions (public_repo is sufficient)
- Check the browser console and server logs for detailed error messages

## Customization

You can customize the GitHub integration by modifying the following files:

- `src/app/api/github/route.ts`: Server-side API route that securely calls GitHub
- `src/services/github.ts`: Data transformation and utility functions
- `src/hooks/useGitHubProjects.ts`: React hook that manages data fetching
- `src/components/Projects.tsx`: How projects are displayed

You can change the filtering options, sorting, and display logic in these files.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
