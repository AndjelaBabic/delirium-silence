import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { useSection } from "@/hooks/useSection";
import { translations } from "@/i18n/translations";

export const WineSection = () => {
  const w = useSection<typeof translations.en.wine>("wine");

  return (
    <Box component="section" aria-label="Wine & Pairings" id="wine" sx={{ backgroundColor: "var(--ds-warm)", py: { xs: 10, md: 18 }, overflow: "hidden" }}>
      <Container maxWidth="lg">

        <Grid container spacing={{ xs: 0, md: 12 }} alignItems="stretch">

          {/* Left — label + headline + sommelier */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: "100%",
                borderRight: { md: "1px solid rgba(0,0,0,0.07)" },
                pr: { md: 8 },
                pb: { xs: 8, md: 0 },
                mb: { xs: 6, md: 0 },
                borderBottom: { xs: "1px solid rgba(0,0,0,0.07)", md: "none" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
                {w.label}
              </Typography>

              <Typography component="h2" sx={{ fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" }, fontWeight: 300, color: "#1a1a1a", lineHeight: 1.2, mb: 1 }}>
                {w.headline}
              </Typography>
              <Typography aria-hidden="true" sx={{ fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" }, fontWeight: 300, color: "#1a1a1a", lineHeight: 1.2, mb: 5 }}>
                {w.headline2}
              </Typography>

              <Divider sx={{ borderColor: "rgba(var(--ds-accent-rgb),0.4)", width: 60, mb: 5 }} />
            </Box>
          </Grid>

          {/* Right — description + pillars + pairing note */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ pl: { md: 4 }, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>

              <Typography sx={{ fontSize: "0.9rem", lineHeight: 2, textAlign: "justify", color: "#666", mb: 7 }}>
                {w.desc}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {w.pillars.map(({ label, text }: { label: string; text: string }, i: number, arr: readonly { label: string; text: string }[]) => (
                  <Box
                    key={label}
                    sx={{
                      py: 3.5,
                      borderTop: "1px solid rgba(0,0,0,0.07)",
                      borderBottom: i === arr.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                      display: "flex",
                      gap: 4,
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--ds-accent)", textTransform: "uppercase", minWidth: 60, pt: 0.3, flexShrink: 0 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", color: "#777", lineHeight: 1.8 }}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 5,
                  p: 3,
                  border: "1px solid rgba(var(--ds-accent-rgb),0.25)",
                  backgroundColor: "rgba(var(--ds-accent-rgb),0.05)",
                }}
              >
                <Typography sx={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.8, fontStyle: "italic" }}>
                  {w.pairingNote}
                </Typography>
              </Box>

            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
