import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Container, Divider, Grid, Link, Typography } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Footer = () => {
  const { t } = useLanguage();
  const f = t.footer;
  const nav = t.nav;

  const NAV = [
    { label: nav.philosophy, href: "#philosophy" },
    { label: nav.chef, href: "#chef" },
    { label: nav.story, href: "#story" },
    { label: nav.experiences, href: "#menu" },
    { label: nav.wine, href: "#wine" },
    { label: nav.cuisine, href: "#gallery" },
    { label: nav.press, href: "#press" },
    { label: nav.reserve, href: "#book" },
  ];

  return (
    <Box component="footer" sx={{ backgroundColor: "var(--ds-dark)", color: "#e8e8e8", pt: { xs: 10, md: 14 }, pb: { xs: 5, md: 6 } }}>
      <Container maxWidth="lg">

        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ mb: { xs: 8, md: 12 } }}>

          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={{ fontSize: "0.75rem", letterSpacing: "0.5em", fontWeight: 400, color: "#fff", textTransform: "uppercase", mb: 3 }}>
              Delirium Silence
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.9, textAlign: "justify", color: "#787878", maxWidth: 260, mb: 4 }}>
              {f.tagline}
            </Typography>
            <Link
              href="https://www.instagram.com/delirium.silence/"
              target="_blank"
              underline="none"
              sx={{
                display: "inline-flex", alignItems: "center", gap: 1.5,
                color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.2em",
                textTransform: "uppercase", transition: "color 0.2s", "&:hover": { color: "#fff" },
              }}
            >
              <InstagramIcon sx={{ fontSize: 16 }} />
              {f.instagram}
            </Link>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
              {f.nav}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {NAV.map(({ label, href }) => (
                <Typography
                  key={href}
                  onClick={() => scrollTo(href)}
                  sx={{ fontSize: "0.8rem", color: "#787878", cursor: "pointer", letterSpacing: "0.05em", transition: "color 0.2s", "&:hover": { color: "#e8e8e8" } }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Hours */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
              {f.hours}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {f.days.map(({ day, time }: { day: string; time: string }) => (
                <Box key={day}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#e8e8e8", mb: 0.25 }}>{day}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#555" }}>{time}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
              {f.contact}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Typography sx={{ fontSize: "0.65rem", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", mb: 0.5 }}>{f.phone}</Typography>
                <Link href="tel:+381658016196" underline="none" sx={{ fontSize: "0.85rem", color: "#e8e8e8", "&:hover": { color: "var(--ds-accent)" }, transition: "color 0.2s" }}>
                  +381 65 801 6196
                </Link>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.65rem", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", mb: 0.5 }}>{f.email}</Typography>
                <Link href="mailto:deliriumsilence.reservations@gmail.com" underline="none" sx={{ fontSize: "0.85rem", color: "#e8e8e8", "&:hover": { color: "var(--ds-accent)" }, transition: "color 0.2s", wordBreak: "break-all" }}>
                  deliriumsilence.reservations@gmail.com
                </Link>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.65rem", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", mb: 0.5 }}>{f.address}</Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "#e8e8e8", lineHeight: 1.7 }}>
                  {f.addressLine1}<br />{f.addressLine2}
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
          <Typography sx={{ fontSize: "0.65rem", color: "#3a3a3a", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} Delirium Silence. {f.rights}
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#3a3a3a", textTransform: "uppercase" }}>
            {f.recommended}
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};
