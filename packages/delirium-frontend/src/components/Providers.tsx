"use client";

/**
 * NEXT.JS CONCEPT: Client Component boundary for providers
 *
 * layout.tsx is a Server Component. But our providers (MUI ThemeProvider,
 * React Query, LanguageProvider) use React context, which only works in
 * Client Components.
 *
 * The pattern: create a single "Providers" Client Component that wraps
 * everything, and import it from the Server Component layout.
 *
 * "use client" at the top means: this file and everything it imports
 * runs in the browser. The boundary stops here — layout.tsx stays server-side.
 */

import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/context/LanguageContext";
import { MuiRegistry } from "@/components/MuiRegistry";
import theme from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  // QueryClient is created inside useState so each browser session
  // gets its own instance (important for correctness).
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MuiRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MuiRegistry>
  );
}
