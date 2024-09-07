import React from "react";
import { Link } from "react-scroll";

const HomeSection = () => {
  return (
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
  );
};

export default HomeSection;
