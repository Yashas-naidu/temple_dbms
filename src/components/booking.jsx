import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function Booking() {
  const [showPopup, setShowPopup] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false); // State for notification
  const [selectedEvent, setSelectedEvent] = useState("");
  const [numberOfAttendees, setNumberOfAttendees] = useState(1);
  const [bookingType, setBookingType] = useState("");

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Event: ${selectedEvent}, Number of Attendees: ${numberOfAttendees}`);
    handleClosePopup();
  };

  const handlebookingSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      temple: e.target.temple.value,
      bookingType,
      date: e.target.date?.value,
      timeSlot: e.target["time-slot"]?.value,
      serviceType: e.target.serviceType?.value,
    };

    // Validate required fields
    if (!bookingData.temple || !bookingData.bookingType || !bookingData.date || !bookingData.timeSlot || (bookingType === "services" && !bookingData.serviceType)) {
      alert("Please fill out all required fields.");
      return; // Prevent submission
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", bookingData);
      console.log("Booking created");
      setNotificationVisible(true); // Show notification on successful submission
      handleClosePopup();

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating booking", error);
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
          <form onSubmit={handlebookingSubmit} className="flex flex-col items-center">
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
            {bookingType === "services" && (
              <>
                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="service-type" className="block text-left text-xl font-semibold mb-2">Select Service</label>
                  <select
                    id="service-type"
                    name="serviceType"
                    className="w-full p-3 border border-gray-300 rounded"
                    required={bookingType === "services"} // Make this required if bookingType is services
                  >
                    <option value="">Select Service</option>
                    <option value="special-pooja">Special Pooja</option>
                    <option value="abhishekas">Abhishekas</option>
                  </select>
                </div>

                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="date" className="block text-left text-xl font-semibold mb-2">Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="time-slot" className="block text-left text-xl font-semibold mb-2">Select Time Slot</label>
                  <select
                    id="time-slot"
                    name="time-slot"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
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
            {bookingType === "darshana" && (
              <>
                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="date" className="block text-left text-xl font-semibold mb-2">Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="time-slot" className="block text-left text-xl font-semibold mb-2">Select Time Slot</label>
                  <select
                    id="time-slot"
                    name="time-slot"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
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

        {/* Notification Popup */}
        {notificationVisible && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4">Booking Successful!</h3>
              <p>Your booking has been successfully created.</p>
              <button
                onClick={() => setNotificationVisible(false)}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
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
