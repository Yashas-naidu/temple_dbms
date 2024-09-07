import React from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-10 bg-blue-600 bg-opacity-70">
      <div className="text-9xl font-bold">TempleTrek.com</div>
      <div className="space-x-4 text-3xl">
        <Link to="home" smooth={true} duration={1000} className="hover:underline cursor-pointer">
          Home
        </Link>
        <Link to="features" smooth={true} duration={1000} className="hover:underline cursor-pointer">
          Bookings
        </Link>
        <Link to="events" smooth={true} duration={1000} className="hover:underline cursor-pointer">
          Events
        </Link>
        <Link to="donations" smooth={true} duration={1000} className="hover:underline cursor-pointer">
          Donations
        </Link>
        <Link to="contact" smooth={true} duration={1000} className="hover:underline cursor-pointer">
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
  );
};

export default Navbar;
