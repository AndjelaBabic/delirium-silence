import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import chefImage from "../../../assets/chef2.png";
import { useSection } from "@/hooks/useSection";
import { translations } from "@/i18n/translations";

const JRE_URL = "https://jre.eu/en/restaurants/deliriumsilence";
const VINO_URL =
  "https://www.vinoifino.rs/novosti/novost_delirium_silence_je_restoran_godine_u_srbiji_vinski_magazin_vino_i_fino_3487";

const AwardLink = ({ href, label }: { href: string; label: string }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 1.5,
      textDecoration: "none",
      color: "var(--ds-accent)",
      fontSize: "0.65rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      borderBottom: "1px solid rgba(var(--ds-accent-rgb),0.3)",
      pb: 0.5,
      transition: "all 0.3s ease",
      "&:hover": { borderBottomColor: "var(--ds-accent)", opacity: 0.8 },
    }}
  >
    {label}
    <Typography component="span" sx={{ fontSize: "0.7rem", lineHeight: 1 }}>↗</Typography>
  </Box>
);

const awardBoxSx = {
  height: "100%",
  border: "1px solid rgba(var(--ds-accent-rgb),0.25)",
  p: { xs: 4, md: 6 },
  position: "relative" as const,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(var(--ds-accent-rgb),0.6), transparent)",
  },
};

export const PressRecognition = () => {
  const p = useSection<typeof translations.en.press>("press");

  return (
    <Box component="section" aria-label="Press & Recognition" id="press" sx={{ backgroundColor: "var(--ds-dark)", py: { xs: 10, md: 18 }, overflow: "hidden" }}>
      <Container maxWidth="lg">

        {/* Section header + chef image */}
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
              {p.label}
            </Typography>
            <Typography component="h2" sx={{ fontSize: { xs: "2rem", sm: "2.4rem", md: "3rem" }, fontWeight: 300, color: "#f5f0e8", lineHeight: 1.2 }}>
              {p.headline}
            </Typography>
            <Typography aria-hidden="true" sx={{ fontSize: { xs: "2rem", sm: "2.4rem", md: "3rem" }, fontWeight: 300, color: "#f5f0e8", lineHeight: 1.2, mb: 4 }}>
              {p.headline2}
            </Typography>
            <Divider sx={{ borderColor: "rgba(var(--ds-accent-rgb),0.3)", width: 60 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, var(--ds-dark) 0%, transparent 50%)",
                  pointerEvents: "none",
                },
              }}
            >
              <Box
                component="img"
                src={chefImage}
                alt="Chef Vladimir Kučera"
                sx={{
                  width: "100%",
                  height: { xs: 280, md: 340 },
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "brightness(0.8) grayscale(0.2)",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Two award features */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 8, md: 12 } }}>

          {/* Vino & Fino — Restaurant of the Year 2025 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={awardBoxSx}>
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 3, mb: 4, flexWrap: "wrap" }}>
                <Box>
                  <Typography sx={{ fontSize: "0.55rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 1.5 }}>
                    {p.vinoMagazine}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: { xs: "4rem", md: "5.5rem" },
                      fontWeight: 400,
                      color: "var(--ds-accent)",
                      lineHeight: 1,
                      opacity: 0.9,
                      mb: 0.5,
                    }}
                  >
                    {p.vinoYear}
                  </Typography>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                      fontWeight: 500,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#f5f0e8",
                      lineHeight: 1.4,
                    }}
                  >
                    {p.vinoLabel}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48, height: 48,
                    border: "1px solid rgba(var(--ds-accent-rgb),0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ fontSize: "1.4rem", lineHeight: 1 }}>🏆</Typography>
                </Box>
              </Box>
              <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.06)", pt: 4 }}>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontStyle: "italic",
                    lineHeight: 1.9, textAlign: "justify",
                    color: "rgba(255,255,255,0.6)",
                    mb: 4,
                  }}
                >
                  "{p.vinoDesc}"
                </Typography>
                <AwardLink href={VINO_URL} label={p.vinoLink} />
              </Box>
            </Box>
          </Grid>

          {/* JRE — Chef of the Year nomination */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={awardBoxSx}>
              <Typography sx={{ fontSize: "0.55rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 1.5 }}>
                JRE — Jeunes Restaurateurs
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "4rem", md: "5.5rem" },
                  fontWeight: 400,
                  color: "var(--ds-accent)",
                  lineHeight: 1,
                  opacity: 0.9,
                  mb: 0.5,
                }}
              >
                {p.jreYear}
              </Typography>
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#f5f0e8",
                  lineHeight: 1.4,
                  mb: 4,
                }}
              >
                {p.jreLabel}
              </Typography>
              <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.06)", pt: 4 }}>
                <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.9, textAlign: "justify", color: "rgba(255,255,255,0.5)", mb: 4 }}>
                  {p.jreDesc}
                </Typography>
                <AwardLink href={JRE_URL} label={p.jreLink} />
              </Box>
            </Box>
          </Grid>

        </Grid>

        {/* Press quotes */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {p.quotes.map((quote: { text: string; source: string }, i: number) => (
            <Grid key={i} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  p: { xs: 4, md: 5 },
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s ease",
                  "&:hover": { borderColor: "rgba(var(--ds-accent-rgb),0.2)" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "3rem",
                    color: "rgba(var(--ds-accent-rgb),0.25)",
                    lineHeight: 0.8,
                    mb: 2,
                    display: "block",
                  }}
                >
                  "
                </Typography>
                <Typography component="blockquote" sx={{ fontSize: "0.85rem", lineHeight: 1.9, textAlign: "justify", color: "rgba(255,255,255,0.55)", mb: 4, fontStyle: "italic", m: 0 }}>
                  {quote.text}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: 24, height: "1px", backgroundColor: "rgba(var(--ds-accent-rgb),0.4)" }} />
                  <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--ds-accent)", textTransform: "uppercase" }}>
                    {quote.source}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};
