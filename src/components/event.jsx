import React, { useState } from "react";
import "../App.css";

function Event() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success notification
  const [selectedEvent, setSelectedEvent] = useState("");
  const [numberOfAttendees, setNumberOfAttendees] = useState(1);
  const [error, setError] = useState(""); // State for error message

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => {
    setShowPopup(false);
    setShowSuccessPopup(false); // Close success popup when closing the main popup
    setError(""); // Clear error message on close
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (!selectedEvent || numberOfAttendees < 1) {
      setError("Please fill in all fields.");
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: selectedEvent,
          numberOfAttendees: numberOfAttendees,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      console.log(result); // Log the success message
      handleClosePopup(); // Close the form popup
      setShowSuccessPopup(true); // Show success notification
      // Reset form fields
      setSelectedEvent("");
      setNumberOfAttendees(1);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <section id="events" className="min-h-screen bg-white text-blue-800 flex items-center justify-center">
      <div className="w-full text-center p-10">
        <h2 className="text-5xl font-bold mb-6">Upcoming Events</h2>
        <p className="text-2xl mb-6">
          Join us for various temple events and spiritual gatherings happening throughout the year.
          Stay tuned for the latest updates and schedules on our platform.
        </p>
        <div className="event-wrapper">
          <div className="event-marquee">
            <div className="event-item">Diwali - November 12</div>
            <div className="event-item">Holi - March 10</div>
            <div className="event-item">Makar Sankranti - January 15</div>
            <div className="event-item">Navaratri - September 20</div>
            <div className="event-item">Dussehra - October 24</div>
            <div className="event-item">Ganesh Chaturthi - September 10</div>
            <div className="event-item">Raksha Bandhan - August 22</div>
            <div className="event-item">Janmashtami - August 19</div>
            <div className="event-item">Mahashivratri - March 1</div>
            <div className="event-item">Rama Navami - April 10</div>
          </div>
        </div>
        <br />
        <button
          onClick={handleOpenPopup}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
        >
          Attend an Event
        </button>

        {/* Event Registration Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4">Register for an Event</h3>
              {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4">
                  <label htmlFor="event" className="block text-xl font-semibold mb-2">Select Event</label>
                  <select
                    id="event"
                    name="event"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    <option value="">Select an event</option>
                    <option value="Diwali - November 12">Diwali - November 12</option>
                    <option value="Holi - March 10">Holi - March 10</option>
                    <option value="Makar Sankranti - January 15">Makar Sankranti - January 15</option>
                    <option value="Navaratri - September 20">Navaratri - September 20</option>
                    <option value="Dussehra - October 24">Dussehra - October 24</option>
                    <option value="Ganesh Chaturthi - September 10">Ganesh Chaturthi - September 10</option>
                    <option value="Raksha Bandhan - August 22">Raksha Bandhan - August 22</option>
                    <option value="Janmashtami - August 19">Janmashtami - August 19</option>
                    <option value="Mahashivratri - March 1">Mahashivratri - March 1</option>
                    <option value="Rama Navami - April 10">Rama Navami - April 10</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="attendees" className="block text-xl font-semibold mb-2">Number of Attendees</label>
                  <input
                    id="attendees"
                    type="number"
                    name="attendees"
                    value={numberOfAttendees}
                    onChange={(e) => setNumberOfAttendees(e.target.value)}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="mt-4 bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 text-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Notification Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4">Submission Successful</h3>
              <p>Your registration for the event has been successfully submitted.</p>
              <button
                onClick={handleClosePopup}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
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

export default Event;
