/**
 * NEXT.JS CONCEPT: Route Handler (API endpoint)
 *
 * This file replaces packages/delirium-backend/server.js entirely.
 * The old setup needed a separate Node.js process on port 3001.
 * Now this runs inside Next.js — one "next dev" command runs everything.
 *
 * File location → URL mapping:
 *   src/app/api/reservations/route.ts  →  POST /api/reservations
 *
 * You export named functions for each HTTP method:
 *   export async function GET()    → handles GET requests
 *   export async function POST()   → handles POST requests
 *   export async function DELETE() → handles DELETE requests
 *
 * These run on the server — API keys in process.env are never sent to the browser.
 */

import { NextResponse } from "next/server";
import schedule from "node-schedule";

const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL;
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;
const INFOBIP_SENDER = process.env.INFOBIP_SENDER || "Delirium";

const VALID_DAYS = new Set([4, 5, 6]); // Thu, Fri, Sat
const VALID_TIMES = new Set(["18:00", "18:30", "19:00", "19:30", "20:00"]);

function parseLocalDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

async function sendSms(to: string, text: string) {
  // Native fetch — no node-fetch needed in Node.js 18+
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
        messages: [{ destinations: [{ to }], from: INFOBIP_SENDER, text }],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Infobip error ${response.status}: ${err}`);
  }

  return response.json();
}

export async function POST(request: Request) {
  const { firstName, lastName, phone, email, guests, date, time } =
    await request.json();

  if (!firstName || !lastName || !phone || !email || !guests || !date || !time) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  const localDate = parseLocalDate(date);

  if (!VALID_DAYS.has(localDate.getDay())) {
    return NextResponse.json(
      { success: false, message: "Reservations are only available on Thursday, Friday, and Saturday." },
      { status: 400 }
    );
  }

  if (!VALID_TIMES.has(time)) {
    return NextResponse.json(
      { success: false, message: "Invalid time slot selected." },
      { status: 400 }
    );
  }

  const [hours, minutes] = time.split(":").map(Number);
  const reservationDateTime = new Date(
    localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), hours, minutes
  );

  if (reservationDateTime <= new Date()) {
    return NextResponse.json(
      { success: false, message: "Reservation must be in the future." },
      { status: 400 }
    );
  }

  const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[localDate.getDay()];

  try {
    await sendSms(
      formattedPhone,
      `Hello ${firstName}! Your reservation at Delirium Silence is confirmed for ${dayName}, ${date} at ${time} for ${guests} guest(s). We look forward to seeing you!`
    );

    // Schedule a reminder SMS 2 hours before the reservation.
    // Note: this works when running "next start" on a persistent server.
    // On serverless platforms (Vercel), processes don't persist between requests
    // so scheduled jobs would be lost. For production serverless, use a cron service.
    const reminderTime = new Date(reservationDateTime.getTime() - 2 * 60 * 60 * 1000);
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
            console.error("Failed to send reminder SMS:", err);
          }
        }
      );
    }

    console.log(`Reservation confirmed: ${firstName} ${lastName} on ${date} at ${time}`);
    return NextResponse.json({
      success: true,
      message: `Reservation confirmed! A confirmation SMS has been sent to ${formattedPhone}.`,
    });
  } catch (err) {
    console.error("Infobip error:", err);
    return NextResponse.json(
      { success: false, message: "Reservation received but SMS could not be sent. Please call us to confirm." },
      { status: 500 }
    );
  }
}
