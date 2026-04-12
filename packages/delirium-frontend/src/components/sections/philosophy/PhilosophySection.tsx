import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import image from "../../../assets/philosophy.png";
import { useLanguage } from "../../../context/LanguageContext";

export const PhilosophySection = () => {
  const { t } = useLanguage();
  const p = t.philosophy;

  return (
    <Box
      sx={{
        backgroundColor: "var(--ds-dark)",
        color: "#e8e8e8",
        py: { xs: 10, md: 18 },
        overflow: "hidden",
      }}
      id="philosophy"
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 12 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 12, md: 20 },
                  left: { xs: 12, md: 20 },
                  right: { xs: -12, md: -20 },
                  bottom: { xs: -12, md: -20 },
                  border: "1px solid rgba(var(--ds-accent-rgb),0.25)",
                  borderRadius: "2px",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={image}
                alt="Our philosophy"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: { xs: 320, sm: 420, md: 560 },
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "2px",
                  display: "block",
                  filter: "brightness(0.88)",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", mb: 3, color: "var(--ds-accent)", textTransform: "uppercase" }}>
              {p.label}
            </Typography>

            <Typography sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" }, fontWeight: 300, lineHeight: 1.35, mb: 4, letterSpacing: "0.01em" }}>
              {p.headline1}
              <br />{p.headline2}
              <br />{p.headline3}
            </Typography>

            <Divider sx={{ borderColor: "rgba(var(--ds-accent-rgb),0.3)", mb: 4, width: 60 }} />

            <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.95, color: "#a8a8a8", mb: 6 }}>
              {p.body}
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: { xs: 3, sm: 4 } }}>
              {p.pillars.map(({ label, text }: { label: string; text: string }) => (
                <Box key={label}>
                  <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 1 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "#787878", lineHeight: 1.7 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
