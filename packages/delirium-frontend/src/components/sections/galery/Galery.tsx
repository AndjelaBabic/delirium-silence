import { Box, Container, Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

import meal1 from "../../../assets/meal1.jpeg";
import meal2 from "../../../assets/meal2.png";
import meal3 from "../../../assets/meal3.png";
import meal4 from "../../../assets/meal4.png";
import meal5 from "../../../assets/meal5.png";
import meal6 from "../../../assets/meal6.png";
import meal7 from "../../../assets/meal7.png";
import meal8 from "../../../assets/meal8.png";
import meal9 from "../../../assets/meal9.png";
import meal10 from "../../../assets/meal10.png";
import meal11 from "../../../assets/meal11.png";
import meal12 from "../../../assets/meal12.png";

const images = [meal1, meal2, meal3, meal4, meal5, meal6, meal7, meal8, meal9, meal10, meal11, meal12];

export const Gallery = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const prev = () => setIndex((i) => (i! + images.length - 1) % images.length);
  const next = () => setIndex((i) => (i! + 1) % images.length);
  const close = () => setIndex(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  return (
    <Box component="section" aria-label="Gallery" id="gallery" sx={{ py: { xs: 10, md: 16 }, backgroundColor: "var(--ds-light)" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
            {t.gallery.label}
          </Typography>
          <Typography component="h2" sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, fontWeight: 300, lineHeight: 1.2, color: "#1a1a1a" }}>
            {t.gallery.headline}
          </Typography>
        </Box>

        <Grid container spacing={1.5}>
          {images.map((img, i) => (
            <Grid key={i} size={{ xs: 6, sm: 4, md: i === 0 || i === 3 || i === 7 ? 8 : 4 }}>
              <Box
                onClick={() => setIndex(i)}
                sx={{
                  width: "100%",
                  aspectRatio: i === 0 || i === 3 || i === 7 ? "2 / 1" : "1 / 1",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  "&:hover .overlay": { opacity: 1 },
                  "&:hover img": { transform: "scale(1.05)" },
                }}
              >
                <Box component="img" src={img} alt={(t.gallery as { imageAlts?: string[] }).imageAlts?.[i] ?? `Delirium Silence dish ${i + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} />
                <Box className="overlay" sx={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.25)", opacity: 0, transition: "opacity 0.3s ease" }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal open={isOpen} onClose={close} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box
          sx={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "rgba(var(--ds-dark-rgb),0.97)", display: "flex", alignItems: "center", justifyContent: "center", outline: "none" }}
          onClick={close}
        >
          {isOpen && (
            <Box component="img" src={images[index!]} alt={(t.gallery as { imageAlts?: string[] }).imageAlts?.[index!] ?? `Delirium Silence dish ${index! + 1}`} onClick={(e) => e.stopPropagation()}
              sx={{ maxWidth: { xs: "90vw", md: "75vw" }, maxHeight: "80vh", objectFit: "contain", display: "block", userSelect: "none" }}
            />
          )}
          <IconButton onClick={close} sx={{ position: "absolute", top: 20, right: 20, color: "#fff", backgroundColor: "rgba(255,255,255,0.1)", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); prev(); }} sx={{ position: "absolute", left: { xs: 8, md: 24 }, color: "#fff", backgroundColor: "rgba(255,255,255,0.1)", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); next(); }} sx={{ position: "absolute", right: { xs: 8, md: 24 }, color: "#fff", backgroundColor: "rgba(255,255,255,0.1)", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}>
            <ArrowForwardIosIcon />
          </IconButton>
          <Typography sx={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", letterSpacing: "0.2em" }}>
            {index! + 1} / {images.length}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
