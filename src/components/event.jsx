import React from "react";

function EventsSection({ handleOpenPopup, showPopup, handleClosePopup, selectedEvent, setSelectedEvent, numberOfAttendees, setNumberOfAttendees, handleSubmit }) {
  return (
    <section id="events" className="min-h-screen bg-white text-blue-800 flex items-center justify-center">
      <div className="max-w-2xl p-10 text-center">
        <h2 className="text-5xl font-bold mb-6">Events</h2>
        <p className="text-2xl mb-6">
          Explore our upcoming events and make reservations to attend. From spiritual gatherings to festive celebrations, there's something for everyone.
        </p>
        <button onClick={handleOpenPopup} className="bg-blue-800 text-white py-3 px-6 rounded hover:bg-blue-600 text-2xl">
          Reserve a Spot
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-3xl font-bold mb-4">Reserve Your Spot</h3>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="event" className="block text-xl font-semibold mb-2">Select Event</label>
                  <select
                    id="event"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    <option value="">Select Event</option>
                    <option value="event1">Event 1</option>
                    <option value="event2">Event 2</option>
                    <option value="event3">Event 3</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="attendees" className="block text-xl font-semibold mb-2">Number of Attendees</label>
                  <input
                    type="number"
                    id="attendees"
                    value={numberOfAttendees}
                    onChange={(e) => setNumberOfAttendees(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                    min="1"
                  />
                </div>
                <button type="submit" className="bg-blue-800 text-white py-3 px-6 rounded hover:bg-blue-600">
                  Submit
                </button>
                <button type="button" onClick={handleClosePopup} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400">
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsSection;
