/**
 * NEXT.JS CONCEPT: Root Layout
 *
 * Every page is wrapped inside this layout automatically.
 * It replaces two things from the old Vite setup:
 *   - index.html  (the <html>/<head>/<body> structure)
 *   - src/main.tsx (where providers were set up)
 *
 * This file is a SERVER Component by default (no "use client").
 * That means it renders on the server — great for SEO and performance.
 * Providers that need browser APIs are wrapped in the client <Providers> component.
 */

import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

/**
 * NEXT.JS CONCEPT: next/font
 *
 * Instead of loading fonts via a <link> tag to Google Fonts (which requires
 * a network request at runtime), Next.js downloads the fonts at BUILD TIME
 * and serves them from your own server. Faster, no external dependency.
 *
 * variable: "--font-playfair" creates a CSS variable that we use in theme.ts
 */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-raleway",
  display: "swap",
});

/**
 * NEXT.JS CONCEPT: Metadata API
 *
 * Replaces the <title>, <meta>, and <link rel="icon"> tags in index.html.
 * Next.js reads this export and injects the correct <head> tags automatically.
 * Works with SEO, social sharing previews, etc.
 */
export const metadata: Metadata = {
  title: "Delirium Silence",
  description: "Fine dining restaurant in Belgrade. Reservations Thursday through Saturday.",
  icons: { icon: "/logo-2.jpeg", apple: "/logo-2.jpeg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Apply font CSS variables to <html> so they're available site-wide
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${raleway.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
