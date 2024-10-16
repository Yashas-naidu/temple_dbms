import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function Donation() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      donationType: e.target["donation-type"].value,
      donationAmount: e.target["donation-amount"].value,
    };

    try {
      await axios.post("http://localhost:5000/api/donations", donationData);
      setPopupMessage("Donation received successfully!");
      setShowPopup(true);
    } catch (error) {
      console.error("Error receiving donation", error);
      setPopupMessage("Error receiving donation. Please try again.");
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage(""); // Clear message when closing
  };

  return (
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

      {/* Notification Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-xl mb-4">{popupMessage}</p>
            <button onClick={handleClosePopup} className="bg-blue-600 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Donation;
