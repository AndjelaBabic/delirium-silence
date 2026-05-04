"use client";

import { useScrollTrigger } from "@mui/material";
import { Box } from "@mui/material";

export const ReserveButton = () => {
  const visible = useScrollTrigger({ disableHysteresis: true, threshold: 200 });

  const scrollToBook = () => {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      onClick={scrollToBook}
      role="button"
      aria-label="Reserve a table"
      sx={{
        position: "fixed",
        bottom: { xs: 24, md: 32 },
        right: { xs: 20, md: 32 },
        zIndex: 1000,
        px: 2.5,
        py: 1,
        borderRadius: "999px",
        border: "1px solid rgba(var(--ds-accent-rgb), 0.6)",
        backgroundColor: "rgba(28, 25, 23, 0.72)",
        backdropFilter: "blur(10px)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, background-color 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
        "&:hover": {
          borderColor: "var(--ds-accent)",
          backgroundColor: "rgba(28, 25, 23, 0.9)",
        },
      }}
    >
      <Box
        sx={{
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(var(--ds-accent-rgb), 0.9)",
          fontWeight: 400,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-raleway), sans-serif",
        }}
      >
        Reserve
      </Box>
    </Box>
  );
};
