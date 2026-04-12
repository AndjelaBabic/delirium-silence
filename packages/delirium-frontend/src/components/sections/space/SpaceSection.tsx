import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import spaceImage from "../../../assets/dining.jpg";
import { useLanguage } from "../../../context/LanguageContext";

export const SpaceSection = () => {
  const { t } = useLanguage();
  const s = t.space;

  return (
    <Box id="space" sx={{ backgroundColor: "var(--ds-dark)", py: { xs: 10, md: 18 }, overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 12 }} alignItems="center">

          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 12, md: 20 },
                  left: { xs: -12, md: -20 },
                  right: { xs: 12, md: 20 },
                  bottom: { xs: -12, md: -20 },
                  border: "1px solid rgba(var(--ds-accent-rgb),0.2)",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={spaceImage}
                alt="The dining space"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: { xs: 320, sm: 420, md: 580 },
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  filter: "brightness(0.75)",
                }}
              />
            </Box>
          </Grid>

          {/* Text */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", mb: 3, color: "var(--ds-accent)", textTransform: "uppercase" }}>
              {s.label}
            </Typography>

            <Typography sx={{ fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.8rem" }, fontWeight: 300, lineHeight: 1.2, mb: 4, color: "#f5f0e8" }}>
              {s.headline}
              <br />{s.headline2}
            </Typography>

            <Divider sx={{ borderColor: "rgba(var(--ds-accent-rgb),0.3)", mb: 4, width: 60 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 6 }}>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "rgba(255,255,255,0.55)" }}>
                {s.desc1}
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "rgba(255,255,255,0.55)" }}>
                {s.desc2}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 4, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {s.details.map(({ label, value }: { label: string; value: string }) => (
                <Box key={label} sx={{ display: "flex", gap: 3, alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--ds-accent)", textTransform: "uppercase", minWidth: 80, flexShrink: 0 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                    {value}
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
