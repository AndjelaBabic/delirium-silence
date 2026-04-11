import { Box, Container, Grid, Typography } from "@mui/material";
import OurStoryImage from "../../../assets/story.png";

export const OurStory = () => {
  return (
    <Box sx={{ py: 16, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Slika */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={OurStoryImage}
              alt="Our Story"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>

          {/* Tekst */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Caption / Overline */}
            <Typography
              variant="overline"
              sx={{ letterSpacing: "3px", color: "#999", mb: 1 }}
            >
              Our Story
            </Typography>

            <Typography variant="h4" sx={{ mb: 4, fontWeight: 300 }}>
              A Culinary Journey Like No Other
            </Typography>

            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "#555",
                mb: 3,
              }}
            >
              Embark on a culinary journey like no other at Delirium Silence.
              Since our establishment, we have been dedicated to offering a
              unique and unforgettable dining experience. Our dishes are crafted
              with precision and creativity, ensuring each bite is a delight for
              your senses.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
