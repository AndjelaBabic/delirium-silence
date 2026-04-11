import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";

export const Header = () => {
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
  });

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 2 : 0}
      sx={{
        px: 4,
        py: 1,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? "#ffffff" : "transparent",
        color: scrolled ? "#111" : "#fff",
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            letterSpacing: "4px",
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}
        >
          DELIRIUM SILENCE
        </Typography>

        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Button
            sx={{
              color: scrolled ? "#111" : "#fff",
              fontWeight: 400,
            }}
          >
            Our Story
          </Button>

          <Button
            sx={{
              color: scrolled ? "#111" : "#fff",
              fontWeight: 400,
            }}
          >
            Menu
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E86A33",
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: "30px",
              boxShadow: scrolled ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
              "&:hover": {
                backgroundColor: "#cf5e2d",
              },
            }}
          >
            Book a Table
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
