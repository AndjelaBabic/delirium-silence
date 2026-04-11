import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const TIMES = [
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
];

export const BookTable = () => {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const reservation = {
      guests,
      date,
      time,
      email,
    };

    console.log("Reservation:", reservation);
    // kasnije: API / EmailJS
  };

  return (
    <Box sx={{ py: 16, backgroundColor: "#fff" }} id="book">
      <Container maxWidth="sm">
        <Typography
          variant="overline"
          sx={{ letterSpacing: "3px", color: "#999" }}
        >
          Reservations
        </Typography>

        <Typography
          variant="h3"
          sx={{ my: 4, fontWeight: 300, textAlign: "center" }}
        >
          Book a Table
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mt: 6,
          }}
        >
          <TextField
            label="Number of Guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            inputProps={{ min: 1, max: 10 }}
            fullWidth
          />

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            select
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
          >
            {TIMES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 4,
              py: 1.8,
              backgroundColor: "#E86A33",
              fontSize: "1rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: "#cf5e2d",
              },
            }}
          >
            Confirm Reservation
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
