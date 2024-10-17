import { BookingService } from "../../../services/booking.service";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
type Props = {
  params: { id: string };
};

export default async function BookingDetails({ params }: Props) {
  const bookingService = new BookingService();
  const booking = await bookingService.getBookingById(Number(params.id));

  if (!booking) return <p>Booking not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <Link href="/bookings">
        <button className="flex items-center self-start justify-start p-2 bg-blue-500 text-white rounded shadow-md mb-4">
          <AiOutlineArrowLeft className="mr-2" />
          Bookings
        </button>
      </Link>
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg text-center text-gray-800">
        <p>
          This Booking is with {booking.doctor_name} for {booking.service}, and
          it ends at {booking.end_time}.
        </p>
      </div>
    </div>
  );
}
