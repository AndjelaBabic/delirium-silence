import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const expandWidth = keyframes`
  0%   { width: 0; }
  100% { width: 100%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

interface Props {
  exiting: boolean;
}

export const LoadingScreen = ({ exiting }: Props) => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--ds-dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: exiting
          ? `${fadeOut} 0.8s ease forwards`
          : `${fadeIn} 0.4s ease forwards`,
      }}
    >
      {/* Restaurant name */}
      <Typography
        sx={{
          fontSize: { xs: "0.65rem", md: "0.75rem" },
          letterSpacing: { xs: "0.5em", md: "0.7em" },
          color: "rgba(255,255,255,0.9)",
          textTransform: "uppercase",
          fontWeight: 300,
          mb: 5,
        }}
      >
        Delirium Silence
      </Typography>

      {/* Progress bar container */}
      <Box
        sx={{
          width: { xs: 120, md: 160 },
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            backgroundColor: "var(--ds-accent)",
            animation: `${expandWidth} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          }}
        />
      </Box>

      {/* Tagline */}
      <Typography
        sx={{
          fontSize: "0.55rem",
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
          fontWeight: 300,
          mt: 4,
          animation: `${fadeIn} 1s ease 0.6s both`,
        }}
      >
        Belgrade · Fine Dining
      </Typography>
    </Box>
  );
};
