import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import schedule from "node-schedule";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL;
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;
const INFOBIP_SENDER = process.env.INFOBIP_SENDER || "Delirium";

// Only Thursday (4), Friday (5), Sunday (6)
const VALID_DAYS = new Set([4, 5, 6]);

const VALID_TIMES = new Set(["18:00", "18:30", "19:00", "19:30", "20:00"]);

function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

async function sendSms(to, text) {
  const response = await fetch(
    `https://${INFOBIP_BASE_URL}/sms/2/text/advanced`,
    {
      method: "POST",
      headers: {
        Authorization: `App ${INFOBIP_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            destinations: [{ to }],
            from: INFOBIP_SENDER,
            text,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Infobip error ${response.status}: ${err}`);
  }

  return response.json();
}

app.post("/api/reservations", async (req, res) => {
  const { firstName, lastName, phone, email, guests, date, time } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !guests ||
    !date ||
    !time
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const localDate = parseLocalDate(date);

  if (!VALID_DAYS.has(localDate.getDay())) {
    return res.status(400).json({
      success: false,
      message:
        "Reservations are only available on Thursday, Friday, and Saturdays.",
    });
  }

  if (!VALID_TIMES.has(time)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid time slot selected." });
  }

  const [hours, minutes] = time.split(":").map(Number);
  const reservationDateTime = new Date(
    localDate.getFullYear(),
    localDate.getMonth(),
    localDate.getDate(),
    hours,
    minutes
  );

  if (reservationDateTime <= new Date()) {
    return res
      .status(400)
      .json({ success: false, message: "Reservation must be in the future." });
  }

  // Strip non-digit/+ characters, ensure E.164
  const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[localDate.getDay()];

  try {
    // 1. Confirmation SMS
    await sendSms(
      formattedPhone,
      `Hello ${firstName}! Your reservation at Delirium Silence is confirmed for ${dayName}, ${date} at ${time} for ${guests} guest(s). We look forward to seeing you!`
    );

    // 2. Schedule reminder 2 hours before
    const reminderTime = new Date(
      reservationDateTime.getTime() - 2 * 60 * 60 * 1000
    );

    if (reminderTime > new Date()) {
      schedule.scheduleJob(
        `reminder-${formattedPhone}-${date}-${time}`,
        reminderTime,
        async () => {
          try {
            await sendSms(
              formattedPhone,
              `Reminder: Your table at Delirium Silence is in 2 hours – today at ${time} for ${guests} guest(s). See you soon, ${firstName}!`
            );
            console.log(`Reminder SMS sent to ${formattedPhone}`);
          } catch (err) {
            console.error("Failed to send reminder SMS:", err.message);
          }
        }
      );
      console.log(
        `Reminder scheduled for ${reminderTime.toISOString()} → ${formattedPhone}`
      );
    }

    console.log(
      `Reservation confirmed: ${firstName} ${lastName} on ${date} at ${time}`
    );
    res.json({
      success: true,
      message: `Reservation confirmed! A confirmation SMS has been sent to ${formattedPhone}.`,
    });
  } catch (err) {
    console.error("Infobip error:", err.message);
    res.status(500).json({
      success: false,
      message:
        "Reservation received but SMS could not be sent. Please call us to confirm.",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Delirium Silence backend running on http://localhost:${PORT}`);
});
