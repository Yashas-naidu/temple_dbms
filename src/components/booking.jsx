import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useCart } from "./cartcontext";

function Booking() {
  const [showPopup, setShowPopup] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const { addToCart } = useCart();

  // Constant for daily rate
  const dailyRate = 500;

  // Effect to calculate the number of days based on selected dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const days = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
      setNumberOfDays(days < 0 ? 0 : days); // Ensure no negative days
    }
  }, [startDate, endDate]);

  // Handle form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // Check if start date is after end date
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    const bookingData = {
      temple: e.target.temple.value,
      bookingType,
      startDate,
      endDate,
      amount: numberOfDays * dailyRate, // Calculate total amount
    };

    try {
      await axios.post("http://localhost:5000/api/bookings", bookingData);
      addToCart({
        type: 'booking', // Specify the type of cart item
        bookingType,
        amount: numberOfDays * dailyRate, // Add amount correctly
      });
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000);
    } catch (error) {
      console.error("Error creating booking", error);
      alert("Error creating booking. Please try again."); // Inform user of error
    }
  };

  return (
    <section id="features" className="min-h-screen bg-gray-100 text-blue-800 flex items-center justify-center">
      <div className="max-w-2xl text-center p-10">
        <h2 className="text-5xl font-bold mb-6">Bookings</h2>
        <p className="text-2xl mb-6">
          Our booking system provides a streamlined process for reserving your temple visits. Choose from a variety of temples, select your preferred date and time slot, and enjoy a seamless booking experience.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold mb-4">Book Your Visit</h3>
          <form onSubmit={handleBookingSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full max-w-md">
              <label htmlFor="temple" className="block text-left text-xl font-semibold mb-2">Select Temple</label>
              <select
                id="temple"
                name="temple"
                className="w-full p-3 border border-gray-300 rounded"
                required
              >
                <option value="temple1">Temple A</option>
                <option value="temple2">Temple B</option>
                <option value="temple3">Temple C</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mb-4 w-full max-w-md">
              <label htmlFor="booking-type" className="block text-left text-xl font-semibold mb-2">What to Book</label>
              <select
                id="booking-type"
                name="booking-type"
                className="w-full p-3 border border-gray-300 rounded"
                onChange={(e) => setBookingType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="services">Services</option>
                <option value="darshana">Darshana</option>
              </select>
            </div>

            {/* Conditional rendering based on booking type */}
            {bookingType && (
              <>
                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="start-date" className="block text-left text-xl font-semibold mb-2">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    name="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="end-date" className="block text-left text-xl font-semibold mb-2">End Date</label>
                  <input
                    id="end-date"
                    type="date"
                    name="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4 w-full max-w-md">
                  <label className="block text-left text-xl font-semibold mb-2">Total Days</label>
                  <p className="p-3 border border-gray-300 rounded">{numberOfDays} Day(s)</p>
                </div>

                <div className="mb-4 w-full max-w-md">
                  <label className="block text-left text-xl font-semibold mb-2">Total Amount</label>
                  <p className="p-3 border border-gray-300 rounded">₹{numberOfDays * dailyRate}</p>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
                >
                  Book Now
                </button>
                <br />
                <caption>You need to proceed to payments to confirm your bookings !!</caption>
              </>
            )}
          </form>
        </div>

        {/* Notification Popup */}
        {notificationVisible && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4">Booking Successful!</h3>
              <p>Your booking has been successfully created.</p>
              <button
                onClick={() => setNotificationVisible(false)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Booking;
