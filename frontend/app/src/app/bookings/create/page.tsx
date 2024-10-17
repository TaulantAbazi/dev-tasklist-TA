"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingService } from "../../../services/booking.service";

const CreateBooking = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const bookingService = new BookingService();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    if (
      !formData.service ||
      !formData.doctor_name ||
      !formData.start_time ||
      !formData.end_time ||
      !formData.date
    ) {
      setErrorMessage("All fields are required");
      setIsLoading(false);
      return;
    }

    const startTime = new Date(`1970-01-01T${formData.start_time}:00`);
    const endTime = new Date(`1970-01-01T${formData.end_time}:00`);

    if (endTime <= startTime) {
      setErrorMessage("End time must be after start time.");
      setIsLoading(false);
      return;
    }

    try {
      const formDataWithDate = {
        ...formData,
        date: new Date(formData.date),
      };

      await bookingService.createBooking(formDataWithDate);
      router.push("/bookings");
    } catch (error) {
      setErrorMessage("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 bg-gray-100">
      <h1 className="text-xl font-bold text-black mb-4">Add New Booking</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-black">Service</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
            placeholder="Enter service name"
            className="w-full mt-2 p-2 border rounded-lg text-black placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Doctor Name</label>
          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleInputChange}
            required
            placeholder="Enter doctor's name"
            className="w-full mt-2 p-2 border rounded-lg text-black placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            required
            placeholder="Enter start time"
            className="w-full mt-2 p-2 border rounded-lg text-black placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            required
            placeholder="Enter end time"
            className="w-full mt-2 p-2 border rounded-lg text-black placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            placeholder="Select booking date"
            className="w-full mt-2 p-2 border rounded-lg text-black placeholder-gray-400"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className={`${
              isLoading ? "bg-gray-300" : "bg-blue-500"
            } text-white py-2 px-4 rounded-lg`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Booking"}
          </button>
          <button
            type="button"
            className="text-gray-500 underline"
            onClick={() => router.push("/bookings")}
          >
            Back to Bookings
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBooking;
