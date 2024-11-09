import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaPencilAlt } from 'react-icons/fa';
import '../styles/TempleServicesDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TempleServicesDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    phone: '',
    address: '',
    email: '',
  });

  const [latestSession, setLatestSession] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]); // State for storing events
  const [isEditing, setIsEditing] = useState({}); // Track which fields are being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  const handlesignout = () => {
    navigate('/auth'); // Navigate to the profile endpoint
  };

  const toggleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleSave = async (field) => {
    try {
      await axios.put('http://localhost:5000/api/update-profile', {
        field,
        value: user[field]
      });
      toggleEdit(field);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
      if (confirmation) {
        await axios.delete('http://localhost:5000/api/delete-account');
        navigate('/auth'); // Redirect to the login page or home page after deletion
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    const fetchLatestSessionAndDetails = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:5000/api/session/latest');
        setLatestSession(sessionResponse.data);
        setUser({
          username: sessionResponse.data.username || '',
          phone: sessionResponse.data.phone || '',
          address: sessionResponse.data.address || '',
          email: sessionResponse.data.email || '',
        });

        // Fetch bookings and donations
        const userDetailsResponse = await axios.get('http://localhost:5000/api/user-details');
        setBookings(userDetailsResponse.data.bookings);
        setDonations(userDetailsResponse.data.donations);

        const eventsResponse = await axios.get('http://localhost:5000/api/events/user');
        const uniqueEvents = Array.from(new Set(eventsResponse.data.map(e => e.event))).map(event => {
          return eventsResponse.data.find(e => e.event === event);
        });
        setEvents(uniqueEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLatestSessionAndDetails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen animated-bg p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 border border-blue-800 backdrop-blur-lg">
        <h2 className="text-3xl font-semibold text-blue-800 text-center mb-6">Temple Services Dashboard</h2>
        <div className="flex items-center justify-end w-full mb-4">
          <button
            onClick={handlesignout}
            className="bg-white text-blue-800 mx-2 py-2 px-4 rounded hover:bg-gray-200 text-2xl border border-blue-800">
            Sign out
          </button>
        </div>
        {/* Profile Form */}
        <form className="space-y-6">
          {["username", "phone", "address", "email"].map((field) => (
            <div key={field} className="flex items-center space-x-4">
              {field === "username" && <FaUserAlt className="text-blue-700 text-2xl" />}
              {field === "phone" && <FaPhoneAlt className="text-blue-700 text-2xl" />}
              {field === "address" && <FaMapMarkerAlt className="text-blue-700 text-2xl" />}
              {field === "email" && <FaEnvelope className="text-blue-700 text-2xl" />}
              <div className="w-full">
                <label className="block text-blue-800 font-medium mb-1 capitalize">{field}</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name={field}
                    value={user[field]}
                    onChange={handleChange}
                    disabled={!isEditing[field]}
                    className={`w-full border ${isEditing[field] ? 'border-blue-600' : 'border-blue-400'} rounded-lg p-2 focus:outline-none text-black`}
                  />
                  <FaPencilAlt
                    className="text-blue-600 ml-2 cursor-pointer"
                    onClick={() => toggleEdit(field)}
                  />
                  {isEditing[field] && (
                    <button
                      type="button"
                      onClick={() => handleSave(field)}
                      className="ml-2 text-white bg-blue-600 px-3 py-1 rounded-lg"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </form>

        {/* Bookings History */}
        <div className="mt-6 text-blue-800">
          <h3 className="text-2xl font-semibold text-blue-800">Bookings History</h3>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} className="mt-4 p-4 border border-blue-300 rounded-lg">
                <p><strong>Temple:</strong> {booking.temple}</p>
                <p><strong>Booking Type:</strong> {booking.booking_type}</p>
                <p><strong>Start Date:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ₹{booking.amount}</p>
              </div>
            ))
          ) : (
            <p className="mt-4 text-blue-800">No bookings found.</p>
          )}
        </div>

        {/* Donations History */}
        <div className="mt-6 text-blue-800">
          <h3 className="text-2xl font-semibold text-blue-800">Donations History</h3>
          {donations.length > 0 ? (
            donations.map((donation, index) => (
              <div key={index} className="mt-4 p-4 border border-blue-300 rounded-lg">
                <p><strong>Name:</strong> {donation.name}</p>
                <p><strong>Donation Type:</strong> {donation.donationType}</p>
                <p><strong>Donation Amount:</strong> ₹{donation.donationAmount}</p>
              </div>
            ))
          ) : (
            <p className="mt-4 text-blue-800">No donations found.</p>
          )}
        </div>

        {/* Events History */}
        <div className="mt-6 text-blue-800">
          <h3 className="text-2xl font-semibold text-blue-800">Your Events</h3>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="mt-4 p-4 border border-blue-300 rounded-lg">
                <p><strong>Event:</strong> {event.event}</p>
                <p><strong>numberOfAttendees:</strong> {event.numberOfAttendees}</p>
    
              </div>
            ))
          ) : (
            <p className="mt-4 text-blue-800">No events found.</p>
          )}
        </div>

        {/* Delete Account Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempleServicesDashboard;
