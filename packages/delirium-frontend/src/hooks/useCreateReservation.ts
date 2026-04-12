import { useMutation } from "@tanstack/react-query";

export interface ReservationPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
}

interface ReservationResponse {
  success: boolean;
  message: string;
}

export function useCreateReservation() {
  return useMutation<ReservationResponse, Error, ReservationPayload>({
    mutationFn: async (payload) => {
      const response = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: ReservationResponse = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.message || "Failed to create reservation.");
      return data;
    },
  });
}
