import React, { useState } from "react";
import { Link } from "react-scroll";
import "../App.css"
import axios from 'axios';

function LandingPage() {
  const [bookingType, setBookingType] = useState("");
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
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      donationType: e.target['donation-type'].value,
      donationAmount: e.target['donation-amount'].value,
    };
  
    try {
      await axios.post('http://localhost:5000/api/donations', donationData);
      console.log('Donation received');
    } catch (error) {
      console.error('Error receiving donation', error);
    }
  };
  

  
  return (
    <div className="relative min-h-screen bg-blue-600 text-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-10 bg-blue-600 bg-opacity-70">
        <div className="text-9xl font-bold">TempleTrek.com</div>
        <div className="space-x-4 text-3xl">
          <Link
            to="home"
            smooth={true}
            duration={1000}
            className="hover:underline cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="features"
            smooth={true}
            duration={1000}
            className="hover:underline cursor-pointer"
          >
            Bookings
          </Link>
          <Link
            to="events"
            smooth={true}
            duration={1000}
            className="hover:underline cursor-pointer"
          >
            Events
          </Link>
          <Link
            to="donations"
            smooth={true}
            duration={1000}
            className="hover:underline cursor-pointer"
          >
            Donations
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={1000}
            className="hover:underline cursor-pointer"
          >
            Contact
          </Link>
        </div>
        <div className="space-x-4">
          <button className="text-gray-200 hover:underline text-3xl">Sign In</button>
          <button className="bg-white text-blue-800 py-2 px-4 rounded hover:bg-gray-200 text-3xl">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Home Section with Video */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        >
          <source
            src="https://cdn.pixabay.com/video/2015/08/13/444-136216213_large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to TempleTrek</h1>
          <p className="text-2xl mb-6">Your gateway to spiritual journeys and temple visits.</p>
          <Link
            to="about"
            smooth={true}
            duration={1000}
            className="bg-white text-blue-800 py-3 px-6 rounded hover:bg-gray-200 text-2xl cursor-pointer"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-white text-blue-800 flex items-center justify-center">
        <div className="max-w-2xl p-10">
          <h2 className="text-8xl font-bold mb-6 text-center">About Us</h2>
          <p className="text-2xl mb-6">
            TempleTrek is dedicated to making your spiritual journeys seamless and enriching. We understand the importance of temple visits in your spiritual life and aim to provide a platform that simplifies and enhances this experience.
          </p>
          <p className="text-2xl mb-6">
            Our team is passionate about connecting people with temples across various regions, offering detailed information, and ensuring a hassle-free booking process. Whether you're looking for a serene meditation retreat, a vibrant festival, or a quiet pilgrimage, TempleTrek is here to guide you every step of the way.
          </p>
          <p className="text-2xl mb-6">
            We pride ourselves on our commitment to providing high-quality service, secure transactions, and personalized support. Our mission is to make spiritual exploration accessible and enjoyable for everyone, fostering a deeper connection to your spiritual practices.
          </p>
        </div>
      </section>

      {/* Bookings Section */}
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

            {/* Events Section */}
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

      {/* Donations Section */}
{/* Donations Section */}
<section id="donations" className="min-h-screen bg-gray-100 text-blue-800 flex items-center justify-center">
  <div className="max-w-2xl text-center p-10">
    <h2 className="text-5xl font-bold mb-6">Donations</h2>
    <p className="text-2xl mb-6">
      Your generous donations help us maintain and improve temple facilities, organize events, and support community welfare projects. We appreciate your support.
    </p>
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-3xl font-bold mb-4">Donate Now</h3>
      <form onSubmit={handleDonationSubmit} className="flex flex-col items-center">
        {/* Name */}
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="name" className="block text-left text-xl font-semibold mb-2">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="phone" className="block text-left text-xl font-semibold mb-2">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter 10-digit phone number"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="address" className="block text-left text-xl font-semibold mb-2">Address</label>
          <textarea
            id="address"
            name="address"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Donation Type */}
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="donation-type" className="block text-left text-xl font-semibold mb-2">Donation Type</label>
          <select
            id="donation-type"
            name="donation-type"
            className="w-full p-3 border border-gray-300 rounded"
            required
          >
            <option value="">Select a type</option>
            <option value="temple-maintenance">Temple Maintenance</option>
            <option value="event-sponsorship">Event Sponsorship</option>
            <option value="community-welfare">Community Welfare</option>
          </select>
        </div>

        {/* Donation Amount */}
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="donation-amount" className="block text-left text-xl font-semibold mb-2">Donation Amount (₹)</label>
          <input
            id="donation-amount"
            type="number"
            name="donation-amount"
            min="1"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter amount in ₹"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 text-lg"
        >
          Donate Now
        </button>
      </form>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-white text-blue-800 flex items-center justify-center">
        <div className="max-w-2xl text-center p-10">
          <h2 className="text-5xl font-bold mb-6">Contact Us</h2>
          <p className="text-2xl mb-6">For any inquiries, feedback, or support, feel free to reach out to us:</p>
          <p className="text-2xl font-bold mt-4">support@templetrek.com</p>
          <p className="text-2xl mt-2">We aim to respond to all queries within 24 hours.</p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        <p>&copy; 2024 TempleTrek. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
