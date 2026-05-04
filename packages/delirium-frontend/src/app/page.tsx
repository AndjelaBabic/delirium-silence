/**
 * NEXT.JS CONCEPT: page.tsx
 *
 * This file represents the "/" route. In the old setup, routing was configured
 * explicitly in App.tsx with <Route path="/" element={<Home />} />.
 *
 * In Next.js you just create a file — the folder structure IS the router:
 *   src/app/page.tsx          →  /
 *   src/app/about/page.tsx    →  /about
 *   src/app/menu/page.tsx     →  /menu
 *
 * This is a Server Component (no "use client"). It renders on the server
 * and sends HTML to the browser. <Home> is a Client Component and takes
 * over from there once the page loads.
 */

import { Home } from "@/components/home/Home";

export default function Page() {
  return <Home />;
}
