import "./globals.css";
import "./animations.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Define font variables
const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-helvetica",
});

const mono = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-helvetica-mono",
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
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
