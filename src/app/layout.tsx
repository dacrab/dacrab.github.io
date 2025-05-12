import "./globals.css";
import "./animations.css";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

// Define font variables - Use Space Grotesk for sans (modern geometric sans-serif)
// and JetBrains Mono for monospace (perfect for code and technical content)
const sans = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" }
  ]
};

export const metadata: Metadata = {
  title: "DaCrab | Creative Web Developer & Designer",
  description: "A modern portfolio showcasing Swiss Style web development projects, UI/UX design, and creative coding",
  keywords: ["web developer", "frontend", "UI/UX", "Swiss design", "React", "NextJS", "portfolio"],
  authors: [{ name: "DaCrab" }],
  openGraph: {
    type: "website",
    title: "DaCrab | Creative Web Developer & Designer",
    description: "A modern portfolio showcasing Swiss Style web development projects, UI/UX design, and creative coding",
    siteName: "DaCrab Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaCrab | Creative Web Developer & Designer",
    description: "A modern portfolio showcasing Swiss Style web development projects, UI/UX design, and creative coding",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine the font variables into a single string to avoid hydration mismatches
  const fontClasses = `${sans.variable} ${mono.variable}`;
  
  return (
    <html 
      lang="en" 
      className={`${fontClasses} smooth-scroll`} 
      suppressHydrationWarning
    >
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        {/* Grid background for Swiss style aesthetic */}
        <div className="fixed inset-0 swiss-grid-pattern pointer-events-none opacity-5 z-0"></div>
        {children}
      </body>
    </html>
  );
}
