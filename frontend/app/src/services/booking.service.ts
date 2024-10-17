import { Booking } from "../lib/booking";

const BASE_API_URL = "http://host.docker.internal:5000/api/bookings";

export class BookingService {
  async getBookings(): Promise<Booking[]> {
    const res = await fetch(BASE_API_URL, {
      cache: "no-store",
      mode: "no-cors",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  async getBookingById(id: number): Promise<Booking> {
    const res = await fetch(`${BASE_API_URL}/${id}`, {
      cache: "no-store",
      mode: "no-cors",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch booking with id ${id}`);
    }

    return res.json();
  }

  async createBooking(bookingData: Partial<Booking>): Promise<void> {
    const { service, doctor_name, start_time, end_time, date } = bookingData;
    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          doctor_name,
          start_time,
          end_time,
          date,
        }),
      });
    } catch (error) {
      throw new Error("Failed to create booking");
    }
  }
}