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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://deliriumsilence.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Delirium Silence — Fine Dining Belgrade",
    template: "%s | Delirium Silence",
  },
  description:
    "Award-winning fine dining restaurant in Belgrade. Tasting menus by Chef Vladimir Kučera, JRE Chef of the Year 2026 nominee. Restaurant of the Year 2025 — Vino & Fino. Open Thursday–Saturday, 18:00–23:00.",
  keywords: [
    "fine dining Belgrade",
    "Belgrade restaurant",
    "tasting menu Belgrade",
    "Delirium Silence",
    "Vladimir Kučera",
    "JRE Chef",
    "molecular gastronomy Belgrade",
    "restaurant Belgrade",
    "best restaurant Belgrade",
    "Dositejeva",
  ],
  authors: [{ name: "Delirium Silence" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Delirium Silence",
    title: "Delirium Silence — Fine Dining Belgrade",
    description:
      "Award-winning fine dining in Belgrade. Tasting menus by Chef Vladimir Kučera. Restaurant of the Year 2025 — Vino & Fino.",
    url: SITE_URL,
    images: [
      {
        url: "/logo-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Delirium Silence — Fine Dining Restaurant, Belgrade",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delirium Silence — Fine Dining Belgrade",
    description:
      "Award-winning fine dining in Belgrade. Tasting menus by Chef Vladimir Kučera.",
    images: ["/logo-2.jpeg"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Delirium Silence",
              description:
                "Award-winning fine dining restaurant in Belgrade. Tasting menus by Chef Vladimir Kučera, JRE Chef of the Year 2026 nominee.",
              url: SITE_URL,
              telephone: "+381658016196",
              email: "deliriumsilence.reservations@gmail.com",
              image: `${SITE_URL}/logo-2.jpeg`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dositejeva 10, Apt. 6",
                addressLocality: "Belgrade",
                addressCountry: "RS",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Thursday", "Friday", "Saturday"],
                  opens: "18:00",
                  closes: "23:00",
                },
              ],
              servesCuisine: ["Fine Dining", "Modern European", "Molecular Gastronomy"],
              priceRange: "$$$$",
              sameAs: [
                "https://www.instagram.com/delirium.silence/",
                "https://jre.eu/en/restaurants/deliriumsilence",
              ],
              award: [
                "Restaurant of the Year 2025 — Vino & Fino",
                "JRE Chef of the Year 2026 Nominee",
              ],
              hasMenu: {
                "@type": "Menu",
                name: "Tasting Menus",
                hasMenuSection: {
                  "@type": "MenuSection",
                  name: "Set Menus",
                  hasMenuItem: [
                    {
                      "@type": "MenuItem",
                      name: "Delirium Madness Experience",
                      description:
                        "Our most immersive journey — a full exploration of the kitchen's philosophy from first bite to last.",
                      offers: { "@type": "Offer", price: "14000", priceCurrency: "RSD" },
                    },
                    {
                      "@type": "MenuItem",
                      name: "Delirium Experience",
                      description:
                        "The essential Delirium Silence narrative, distilled into six precise and emotive courses.",
                      offers: { "@type": "Offer", price: "12000", priceCurrency: "RSD" },
                    },
                    {
                      "@type": "MenuItem",
                      name: "Delirium Vegetarian Experience",
                      description:
                        "A plant-forward tasting menu that proves vegetables can be the most complex ingredient on the table.",
                      offers: { "@type": "Offer", price: "9000", priceCurrency: "RSD" },
                    },
                    {
                      "@type": "MenuItem",
                      name: "Delirium Pescatarian Experience",
                      description:
                        "The vegetarian experience enriched with the finest seasonal fish from Adriatic waters.",
                      offers: { "@type": "Offer", price: "11000", priceCurrency: "RSD" },
                    },
                    {
                      "@type": "MenuItem",
                      name: "Delirium Snack",
                      description:
                        "A shorter, sharper cut of the Delirium experience — ideal for those short on time, never on taste.",
                      offers: { "@type": "Offer", price: "6000", priceCurrency: "RSD" },
                    },
                  ],
                },
              },
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
