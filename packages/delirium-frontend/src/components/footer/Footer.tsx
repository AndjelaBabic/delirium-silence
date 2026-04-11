import InstagramIcon from "@mui/icons-material/Instagram";
import RoomIcon from "@mui/icons-material/Room";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to bottom, #0c0c0c, #000)",
        color: "#cfcfcf",
        py: { xs: 6, md: 8 }, // slightly smaller padding
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        {/* Restaurant Name */}
        <Typography
          variant="h6"
          sx={{
            letterSpacing: "0.25em",
            fontWeight: 300,
            mb: 3,
            color: "#fff",
          }}
        >
          DELIRIUM SILENCE
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />
        {/* Opening Hours */}
        <Typography sx={{ mb: 1, fontSize: "0.85rem", letterSpacing: "0.1em" }}>
          OPENING HOURS
        </Typography>
        <Typography sx={{ mb: 3, fontWeight: 300 }}>
          Thursday — Saturday
          <br />
          18:00 – 23:00
        </Typography>

        {/* Contact */}
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 300 }}>+381 65 801 6196</Typography>
          <Typography sx={{ fontWeight: 300 }}>
            deliriumsilence.reservations@gmail.com
          </Typography>
        </Stack>

        {/* Address */}
        <Typography sx={{ fontWeight: 300, mb: 3 }}>
          Dositejeva 10, Apt. 6
          <br />
          Belgrade, Serbia
        </Typography>

        {/* Social / Map Icons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          <Link
            href="https://www.instagram.com/deliriumsilence"
            target="_blank"
            color="inherit"
          >
            <IconButton sx={{ color: "#fff" }}>
              <InstagramIcon />
            </IconButton>
          </Link>
          <Link
            href="https://goo.gl/maps/YourMapLink"
            target="_blank"
            color="inherit"
          >
            <IconButton sx={{ color: "#fff" }}>
              <RoomIcon />
            </IconButton>
          </Link>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

        {/* Fine dining note */}
        <Typography
          sx={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            opacity: 0.6,
          }}
        >
          RESERVATIONS RECOMMENDED
        </Typography>
      </Container>
    </Box>
  );
};
