import "./globals.css";
import "./animations.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Define font variables - use different instances for sans and mono
const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Portfolio | Web Developer",
  description: "Personal portfolio showcasing modern web development projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine the font variables into a single string to avoid hydration mismatches
  const fontClasses = `${sans.variable} ${mono.variable}`;
  
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
