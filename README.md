# 🚀 Modern Portfolio Website

A professional portfolio website built with cutting-edge technologies, featuring Swiss Style design principles, responsive layouts, and dynamic GitHub repository integration.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.0-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.6.2-purple)

## ✨ Features

- **📱 Fully Responsive Design**: Optimized for all devices from mobile to desktop
- **🇨🇭 Swiss Style Design**: Minimalist, clean layouts with strong typography and geometric elements
- **🎭 Stunning Animations**: Smooth transitions and eye-catching effects powered by Framer Motion
- **💻 GitHub Integration**: Automatically fetches and displays repositories as showcased projects
- **🔄 Dynamic Project Showcase**: Featured projects section with custom projects and auto-populated GitHub repositories
- **🌟 Interactive UI Elements**: Engaging user experience with hover effects and responsive interactions
- **🌙 Modern Aesthetics**: Clean, contemporary design using Tailwind CSS and custom styling
- **🖌️ Custom Animation System**: Sophisticated animation utilities for consistent motion across the site
- **👁️ Intersection Observer**: Elements animate as they enter the viewport for a dynamic experience
- **🔍 SEO Optimized**: Meta tags and semantic structure for improved search engine visibility

## 🔥 Featured Projects

The portfolio showcases my most significant projects, including:

### 🏢 Argicon.gr
A sophisticated technical construction company website built with Next.js, TypeScript, and Tailwind CSS, featuring multi-language support, responsive design, and elegant animations.

### 🎨 DesignDash.gr
A comprehensive platform for a technical construction firm with project galleries, technical specifications, and service offerings.

### 📊 Proteas Dashboard
A warehouse management system for sports facilities with role-based access control, built with Next.js, Supabase, and TypeScript.

## 🛠️ Technologies Used

- **[Next.js 15.2.4](https://nextjs.org/)**: React framework with optimized rendering and routing
- **[React 19.0.0](https://react.dev/)**: UI library for building component-based interfaces
- **[TypeScript 5.7.2](https://www.typescriptlang.org/)**: Type safety and enhanced developer experience
- **[Tailwind CSS 4.0.0](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development
- **[Framer Motion 12.6.2](https://www.framer.com/motion/)**: Animation library for fluid transitions
- **[React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)**: Intersection detection for scroll animations

## 🇨🇭 Swiss Style Design

This portfolio embraces Swiss Style (International Typographic Style) design principles:

- **Bold Typography**: Clean, readable type hierarchy with proper spacing
- **Grid-Based Layout**: Structured organization of content using a grid system
- **Minimal Geometric Elements**: Simple shapes and clean lines in the design
- **Strategic Use of Color**: Limited color palette with strong accent colors
- **Asymmetrical Balance**: Dynamic layouts with visual weight distribution
- **White Space**: Generous use of negative space to create visual hierarchy
- **Sans-Serif Typography**: Modern, clean font choices prioritizing readability

## 🚀 Getting Started

### Prerequisites

- Node.js (18.x or later)
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/dacrab/portfolio.git
cd portfolio
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
GITHUB_ACCESS_TOKEN=your-github-token
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** to see your portfolio

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router components
│   ├── api/             # API routes, including GitHub integration
│   ├── layout.tsx       # Root layout with metadata and fonts
│   ├── page.tsx         # Main homepage
│   └── globals.css      # Global styles and animations
├── components/          # Reusable UI components
│   ├── About/           # About section components
│   ├── Contact/         # Contact form and information
│   ├── Experience/      # Work experience timeline
│   ├── Hero/            # Hero section elements
│   ├── Navbar/          # Navigation components
│   ├── Projects/        # Project showcase components
│   └── ui/              # UI primitives and shared elements
├── hooks/               # Custom React hooks
│   └── useGitHubProjects.ts  # GitHub data fetching
├── utils/               # Utility functions
│   └── animations.ts    # Animation helpers
└── types/               # TypeScript type definitions
```

## 🌐 GitHub Integration

This portfolio features secure GitHub integration to showcase your repositories:

### How it works

1. The `useGitHubProjects` hook fetches repository data through a secure server-side API route
2. Projects are transformed and displayed in the "More Projects" section
3. Featured projects (custom websites you've built) are showcased at the top

### Troubleshooting

If you encounter GitHub API rate limits:

1. Generate a token at https://github.com/settings/tokens
2. Add it to your `.env.local` file
3. Restart the development server

## 🎨 Customization

### Featured Projects

Edit the `customProjects` array in `src/components/Projects.tsx` to showcase your own work:

```typescript
const customProjects = useMemo(() => [
  {
    id: 91,
    title: "Your Project",
    description: "Description of your amazing project",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
    link: "https://yourproject.com",
  },
  // Add more projects
], []);
```

### Styling

This project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`.

## 📱 Responsive Design

The portfolio is fully responsive with optimized layouts for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Fonts](https://fonts.google.com/) - Typography
