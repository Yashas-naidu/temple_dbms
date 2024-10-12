import React from "react";
import "../App.css"


function About(){
  return(
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
  );
}

export default About;