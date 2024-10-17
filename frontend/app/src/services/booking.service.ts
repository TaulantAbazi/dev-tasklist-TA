import { Booking } from "../lib/booking";

const BASE_API_URL = "http://localhost:5000/api/bookings";

export class BookingService {
  async getBookings(): Promise<Booking[]> {
    const res = await fetch(BASE_API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  }

  async getBookingById(id: number): Promise<Booking> {
    const res = await fetch(
      `${"http://host.docker.internal:5000/api/bookings"}/${id}`,
      {
        cache: "no-store",
        mode: "no-cors",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch booking with id ${id}`);
    }

    return res.json();
  }

  async createBooking(bookingData: Partial<Booking>): Promise<void> {
    const { service, doctor_name, start_time, end_time, date } = bookingData;
    try {
      await fetch(BASE_API_URL, {
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
