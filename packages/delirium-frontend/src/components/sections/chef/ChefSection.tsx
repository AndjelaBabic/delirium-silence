import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import image from "../../../assets/vladimir.jpg";
import { useLanguage } from "../../../context/LanguageContext";

export const ChefSection = () => {
  const { t } = useLanguage();
  const c = t.chef;

  return (
    <Box
      id="chef"
      sx={{ backgroundColor: "var(--ds-light)", color: "#1a1a1a", py: { xs: 10, md: 18 }, overflow: "hidden" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 12 }} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: -12, md: -20 },
                  right: { xs: -12, md: -20 },
                  left: { xs: 12, md: 20 },
                  bottom: { xs: 12, md: 20 },
                  border: "1px solid rgba(var(--ds-accent-rgb),0.3)",
                  borderRadius: "2px",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={image}
                alt="Chef Vladimir Kučera"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: { xs: 380, sm: 460, md: 580 },
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: "2px",
                  display: "block",
                  filter: "brightness(0.92)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: 24, md: 36 },
                  left: { xs: 24, md: 36 },
                  zIndex: 2,
                  backgroundColor: "rgba(247,245,242,0.92)",
                  backdropFilter: "blur(6px)",
                  px: 3,
                  py: 1.5,
                }}
              >
                <Typography sx={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "0.05em" }}>
                  Vladimir Kučera
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--ds-accent)", textTransform: "uppercase" }}>
                  {c.nameTag}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", mb: 3, color: "var(--ds-accent)", textTransform: "uppercase" }}>
              {c.label}
            </Typography>

            <Typography sx={{ fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.8rem" }, fontWeight: 300, lineHeight: 1.2, mb: 4, letterSpacing: "0.01em" }}>
              {c.headline1}
              <br />{c.headline2}
            </Typography>

            <Divider sx={{ borderColor: "rgba(var(--ds-accent-rgb),0.4)", mb: 4, width: 60 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 5 }}>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "#4b4b4b" }}>
                {c.p1}{" "}
                <Box component="span" sx={{ color: "#1a1a1a", fontWeight: 500 }}>{c.nomination}</Box>.
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "#4b4b4b" }}>
                {c.p2}
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "#4b4b4b" }}>
                {c.p3}
              </Typography>
            </Box>

            {/* Real quote */}
            <Box sx={{ borderLeft: "2px solid rgba(var(--ds-accent-rgb),0.5)", pl: 3, mb: 5 }}>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  color: "#3a3a3a",
                }}
              >
                "{c.quote}"
              </Typography>
              <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--ds-accent)", textTransform: "uppercase", mt: 1.5 }}>
                — Vladimir Kučera
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, pt: 4, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {c.credentials.map(({ value, label }: { value: string; label: string }) => (
                <Box key={label}>
                  <Typography sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 300, color: "var(--ds-accent)", lineHeight: 1, mb: 0.75 }}>
                    {value}
                  </Typography>
                  <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#9a9a9a", textTransform: "uppercase", lineHeight: 1.5 }}>
                    {label}
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
