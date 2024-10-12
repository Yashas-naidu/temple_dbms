import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/auth.css';
import { useAuth } from '../components/authcontext';

function Auth() {
  const { signIn } = useAuth(); // Use signIn from context
  const navigate = useNavigate();
  const [formType, setFormType] = useState('signin');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'signup') {
        const response = await axios.post('http://localhost:5000/api/signup', formData);
        setMessage(response.data);
        setMessageType('success');
      } else {
        const response = await axios.post('http://localhost:5000/api/signin', formData);
        setMessage(response.data);
        setMessageType('success');
        signIn(); // Call signIn on successful login
        navigate('/'); // Navigate to home after sign-in
      }
    } catch (err) {
      setMessage(err.response ? err.response.data : 'An error occurred');
      setMessageType('error');
    }
  };

  const toggleForm = () => {
    setFormType(formType === 'signin' ? 'signup' : 'signin');
    setMessage('');
    setProgress(0);
  };

  useEffect(() => {
    let timer;
    if (message) {
      setProgress(0);
      const duration = 2000;
      const interval = 20;
      const totalSteps = duration / interval;

      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(prev + (100 / totalSteps), 100);
        });
      }, interval);

      setTimeout(() => {
        setMessage('');
        clearInterval(timer);
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-blue-500 overflow-hidden">
      <div className="absolute bg-white opacity-10 rounded-full w-96 h-96 top-10 left-20 animate-floating"></div>
      <div className="absolute bg-white opacity-20 rounded-full w-72 h-72 bottom-20 right-20 animate-floating"></div>
      <div className="absolute bg-white opacity-10 rounded-full w-64 h-64 bottom-32 left-32 animate-floating"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-[38rem] z-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          {formType === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>

        {message && (
          <div className="mb-4">
            <div className={`p-3 rounded-lg text-white text-center ${messageType === 'success' ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-red-400 to-red-600'}`}>
              {message}
            </div>
            <div className="h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
              <div
                className={`h-full bg-blue-500`}
                style={{ width: `${progress}%`, transition: 'width 20ms linear' }}
              ></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {formType === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  rows="3"
                  required
                />
              </div>
            </div>
          )}

          {formType === 'signin' && (
            <>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {formType === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={toggleForm}
          className="w-full py-2 mt-4 bg-gray-100 text-blue-500 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          {formType === 'signin' ? 'Switch to Sign Up' : 'Switch to Sign In'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
