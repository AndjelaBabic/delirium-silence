import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en-gb"; // week starts on Monday
import { useState } from "react";
import { useCreateReservation } from "../../../hooks/useCreateReservation";

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00"];

// Only Thursday (4), Friday (5), Saturday (6)
const shouldDisableDate = (date: Dayjs) => {
  const day = date.day(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  return day !== 4 && day !== 5 && day !== 6;
};

const tomorrow = dayjs().add(1, "day");

export const BookTable = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guests: 2,
    date: null as Dayjs | null,
    time: "",
  });

  const update = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const { mutate, isPending, isSuccess, isError, error, reset } = useCreateReservation();

  const { firstName, lastName, phone, email, guests, date, time } = form;

  const handleSubmit = () => {
    if (!firstName || !lastName || !phone || !email || !date || !time) return;

    mutate(
      { firstName, lastName, phone, email, guests, date: date.format("YYYY-MM-DD"), time },
      {
        onSuccess: () => setForm({ firstName: "", lastName: "", phone: "", email: "", guests: 2, date: null, time: "" }),
      }
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Box sx={{ py: 16, backgroundColor: "#fff" }} id="book">
        <Container maxWidth="sm">
          <Typography
            variant="overline"
            sx={{ letterSpacing: "3px", color: "#999", display: "block", textAlign: "center" }}
          >
            Reservations
          </Typography>

          <Typography variant="h3" sx={{ my: 4, fontWeight: 300, textAlign: "center" }}>
            Book a Table
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "center", color: "#888", mb: 4 }}>
            Available Thursday, Friday &amp; Saturday · 18:00 – 20:00
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => { reset(); update("firstName", e.target.value); }}
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => { reset(); update("lastName", e.target.value); }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextField
              label="Phone Number"
              type="tel"
              placeholder="+381651234567"
              value={phone}
              onChange={(e) => { reset(); update("phone", e.target.value); }}
              helperText="Include country code (e.g. +381…) — used for SMS confirmation"
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => { reset(); update("email", e.target.value); }}
              fullWidth
            />

            <TextField
              label="Number of Guests"
              type="number"
              value={guests}
              onChange={(e) => update("guests", Math.min(10, Math.max(1, Number(e.target.value))))}
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
              fullWidth
            />

            <DatePicker
              label="Date"
              value={date}
              onChange={(val) => { reset(); update("date", val); }}
              shouldDisableDate={shouldDisableDate}
              minDate={tomorrow}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: "Thursday, Friday, and Saturday only",
                },
              }}
            />

            <TextField
              select
              label="Time"
              value={time}
              onChange={(e) => { reset(); update("time", e.target.value); }}
              fullWidth
            >
              {TIMES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            {isSuccess && (
              <Alert severity="success" sx={{ mt: 1 }}>
                Reservation confirmed! A confirmation SMS has been sent to your phone.
              </Alert>
            )}

            {isError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error.message}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isPending || !firstName || !lastName || !phone || !email || !date || !time || isSuccess}
              sx={{
                mt: 2,
                py: 1.8,
                backgroundColor: "#E86A33",
                fontSize: "1rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                "&:hover": { backgroundColor: "#cf5e2d" },
                "&:disabled": { backgroundColor: "#e8a080" },
              }}
            >
              {isPending ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Confirm Reservation"}
            </Button>
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
