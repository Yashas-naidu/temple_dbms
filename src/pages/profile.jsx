import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import '../styles/TempleServicesDashboard.css';  // Import CSS for animations
import axios from 'axios';  // Make sure to install axios

const TempleServicesDashboard = () => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    // serviceDate: ''
  });

  const [latestSession, setLatestSession] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchLatestSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/session/latest');
        setLatestSession(response.data);

        // Fill user state with latest session details
        setUser({
          name: response.data.username || '', // Set name from username
          phone: response.data.phone || '', // Set phone from the API response
          address: response.data.address || '', // Set address from the API response
          email: response.data.email || '', // Set email from the API response
          // serviceDate: new Date(response.data.sign_in_time).toISOString().split('T')[0] // Format the sign-in time for the date input
        });
      } catch (error) {
        console.error("Error fetching latest session:", error);
      }
    };

    fetchLatestSession();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen animated-bg p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 border border-blue-800 backdrop-blur-lg">
        <h2 className="text-3xl font-semibold text-blue-800 text-center mb-6">Temple Services Dashboard</h2>

        {/* Render latest session data if available */}
        {latestSession && (
          <div className="mb-6 p-4 border border-blue-300 rounded-lg text-blue-800">
            <h3 className="text-lg font-semibold text-blue-800">Latest Session</h3>
            <p><strong>User ID:</strong> {latestSession.user_id}</p>
            <p><strong>Sign In Time:</strong> {new Date(latestSession.sign_in_time).toLocaleString()}</p>
          </div>
        )}

        <form className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaUserAlt className="text-blue-700 text-2xl" />
            <div className="w-full">
              <label className="block text-blue-800 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-blue-700 text-2xl" />
            <div className="w-full">
              <label className="block text-blue-800 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-blue-700 text-2xl" />
            <div className="w-full">
              <label className="block text-blue-800 font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-blue-700 text-2xl" />
            <div className="w-full">
              <label className="block text-blue-800 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
          </div>

          {/* <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-blue-700 text-2xl" />
            <div className="w-full">
              <label className="block text-blue-800 font-medium mb-1">Service Date</label>
              <input
                type="date"
                name="serviceDate"
                value={user.serviceDate}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
          </div>*/}
        </form>
      </div>
    </div>
  );
};

export default TempleServicesDashboard;
