import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaPencilAlt } from 'react-icons/fa';
import '../styles/TempleServicesDashboard.css';
import axios from 'axios';

const TempleServicesDashboard = () => {
  const [user, setUser] = useState({
    username: '',
    phone: '',
    address: '',
    email: '',
  });

  const [latestSession, setLatestSession] = useState(null);
  const [isEditing, setIsEditing] = useState({}); // Track which fields are being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
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

  useEffect(() => {
    const fetchLatestSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/session/latest');
        setLatestSession(response.data);
        setUser({
          username: response.data.username || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          email: response.data.email || '',
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

        {latestSession && (
          <div className="mb-6 p-4 border border-blue-300 rounded-lg text-blue-800">
            <h3 className="text-lg font-semibold text-blue-800">Latest Session</h3>
            <p><strong>User ID:</strong> {latestSession.user_id}</p>
            <p><strong>Sign In Time:</strong> {new Date(latestSession.sign_in_time).toLocaleString()}</p>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default TempleServicesDashboard;
