import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Raleway', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: { fontFamily: "'Playfair Display', serif", fontWeight: 400 },
    h2: { fontFamily: "'Playfair Display', serif", fontWeight: 400 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 400 },
    h4: { fontFamily: "'Playfair Display', serif", fontWeight: 400 },
    h5: { fontFamily: "'Playfair Display', serif", fontWeight: 400 },
    h6: { fontFamily: "'Playfair Display', serif", fontWeight: 400 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 300,
        },
      },
    },
  },
});

export default theme;
