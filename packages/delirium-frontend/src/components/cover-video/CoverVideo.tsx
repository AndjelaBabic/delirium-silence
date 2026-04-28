"use client";
import { useEffect, useRef } from "react";
import { Box, Typography, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import { useLanguage } from "../../context/LanguageContext";

const VIDEO_SRC = "/delirium-cover.mp4";

const scrollLine = keyframes`
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
`;

const VideoWrapper = styled(Box)({
  width: "100%",
  height: "100dvh",
  minHeight: "480px",
  overflow: "hidden",
  position: "relative",
});

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(var(--ds-dark-rgb),0.45) 0%, rgba(var(--ds-dark-rgb),0.2) 40%, rgba(var(--ds-dark-rgb),0.35) 65%, rgba(var(--ds-dark-rgb),0.8) 100%)",
  zIndex: 1,
});

const Content = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 24px",
});

interface Props {
  onReady?: () => void;
}

export const CoverVideo = ({ onReady }: Props) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onReady) return;

    // If the video already has enough data (e.g. cached), fire immediately.
    // readyState >= 3 means HAVE_FUTURE_DATA — enough to start playback.
    if (video.readyState >= 3) {
      onReady();
      return;
    }

    // Otherwise wait for the canplay event.
    video.addEventListener("canplay", onReady, { once: true });
    return () => video.removeEventListener("canplay", onReady);
  }, [onReady]);

  const scrollToBook = () => {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNext = () => {
    document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <VideoWrapper>
      <Box
        ref={videoRef}
        component="video"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Overlay />

      <Content>
        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: { xs: "4px", md: "8px" },
            fontSize: { xs: "0.65rem", md: "0.75rem" },
            mb: 4,
          }}
        >
          {t.cover.location}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: 300,
            fontSize: { xs: "2.8rem", sm: "4rem", md: "6rem" },
            lineHeight: 1.05,
            letterSpacing: { xs: "2px", md: "4px" },
            textTransform: "uppercase",
          }}
        >
          {t.cover.title1}
          <br />
          {t.cover.title2}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            fontSize: { xs: "0.75rem", md: "0.85rem" },
            letterSpacing: { xs: "3px", md: "5px" },
            textTransform: "uppercase",
            mt: { xs: 3, md: 4 },
            mb: { xs: 5, md: 6 },
          }}
        >
          {t.cover.subtitle}
        </Typography>

        <Box
          onClick={scrollToBook}
          sx={{
            px: { xs: 5, md: 7 },
            py: { xs: 1.6, md: 2 },
            backgroundColor: "var(--ds-accent)",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "var(--ds-accent-dark)" },
          }}
        >
          <Typography sx={{
            fontSize: { xs: "0.6rem", md: "0.65rem" },
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#fff",
            fontWeight: 500,
          }}>
            {t.cover.cta}
          </Typography>
        </Box>
      </Content>

      <Box
        sx={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
          px: { xs: 3, md: 8 }, py: { xs: 2.5, md: 3 },
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}>
          Thu — Sat · 18:00–20:00
        </Typography>

        <Box
          onClick={scrollToNext}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", opacity: 0.45, "&:hover": { opacity: 0.75 }, transition: "opacity 0.3s" }}
        >
          <Box sx={{ width: "1px", height: 36, backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden", position: "relative" }}>
            <Box sx={{ position: "absolute", inset: 0, backgroundColor: "#fff", animation: `${scrollLine} 2s ease-in-out infinite` }} />
          </Box>
        </Box>

        <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}>
          Est. 2024 · Belgrade
        </Typography>
      </Box>
    </VideoWrapper>
  );
};
