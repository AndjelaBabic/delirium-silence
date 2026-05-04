import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Header = () => {
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 60 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.philosophy, href: "#philosophy" },
    { label: t.nav.chef, href: "#chef" },
    { label: t.nav.story, href: "#story" },
    { label: t.nav.experiences, href: "#menu" },
    { label: t.nav.wine, href: "#wine" },
    { label: t.nav.cuisine, href: "#gallery" },
    { label: t.nav.press, href: "#press" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transition: "background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
          backgroundColor: scrolled ? "rgba(247,245,242,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          px: { xs: 2, md: 6 },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: { xs: 64, md: 72 } }}>

          {/* Logo */}
          <Typography
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              fontSize: { xs: "0.75rem", md: "0.8rem" },
              letterSpacing: { xs: "4px", md: "6px" },
              fontWeight: 500,
              textTransform: "uppercase",
              color: scrolled ? "#1a1a1a" : "#fff",
              cursor: "pointer",
              transition: "color 0.4s ease",
              userSelect: "none",
            }}
          >
            Delirium Silence
          </Typography>

          {/* Desktop nav */}
          <Box component="nav" aria-label="Main navigation" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 5 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Box
                key={href}
                component="a"
                href={href}
                sx={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: scrolled ? "#4a4a4a" : "rgba(255,255,255,0.85)",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  textDecoration: "none",
                  "&:hover": { color: scrolled ? "#1a1a1a" : "#fff" },
                  userSelect: "none",
                }}
              >
                {label}
              </Box>
            ))}

            {/* Reserve CTA */}
            <Box
              onClick={() => scrollTo("#book")}
              sx={{
                ml: 2,
                px: 3.5,
                py: 1.2,
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                userSelect: "none",
                backgroundColor: scrolled ? "var(--ds-accent)" : "rgba(var(--ds-accent-rgb),0.85)",
                color: "#fff",
                border: "1px solid transparent",
                "&:hover": {
                  backgroundColor: scrolled ? "var(--ds-accent-dark)" : "rgba(var(--ds-accent-rgb),1)",
                },
              }}
            >
              {t.nav.reserve}
            </Box>

            {/* Language switcher */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
              {(["en", "sr"] as const).map((lang, i) => (
                <Box key={lang} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    onClick={() => setLanguage(lang)}
                    sx={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      color: language === lang
                        ? (scrolled ? "#1a1a1a" : "#fff")
                        : (scrolled ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.35)"),
                      fontWeight: language === lang ? 500 : 300,
                      transition: "color 0.3s ease",
                      userSelect: "none",
                    }}
                  >
                    {lang.toUpperCase()}
                  </Typography>
                  {i === 0 && (
                    <Typography sx={{ fontSize: "0.55rem", color: scrolled ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)" }}>
                      /
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: scrolled ? "#1a1a1a" : "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, backgroundColor: "var(--ds-dark)", px: 3, py: 4 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {(["en", "sr"] as const).map((lang) => (
              <Typography
                key={lang}
                onClick={() => setLanguage(lang)}
                sx={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  color: language === lang ? "var(--ds-accent)" : "rgba(255,255,255,0.3)",
                  fontWeight: language === lang ? 500 : 300,
                  userSelect: "none",
                }}
              >
                {lang.toUpperCase()}
              </Typography>
            ))}
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 4, px: 2 }}>
          Delirium Silence
        </Typography>

        <List disablePadding>
          {NAV_LINKS.map(({ label, href }) => (
            <ListItemButton
              key={href}
              onClick={() => { scrollTo(href); setDrawerOpen(false); }}
              sx={{ py: 1.5, px: 2 }}
            >
              <ListItemText
                primary={label}
                slotProps={{
                  primary: {
                    sx: { fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8e8e8", fontWeight: 300 },
                  },
                }}
              />
            </ListItemButton>
          ))}

          <ListItemButton
            onClick={() => { scrollTo("#book"); setDrawerOpen(false); }}
            sx={{ mt: 3, py: 1.5, px: 2, backgroundColor: "var(--ds-accent)", "&:hover": { backgroundColor: "var(--ds-accent-dark)" } }}
          >
            <ListItemText
              primary={t.nav.reserve}
              slotProps={{
                primary: {
                  sx: { fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", fontWeight: 500 },
                },
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};
