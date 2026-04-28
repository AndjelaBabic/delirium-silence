import { createTheme } from "@mui/material/styles";

/**
 * Font families now use CSS variables set by next/font in layout.tsx.
 * next/font downloads fonts at build time and sets:
 *   --font-raleway    (on the <html> element)
 *   --font-playfair   (on the <html> element)
 *
 * MUI emits these as CSS strings, the browser resolves the var() at render time.
 */
const theme = createTheme({
  typography: {
    fontFamily: "var(--font-raleway), sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: { fontFamily: "var(--font-playfair), serif", fontWeight: 400 },
    h2: { fontFamily: "var(--font-playfair), serif", fontWeight: 400 },
    h3: { fontFamily: "var(--font-playfair), serif", fontWeight: 400 },
    h4: { fontFamily: "var(--font-playfair), serif", fontWeight: 400 },
    h5: { fontFamily: "var(--font-playfair), serif", fontWeight: 400 },
    h6: { fontFamily: "var(--font-playfair), serif", fontWeight: 400 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "var(--font-raleway), sans-serif",
          fontWeight: 300,
        },
      },
    },
  },
});

export default theme;
