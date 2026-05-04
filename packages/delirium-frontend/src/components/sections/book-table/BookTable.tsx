import { useSection } from "@/hooks/useSection";
import { translations } from "@/i18n/translations";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from "react";
import { useCreateReservation } from "../../../hooks/useCreateReservation";

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00"];

const shouldDisableDate = (date: Dayjs) => {
  const day = date.day();
  return day !== 4 && day !== 5 && day !== 6;
};

const tomorrow = dayjs().add(1, "day");

const fieldSx = {
  "& .MuiInput-root": {
    fontSize: "0.9rem",
    fontWeight: 300,
    color: "#1a1a1a",
    "&:before": { borderBottomColor: "rgba(0,0,0,0.15)" },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "rgba(var(--ds-accent-rgb),0.5)",
    },
    "&:after": { borderBottomColor: "var(--ds-accent)" },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--ds-accent)" },
  "& .MuiInputBase-input": {
    pb: 1,
    color: "#1a1a1a",
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #f7f5f2 inset",
      WebkitTextFillColor: "#1a1a1a",
      transition: "background-color 5000s ease-in-out 0s",
    },
  },
  "& .MuiPickersSectionList-root": {
    color: "#1a1a1a",
    fontSize: "0.9rem",
    fontWeight: 300,
  },
  "& .MuiPickersSectionList-section": { color: "#1a1a1a", fontWeight: 300 },
  "& .MuiPickersSectionList-sectionContent": {
    color: "#1a1a1a",
    fontWeight: 300,
  },
  "& .MuiFormHelperText-root": { color: "#aaa", fontSize: "0.65rem", mt: 0.5 },
  "& .MuiSvgIcon-root": { color: "#aaa", fontSize: "1.1rem" },
};

export const BookTable = () => {
  const b = useSection<typeof translations.en.book>("book");

  const [step, setStep] = useState<1 | 2>(1);
  const [dateOpen, setDateOpen] = useState(false);
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

  const { mutate, isPending, isSuccess, isError, error, reset } =
    useCreateReservation();
  const { firstName, lastName, phone, email, guests, date, time } = form;

  const step1Complete = date && time;
  const step2Complete = firstName && lastName && phone && email;

  const handleConfirm = () => {
    if (!step2Complete || !date || !time) return;
    mutate(
      {
        firstName,
        lastName,
        phone,
        email,
        guests,
        date: date.format("YYYY-MM-DD"),
        time,
      },
      { onSuccess: () => setStep(1) }
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Box
        id="book"
        sx={{
          backgroundColor: "var(--ds-light)",
          py: { xs: 10, md: 18 },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 0, md: 12 }} alignItems="stretch">
            {/* Left — info */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRight: { md: "1px solid rgba(0,0,0,0.07)" },
                  pr: { md: 6 },
                  pb: { xs: 8, md: 0 },
                  mb: { xs: 6, md: 0 },
                  borderBottom: {
                    xs: "1px solid rgba(0,0,0,0.07)",
                    md: "none",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.45em",
                    color: "var(--ds-accent)",
                    textTransform: "uppercase",
                    mb: 3,
                  }}
                >
                  {b.label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.4rem", md: "2.6rem" },
                    fontWeight: 300,
                    color: "#1a1a1a",
                    lineHeight: 1.15,
                    mb: 4,
                  }}
                >
                  {b.headline}
                </Typography>

                <Divider
                  sx={{
                    borderColor: "rgba(var(--ds-accent-rgb),0.35)",
                    width: 48,
                    mb: 4,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    lineHeight: 1.9,
                    textAlign: "justify",
                    color: "#999",
                    mb: 6,
                  }}
                >
                  {b.infoDesc1} {b.infoDesc2}
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}
                >
                  {[
                    { label: b.infoAvailable, value: b.infoAvailableValue },
                    { label: b.infoService, value: b.infoServiceValue },
                    { label: b.infoContact, value: "+381 65 801 6196" },
                  ].map(({ label, value }) => (
                    <Box key={label}>
                      <Typography
                        sx={{
                          fontSize: "0.55rem",
                          letterSpacing: "0.35em",
                          color: "var(--ds-accent)",
                          textTransform: "uppercase",
                          mb: 0.75,
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "#3a3a3a",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right — form */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ pl: { md: 6 } }}>
                {/* ── Success ── */}
                {isSuccess && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      py: { xs: 6, md: 12 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        border: "1px solid rgba(var(--ds-accent-rgb),0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.3rem",
                          color: "var(--ds-accent)",
                          lineHeight: 1,
                        }}
                      >
                        ✓
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.5em",
                        color: "var(--ds-accent)",
                        textTransform: "uppercase",
                        mb: 3,
                      }}
                    >
                      {b.successLabel}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                        fontWeight: 400,
                        color: "#1a1a1a",
                        lineHeight: 1.3,
                        mb: 3,
                      }}
                    >
                      {b.successMessage}
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: "1px",
                        backgroundColor: "rgba(var(--ds-accent-rgb),0.4)",
                        mb: 4,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: "#aaa",
                        lineHeight: 1.9,
                        textAlign: "center",
                        maxWidth: 340,
                        mb: 7,
                      }}
                    >
                      {b.successText}
                    </Typography>
                    <Box
                      onClick={() => {
                        reset();
                        setForm({
                          firstName: "",
                          lastName: "",
                          phone: "",
                          email: "",
                          guests: 2,
                          date: null,
                          time: "",
                        });
                      }}
                      sx={{
                        px: 5,
                        py: 1.5,
                        border: "1px solid rgba(0,0,0,0.13)",
                        cursor: "pointer",
                        transition: "border-color 0.3s",
                        "&:hover": { borderColor: "var(--ds-accent)" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "#aaa",
                        }}
                      >
                        {b.groupNote.includes("+")
                          ? "New Reservation"
                          : "Nova Rezervacija"}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {!isSuccess && (
                  <>
                    {/* ── Step indicator ── */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                        mb: 8,
                      }}
                    >
                      {([1, 2] as const).map((s, i) => (
                        <Box
                          key={s}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor:
                                  step >= s
                                    ? "var(--ds-accent)"
                                    : "rgba(0,0,0,0.15)",
                                transition: "background-color 0.3s",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.6rem",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: step >= s ? "#3a3a3a" : "#ccc",
                                transition: "color 0.3s",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {s === 1 ? b.step1Label : b.step2Label}
                            </Typography>
                          </Box>
                          {i === 0 && (
                            <Box
                              sx={{
                                width: { xs: 48, sm: 72, md: 96 },
                                height: "1px",
                                mx: 1.5,
                                mb: 2.5,
                                backgroundColor:
                                  step > 1
                                    ? "var(--ds-accent)"
                                    : "rgba(0,0,0,0.1)",
                                transition: "background-color 0.4s",
                              }}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>

                    {/* ── Step 1 ── */}
                    {step === 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        {/* Date */}
                        <DatePicker
                          label={b.fieldDate}
                          value={date}
                          onChange={(val) => update("date", val)}
                          shouldDisableDate={shouldDisableDate}
                          minDate={tomorrow}
                          open={dateOpen}
                          onOpen={() => setDateOpen(true)}
                          onClose={() => setDateOpen(false)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              variant: "standard",
                              helperText: b.fieldDateHelper,
                              sx: {
                                ...fieldSx,
                                cursor: "pointer",
                                "& *": { cursor: "pointer" },
                              },
                              onClick: () => setDateOpen(true),
                            },
                          }}
                        />

                        {/* Guest counter */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#666",
                              mb: 2,
                            }}
                          >
                            {b.fieldGuests}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            <Box
                              onClick={() =>
                                update("guests", Math.max(1, guests - 1))
                              }
                              sx={{
                                width: 36,
                                height: 36,
                                border: "1px solid rgba(0,0,0,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: guests > 1 ? "pointer" : "default",
                                opacity: guests > 1 ? 1 : 0.3,
                                transition: "border-color 0.2s",
                                "&:hover":
                                  guests > 1
                                    ? { borderColor: "var(--ds-accent)" }
                                    : {},
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "1rem",
                                  color: "#555",
                                  lineHeight: 1,
                                  userSelect: "none",
                                }}
                              >
                                −
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "1.4rem",
                                fontWeight: 300,
                                color: "#1a1a1a",
                                minWidth: 32,
                                textAlign: "center",
                              }}
                            >
                              {guests}
                            </Typography>
                            <Box
                              onClick={() =>
                                update("guests", Math.min(10, guests + 1))
                              }
                              sx={{
                                width: 36,
                                height: 36,
                                border: "1px solid rgba(0,0,0,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: guests < 10 ? "pointer" : "default",
                                opacity: guests < 10 ? 1 : 0.3,
                                transition: "border-color 0.2s",
                                "&:hover":
                                  guests < 10
                                    ? { borderColor: "var(--ds-accent)" }
                                    : {},
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "1rem",
                                  color: "#555",
                                  lineHeight: 1,
                                  userSelect: "none",
                                }}
                              >
                                +
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                color: "#bbb",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {guests === 1 ? "guest" : "guests"}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Time chips */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#666",
                              mb: 2,
                            }}
                          >
                            {b.fieldTime}
                          </Typography>
                          <Box
                            sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}
                          >
                            {TIMES.map((slot) => (
                              <Box
                                key={slot}
                                onClick={() => update("time", slot)}
                                sx={{
                                  px: 2.5,
                                  py: 1.2,
                                  border: "1px solid",
                                  borderColor:
                                    time === slot
                                      ? "var(--ds-accent)"
                                      : "rgba(0,0,0,0.18)",
                                  backgroundColor:
                                    time === slot
                                      ? "var(--ds-accent)"
                                      : "transparent",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  "&:hover":
                                    time !== slot
                                      ? {
                                          borderColor: "var(--ds-accent)",
                                          backgroundColor:
                                            "rgba(var(--ds-accent-rgb),0.08)",
                                          "& .time-label": {
                                            color: "var(--ds-accent)",
                                          },
                                        }
                                      : {},
                                }}
                              >
                                <Typography
                                  className="time-label"
                                  sx={{
                                    fontSize: "0.78rem",
                                    letterSpacing: "0.1em",
                                    color: time === slot ? "#fff" : "#555",
                                    transition: "color 0.2s",
                                  }}
                                >
                                  {slot}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        {/* Continue */}
                        <Box
                          onClick={() => step1Complete && setStep(2)}
                          sx={{
                            mt: 2,
                            py: 2.4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                            backgroundColor: step1Complete
                              ? "var(--ds-accent)"
                              : "rgba(0,0,0,0.04)",
                            border: "1px solid",
                            borderColor: step1Complete
                              ? "var(--ds-accent)"
                              : "rgba(0,0,0,0.15)",
                            cursor: step1Complete ? "pointer" : "default",
                            transition: "all 0.3s ease",
                            "&:hover": step1Complete
                              ? {
                                  backgroundColor: "var(--ds-accent-dark)",
                                  gap: 3,
                                }
                              : {},
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.68rem",
                              letterSpacing: "0.4em",
                              textTransform: "uppercase",
                              fontWeight: step1Complete ? 500 : 300,
                              color: step1Complete ? "#fff" : "rgba(0,0,0,0.3)",
                              transition: "color 0.3s",
                            }}
                          >
                            {b.continue}
                          </Typography>
                          {step1Complete && (
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "0.85rem",
                                lineHeight: 1,
                                transition: "all 0.3s",
                              }}
                            >
                              →
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}

                    {/* ── Step 2 ── */}
                    {step === 2 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        {/* Booking summary bar */}
                        <Box
                          sx={{
                            p: 3,
                            backgroundColor: "#fff",
                            border: "1px solid rgba(var(--ds-accent-rgb),0.15)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderLeft: "3px solid var(--ds-accent)",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "0.88rem",
                                fontWeight: 400,
                                color: "#1a1a1a",
                                mb: 0.5,
                                letterSpacing: "0.02em",
                              }}
                            >
                              {date?.format("dddd, D MMMM YYYY")} · {time}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.72rem",
                                color: "#aaa",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {guests} {guests === 1 ? "guest" : "guests"}
                            </Typography>
                          </Box>
                          <Typography
                            onClick={() => {
                              reset();
                              setStep(1);
                            }}
                            sx={{
                              fontSize: "0.6rem",
                              letterSpacing: "0.25em",
                              textTransform: "uppercase",
                              color: "var(--ds-accent)",
                              cursor: "pointer",
                              flexShrink: 0,
                              ml: 2,
                              "&:hover": { opacity: 0.7 },
                            }}
                          >
                            {b.edit}
                          </Typography>
                        </Box>

                        {/* Name fields */}
                        <Grid container spacing={4}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              variant="standard"
                              label={b.fieldFirstName}
                              value={firstName}
                              onChange={(e) => {
                                reset();
                                update("firstName", e.target.value);
                              }}
                              fullWidth
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              variant="standard"
                              label={b.fieldLastName}
                              value={lastName}
                              onChange={(e) => {
                                reset();
                                update("lastName", e.target.value);
                              }}
                              fullWidth
                              sx={fieldSx}
                            />
                          </Grid>
                        </Grid>

                        {/* Contact fields */}
                        <Grid container spacing={4}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              variant="standard"
                              label={b.fieldPhone}
                              type="tel"
                              placeholder={b.fieldPhonePlaceholder}
                              value={phone}
                              onChange={(e) => {
                                reset();
                                update("phone", e.target.value);
                              }}
                              helperText={b.fieldPhoneHelper}
                              fullWidth
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              variant="standard"
                              label={b.fieldEmail}
                              type="email"
                              value={email}
                              onChange={(e) => {
                                reset();
                                update("email", e.target.value);
                              }}
                              fullWidth
                              sx={fieldSx}
                            />
                          </Grid>
                        </Grid>

                        {/* Error */}
                        {isError && (
                          <Box
                            sx={{
                              px: 3,
                              py: 2.5,
                              borderLeft: "2px solid rgba(200,50,50,0.5)",
                              backgroundColor: "rgba(200,50,50,0.03)",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.82rem",
                                color: "#c44",
                                lineHeight: 1.7,
                              }}
                            >
                              {error.message}
                            </Typography>
                          </Box>
                        )}

                        {/* Confirm button */}
                        <Box
                          onClick={step2Complete ? handleConfirm : undefined}
                          sx={{
                            mt: 1,
                            py: 2.2,
                            textAlign: "center",
                            backgroundColor: step2Complete
                              ? "var(--ds-accent)"
                              : "transparent",
                            border: "1px solid",
                            borderColor: step2Complete
                              ? "var(--ds-accent)"
                              : "rgba(0,0,0,0.3)",
                            cursor: step2Complete ? "pointer" : "default",
                            transition: "all 0.3s ease",
                            "&:hover": step2Complete
                              ? { backgroundColor: "var(--ds-accent-dark)" }
                              : {},
                          }}
                        >
                          {isPending ? (
                            <CircularProgress
                              size={16}
                              sx={{ color: "#fff" }}
                            />
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "0.65rem",
                                letterSpacing: "0.4em",
                                textTransform: "uppercase",
                                color: step2Complete
                                  ? "#fff"
                                  : "rgba(0,0,0,0.45)",
                                transition: "color 0.3s",
                              }}
                            >
                              {b.confirm}
                            </Typography>
                          )}
                        </Box>

                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "0.6rem",
                            letterSpacing: "0.18em",
                            color: "#ccc",
                            textTransform: "uppercase",
                          }}
                        >
                          {b.groupNote}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
