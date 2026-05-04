import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import OurStoryImage from "../../../assets/story.png";
import { useLanguage } from "../../../context/LanguageContext";

export const OurStory = () => {
  const { t } = useLanguage();
  const s = t.story;

  return (
    <Box component="section" aria-label="Our Story" id="story" sx={{ py: { xs: 10, md: 18 }, backgroundColor: "#fff", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 12 }} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", mb: 3, color: "var(--ds-accent)", textTransform: "uppercase" }}>
              {s.label}
            </Typography>

            <Typography component="h2" sx={{ fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.8rem" }, fontWeight: 300, lineHeight: 1.2, mb: 4, color: "#1a1a1a", letterSpacing: "0.01em" }}>
              {s.headline1}
              <br />{s.headline2}
            </Typography>

            <Divider sx={{ borderColor: "rgba(var(--ds-accent-rgb),0.4)", mb: 4, width: 60 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 6 }}>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "#555" }}>
                {s.p1}
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.9, textAlign: "justify", color: "#555" }}>
                {s.p2}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {s.milestones.map(({ year, label }: { year: string; label: string }, i: number) => (
                <Box key={year} sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 0.5 }}>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--ds-accent)", letterSpacing: "0.1em", minWidth: 36 }}>
                      {year}
                    </Typography>
                    {i < s.milestones.length - 1 && (
                      <Box sx={{ width: "1px", height: 28, backgroundColor: "rgba(var(--ds-accent-rgb),0.3)", mt: 1 }} />
                    )}
                  </Box>
                  <Typography sx={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.6, pt: 0.4 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 12, md: 20 },
                  right: { xs: -12, md: -20 },
                  left: { xs: 12, md: 20 },
                  bottom: { xs: -12, md: -20 },
                  border: "1px solid rgba(var(--ds-accent-rgb),0.25)",
                  borderRadius: "2px",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={OurStoryImage}
                alt="Our Story"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: { xs: 320, sm: 420, md: 580 },
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "2px",
                  display: "block",
                  filter: "brightness(0.93)",
                }}
              />
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
