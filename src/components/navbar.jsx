import React, { useState } from "react";
import { Link } from "react-scroll";
import "../App.css";
import "../styles/loading.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./authcontext";
import myvideo from "../resources/lord.mp4";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Access authentication state
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true); // Set authentication to true after sign-in
      navigate('/auth');
    }, 800);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile endpoint
  };

  const handlePaymentClick = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <div className="relative min-h-screen bg-blue-600 text-white">
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-10 bg-blue-600 bg-opacity-70">
        <div className="text-9xl font-bold">TempleTrek.com</div>
        <div className="space-x-4 text-3xl">
          <Link to="home" smooth={true} duration={1000} className="hover:underline cursor-pointer">Home</Link>
          <Link to="features" smooth={true} duration={1000} className="hover:underline cursor-pointer">Bookings</Link>
          <Link to="events" smooth={true} duration={1000} className="hover:underline cursor-pointer">Events</Link>
          <Link to="donations" smooth={true} duration={1000} className="hover:underline cursor-pointer">Donations</Link>
          <Link to="contact" smooth={true} duration={1000} className="hover:underline cursor-pointer">Contact</Link>
        </div>
        <div className="space-x-4 flex items-center">
          {/* Show Sign In button if not authenticated */}
          {!isAuthenticated ? (
            <div style={{ display: 'inline-block', position: 'relative', width: '100px', height: '48px' }}>
              {isLoading ? (
                <div className="spinner" style={{ display: 'inline-block', margin: 'auto' }}></div>
              ) : (
                <button
                  onClick={handleButtonClick}
                  className="text-gray-200 hover:underline text-3xl w-full h-full"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  Sign In
                </button>
              )}
            </div>
          ) : (
            // Show Profile button and Payment button if authenticated
            <>
              <button
                onClick={handleProfileClick}
                className="bg-white text-blue-800 py-2 px-4 rounded hover:bg-gray-200 text-3xl"
              >
                Profile
              </button>
              {/* <button
                onClick={handlePaymentClick}
                className="bg-white text-blue-800 py-2 px-4 rounded hover:bg-gray-200 text-3xl"
              >
                Payment
              </button> */}
            </>
          )}
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        >
          <source
            src={myvideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center">
          {/* <h1 className="text-6xl font-bold mb-4">Welcome to TempleTrek</h1>
          <p className="text-2xl mb-6">Your gateway to spiritual journeys and temple visits.</p> */}
          {/* <Link
            to="about"
            smooth={true}
            duration={1000}
            className="bg-white text-blue-800 py-3 px-6 rounded hover:bg-gray-200 text-2xl cursor-pointer"
          >
            Learn More
          </Link> */}
        </div>
      </section>
    </div>
  );
}

export default Navbar;
