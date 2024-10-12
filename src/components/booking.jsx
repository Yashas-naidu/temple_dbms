import React, { useState } from "react";
import "../App.css"
import axios from 'axios';

function Booking() {
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [numberOfAttendees, setNumberOfAttendees] = useState(1);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(`Event: ${selectedEvent}, Number of Attendees: ${numberOfAttendees}`);
    handleClosePopup();
  };
  const [bookingType, setBookingType] = useState("");

  const handlebookingSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      temple: e.target.temple.value,
      bookingType,
      checkIn: e.target['check-in']?.value,
      checkOut: e.target['check-out']?.value,
      numberOfDays: e.target['number-of-days']?.value,
      date: e.target.date?.value,
      timeSlot: e.target['time-slot']?.value,
    };
  
    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      console.log('Booking created');
      handleClosePopup();
    } catch (error) {
      console.error('Error creating booking', error);
    }
  };
  return(
    <section id="features" className="min-h-screen bg-gray-100 text-blue-800 flex items-center justify-center">
    <div className="max-w-2xl text-center p-10">
      <h2 className="text-5xl font-bold mb-6">Bookings</h2>
      <p className="text-2xl mb-6">
        Our booking system provides a streamlined process for reserving your temple visits. Choose from a variety of temples, select your preferred date and time slot, and enjoy a seamless booking experience.
      </p>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold mb-4">Book Your Visit</h3>
        <form onSubmit={handlebookingSubmit} className="flex flex-col items-center">
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
            >
              <option value="">Select</option>
              <option value="room">Room</option>
              <option value="services">Services</option>
              <option value="darshana">Darshana</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {bookingType === "room" && (
            <>
              <div className="mb-4 w-full max-w-md">
                <label htmlFor="check-in" className="block text-left text-xl font-semibold mb-2">Check-In Date</label>
                <input
                  id="check-in"
                  type="date"
                  name="check-in"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4 w-full max-w-md">
                <label htmlFor="check-out" className="block text-left text-xl font-semibold mb-2">Check-Out Date</label>
                <input
                  id="check-out"
                  type="date"
                  name="check-out"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4 w-full max-w-md">
                <label htmlFor="number-of-days" className="block text-left text-xl font-semibold mb-2">Number of Days</label>
                <input
                  id="number-of-days"
                  type="number"
                  name="number-of-days"
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </>
          )}
          {bookingType !== "room" && (
            <>
              <div className="mb-4 w-full max-w-md">
                <label htmlFor="date" className="block text-left text-xl font-semibold mb-2">Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4 w-full max-w-md">
                <label htmlFor="time-slot" className="block text-left text-xl font-semibold mb-2">Select Time Slot</label>
                <select
                  id="time-slot"
                  name="time-slot"
                  className="w-full p-3 border border-gray-300 rounded"
                >
                  <option value="08:00-10:00">08:00 AM - 10:00 AM</option>
                  <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                  <option value="12:00-02:00">12:00 PM - 02:00 PM</option>
                  <option value="02:00-04:00">02:00 PM - 04:00 PM</option>
                  <option value="04:00-06:00">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  </section>
  );
}

export default Booking;