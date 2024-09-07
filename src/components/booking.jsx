import React, { useState } from "react";

function BookingsSection() {
  const [bookingType, setBookingType] = useState("");

  return (
    <section id="features" className="min-h-screen bg-gray-100 text-blue-800 flex items-center justify-center">
      <div className="max-w-2xl text-center p-10">
        <h2 className="text-5xl font-bold mb-6">Bookings</h2>
        <p className="text-2xl mb-6">
          Our booking system provides a streamlined process for reserving your temple visits. Choose from a variety of temples, select your preferred date and time slot, and enjoy a seamless booking experience.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold mb-4">Book Your Visit</h3>
          <form className="flex flex-col items-center">
            <div className="mb-4 w-full max-w-md">
              <label htmlFor="temple" className="block text-left text-xl font-semibold mb-2">Select Temple</label>
              <select
                id="temple"
                name="temple"
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="temple1">Temple A</option>
                <option value="temple2">Temple B</option>
                <option value="temple3">Temple C</option>
              </select>
            </div>
            <div className="mb-4 w-full max-w-md">
              <label htmlFor="booking-type" className="block text-left text-xl font-semibold mb-2">What to Book</label>
              <select
                id="booking-type"
                name="booking-type"
                className="w-full p-3 border border-gray-300 rounded"
                onChange={(e) => setBookingType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="room">Room</option>
                <option value="services">Services</option>
                <option value="darshana">Darshana</option>
              </select>
            </div>
            {bookingType === "room" && (
              <>
                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="check-in" className="block text-left text-xl font-semibold mb-2">Check-In Date</label>
                  <input
                    type="date"
                    id="check-in"
                    name="check-in"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="check-out" className="block text-left text-xl font-semibold mb-2">Check-Out Date</label>
                  <input
                    type="date"
                    id="check-out"
                    name="check-out"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              </>
            )}
            <button type="submit" className="bg-blue-800 text-white py-3 px-6 rounded hover:bg-blue-600">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookingsSection;
