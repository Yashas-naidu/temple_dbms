import React, { useState } from "react";
import "../App.css"


function Event(){

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
return(
  <section id="events" className="min-h-screen bg-white text-blue-800 flex items-center justify-center">
  <div className="w-full text-center p-10">
    <h2 className="text-5xl font-bold mb-6">Upcoming Events</h2>
    <p className="text-2xl mb-6">
      Join us for various temple events and spiritual gatherings happening throughout the year. 
      Stay tuned for the latest updates and schedules on our platform.
    </p>
    <div className="event-wrapper">
      <div className="event-marquee">
        <div className="event-item">Annual Temple Festival - January 15</div>
        <div className="event-item">Spring Spiritual Retreat - March 10</div>
        <div className="event-item">Summer Temple Fair - June 5</div>
        <div className="event-item">Autumn Meditation Retreat - September 20</div>
        <div className="event-item">Winter Solstice Ceremony - December 21</div>
        <div className="event-item">Temple Renovation Project - Ongoing</div>
        <div className="event-item">Special Guest Lecture - November 12</div>
        <div className="event-item">Children's Spiritual Workshop - August 22</div>
        <div className="event-item">Social welfare week- August 22</div>
        {/* Repeat items to ensure continuous scroll */}
      </div>
    </div>
    <br />
    <button
      onClick={handleOpenPopup}
      className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
    >
      Attend an Event
    </button>
    {showPopup && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Register for an Event</h3>
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
                <option value="Annual Temple Festival - January 15">Annual Temple Festival - January 15</option>
                <option value="Spring Spiritual Retreat - March 10">Spring Spiritual Retreat - March 10</option>
                <option value="Summer Temple Fair - June 5">Summer Temple Fair - June 5</option>
                <option value="Autumn Meditation Retreat - September 20">Autumn Meditation Retreat - September 20</option>
                <option value="Winter Solstice Ceremony - December 21">Winter Solstice Ceremony - December 21</option>
                <option value="Temple Renovation Project - Ongoing">Temple Renovation Project - Ongoing</option>
                <option value="Special Guest Lecture - November 12">Special Guest Lecture - November 12</option>
                <option value="Children's Spiritual Workshop - August 22">Children's Spiritual Workshop - August 22</option>
                <option value="Social welfare week- August 22">Social welfare week- August 22</option>
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
  </div>
</section>
); 
}

export default Event;