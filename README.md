# Swiss‑style Portfolio Website

A professional portfolio built with Astro, following a modern Swiss‑style design system:
grid‑first layout, high contrast, sans‑serif typography, and a Swiss red accent.
Enhanced interactions, dynamic GitHub integration, and interactive project galleries with
premium UX.

![Astro](https://img.shields.io/badge/Astro-5.13.2-FF5D01)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Lightning CSS](https://img.shields.io/badge/Lightning_CSS-1.30.1-yellow)
![React](https://img.shields.io/badge/React-19.1.0-blue)

## Features

- **Design system**: Swiss palette (white/black/red accent #E31C1C), system sans, crisp type, hairline dividers
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Project gallery**: Modal galleries with language switching
- **CV access**: Downloadable CV with language options
- **GitHub integration**: Live repository data with graceful error handling
- **Animations**: Intersection-based reveals and subtle motion
- **Dark mode**: Accessible, high-contrast theme
- **Performance**: Lean code and minimal bundle size
- **SEO**: Semantic structure and metadata

## 🔥 Featured Projects

The portfolio showcases professional projects with interactive galleries:

### Silver and Gold Money

A modern pawn shop landing page with services like loans, gold/silver trading, and calculator tools.
Built with Svelte and SvelteKit.

- **Gallery**: 8 pages including home, services, calculators, and contact

### Argicon.gr

Technical construction company website with professional portfolio showcase and service offerings.

- **Gallery**: 4 pages featuring homepage, projects, services, and contact

### DesignDash.gr

Digital construction platform with comprehensive project galleries and technical specifications.

- **Gallery**: 5 pages showcasing complete business solutions

## 🛠️ Tech Stack

- **[Astro 5.13.2](https://astro.build/)**: Static site generator with optimal performance
- **[React 19.1.0](https://react.dev/)**: Component library for interactive elements
- **[TypeScript 5.7.2](https://www.typescriptlang.org/)**: Type safety and enhanced developer
  experience
- **[Lightning CSS 1.30.1](https://lightningcss.dev/)**: Fast CSS bundling and optimization
- **[React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)**:
  Scroll-based animations

## Swiss Design System

This portfolio follows the International Typographic (Swiss) Style:

- **Crisp Typography**: System sans (Helvetica/Inter) with precise tracking; no decorative shadows
- **Grid-Based Layout**: Structured organization using precise grid systems and asymmetric balance
- **Swiss Color Palette**: White/black foundation with a Swiss red accent (#E31C1C); high contrast in light and dark
- **High Contrast**: Clear type without glows; emphasis through scale, weight, and spacing
- **Keyword Highlighting**: Strategic highlights for important terms and skills
- **Minimal Motion**: Subtle transitions only; reduced blur and no ambient effects
- **Functional Beauty**: Every element serves a purpose while maintaining visual appeal
- **Progressive Enhancement**: Graceful fallbacks and optimized performance across all devices

## Getting Started

### Prerequisites

- Node.js (18.x or later)
- npm, yarn, or bun

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/dacrab/dacrab.github.io.git
cd dacrab.github.io
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
bun install
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. **Open [http://localhost:4321](http://localhost:4321)** to see the portfolio

### Build for Production

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
src/
├── layouts/
│   └── Layout.astro         # Main layout with metadata and fonts
├── pages/
│   └── index.astro          # Homepage
├── components/
│   ├── Navigation.astro     # Fixed navigation with scroll effects
│   ├── Hero.astro          # Hero section with CV dropdown
│   ├── About.astro         # About section with skills
│   ├── Projects.astro      # Projects with galleries and GitHub API
│   └── Contact.astro       # Contact section with social links
├── styles/
│   └── globals.css         # All styles with CSS variables
└── public/
    ├── cv/                 # CV files (English and Greek)
    ├── designdash/         # DesignDash project screenshots
    ├── gsm/               # GSM project screenshots
    └── argicon/           # Argicon project screenshots
```

## 🔄 Recent Improvements (2025)

### Code Quality & Performance

- **Complete Refactoring**: All components restructured with clean, modular code
- **Inline Style Removal**: Replaced inline styles with proper CSS classes for maintainability
- **JavaScript Optimization**: Class-based architecture with better error handling
- **Enhanced Animations**: Improved scroll indicators with looping animations and hover effects

### User Experience Enhancements

- **High Contrast Text**: Clear readability using the Swiss palette; no text shadows
- **Keyword Highlighting**: Strategic highlighting for better content scanning
- **Compact Layout**: Optimized spacing and content density in About section
- **Interactive Elements**: Enhanced dropdowns, galleries, and navigation with smooth transitions

### Technical Improvements

- **TypeScript Safety**: Improved type checking and eliminated undefined object errors
- **CSS Variables**: Swiss palette tokens (white/black/red) with light/dark mappings
- **Performance Monitoring**: Optimized loading states and intersection observers
- **Mobile Optimization**: Better responsive design with enhanced mobile interactions

## 🎨 Key Features

### Interactive Project Gallery

Each project features a modal gallery with:

- Full-screen image viewing
- Thumbnail navigation
- Keyboard controls (ESC to close)
- Smooth animations and transitions

### CV Download Dropdown

Professional CV download with:

- Flag indicators for language selection
- Smooth dropdown animations
- Click-outside-to-close functionality

### GitHub Integration

Live repository data featuring:

- Most recently updated repositories
- Language indicators and star counts
- Direct links to GitHub projects
- Error handling for API failures

### Enhanced Typography

Sharp, professional text rendering with:

- Inter font family for optimal readability
- Advanced font feature settings
- Antialiased text rendering
- Proper kerning and ligatures

## 🌐 GitHub API Integration

The portfolio automatically fetches your latest repositories:

```javascript
// Fetches 6 most recent repositories
const response = await fetch('https://api.github.com/users/dacrab/repos?sort=updated&per_page=6');
```

No API token required for public repositories, but rate limits apply.

## 📱 Responsive Design

Fully responsive with breakpoints for:

- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktops (> 1024px)

## 🎭 Animations & Interactions

- Intersection Observer for scroll-triggered animations
- CSS transitions for smooth hover effects
- Gallery modal with backdrop blur
- Navigation scroll effects
- Staggered element animations

## 🌙 Dark Mode Support

Automatic theme detection using:

```css
@media (prefers-color-scheme: dark) {
  /* Dark theme variables */
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Lightning CSS](https://lightningcss.dev/) - Fast CSS processing
- [Inter Font](https://rsms.me/inter/) - Professional typography
- [React](https://react.dev/) - Component library
- International Typographic Style (Swiss) - Design inspiration

---

Built with care by DaCrab using Swiss design principles and cutting-edge web technologies.
Featuring premium animations, enhanced accessibility, and optimized performance for the modern web.
