import { Box, Container, Grid, Typography } from "@mui/material";
import image from "../../../assets/vladimir.jpg";

export const ChefSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f7f5f2",
        color: "#1a1a1a",
        py: { xs: 10, md: 16 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* TEXT SIDE */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                letterSpacing: "0.35em",
                mb: 3,
                color: "#c9a96a",
              }}
            >
              THE CHEF
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.9rem", md: "2.6rem" },
                fontWeight: 300,
                lineHeight: 1.4,
                mb: 4,
              }}
            >
              Culinary Visionary
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#4b4b4b",
                maxWidth: "520px",
              }}
            >
              Vladimir Kučera, chef and owner of Belgrade’s Delirium Silence,
              has been nominated for <strong>JRE Chef of the Year 2026</strong>.
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#4b4b4b",
                maxWidth: "520px",
              }}
            >
              Celebrated for his creative, precise, and complex culinary style,
              he applies molecular techniques not for show, but to enhance
              flavors, rethink traditional forms, and elevate the sensory dining
              experience.
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#4b4b4b",
                maxWidth: "520px",
              }}
            >
              His kitchen is a space of thoughtful experimentation, where
              culinary tradition is respected and reimagined for the modern
              palate.
            </Typography>
          </Grid>

          {/* IMAGE SIDE */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 380, md: 520 },
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "4px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
