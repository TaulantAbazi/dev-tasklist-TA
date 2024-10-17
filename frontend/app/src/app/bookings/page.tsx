"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BookingService } from "../../services/booking.service";
import { Booking } from "../../lib/booking";

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const bookingService = new BookingService();

  const fetchBookings = async () => {
    const fetchedBookings = await bookingService.getBookings();
    setBookings(fetchedBookings || []);
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-8">
      <Link href="/bookings/create">
        <button className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 focus:outline-none mb-8">
          Add New Booking
        </button>
      </Link>
      <ul className="w-full max-w-2xl flex text-black flex-col items-center space-y-4">
        {bookings?.map((booking: Booking) => (
          <li
            key={booking.id}
            className="w-full p-4 bg-white rounded-lg shadow-lg text-center text-gray-800"
          >
            <Link
              className="block hover:bg-gray-200 p-4 rounded-lg"
              href={`/bookings/${booking.id}`}
            >
              <p className="font-semibold">
                A booking on{" "}
                {new Date(booking.date).toLocaleDateString("en-GB")}
              </p>
              <p>Starting at {booking.start_time}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
