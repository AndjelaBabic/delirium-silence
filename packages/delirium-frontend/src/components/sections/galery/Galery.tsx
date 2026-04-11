import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// Replace these with your own images
const images = [
  "/src/assets/meal1.jpeg",
  "/src/assets/meal2.png",
  "/src/assets/meal3.png",
  "/src/assets/meal4.png",
  "/src/assets/meal5.png",
  "/src/assets/meal6.png",
  "/src/assets/meal7.png",
  "/src/assets/meal8.png",
  "/src/assets/meal9.png",
  "/src/assets/meal10.png",
  "/src/assets/meal11.png",
  "/src/assets/meal12.png",
];
export const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <Box sx={{ py: 12, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        {/* Small Section title */}
        <Typography
          variant="overline"
          sx={{
            display: "block", // ensures centering works
            textAlign: "center", // center text
            fontSize: "1.25rem", // slightly bigger than default
            letterSpacing: "4px", // elegant spacing
            color: "#999",
            mb: 6, // bigger margin bottom
            fontWeight: 500, // subtle weight to stand out
          }}
        >
          Our Cuisine
        </Typography>

        {/* Grid with equal-sized images */}
        <Grid container spacing={2}>
          {images.map((img, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                component="img"
                src={img}
                alt={`Gallery ${index + 1}`}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1", // ensures square images
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
            enableZoom={true}
          />
        )}
      </Container>
    </Box>
  );
};
