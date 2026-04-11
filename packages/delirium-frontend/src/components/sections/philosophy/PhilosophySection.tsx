import { Box, Container, Grid, Typography } from "@mui/material";
import image from "../../../assets/philosophy.png";

export const PhilosophySection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0b0b0b",
        color: "#e8e8e8",
        py: { xs: 10, md: 16 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 350, md: 500 },
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "4px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
          </Grid>

          {/* Text */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                letterSpacing: "0.35em",
                mb: 3,
                color: "#c9a96a",
              }}
            >
              OUR PHILOSOPHY
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                fontWeight: 300,
                lineHeight: 1.4,
                mb: 4,
              }}
            >
              Dining is not consumption. It is presence, silence, and sensation.
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#bdbdbd",
                maxWidth: "500px",
              }}
            >
              At Delirium Silence, every course is composed like music — a
              progression of textures, temperatures, and emotion. We do not
              serve meals. We orchestrate experiences meant to be felt long
              after the final bite.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
