import React from "react";
import '../App.css';
import '@fontsource/bebas-neue'; // Defaults to weight 400
import About from "../components/about";
import Navbar from "../components/navbar";
import Booking from "../components/booking";
import Donation from "../components/Donation";
import Contact from "../components/contact";
import Event from "../components/event";
import Footer from "../components/footer";


function Landingpage(){
  return(
    <div className="relative min-h-screen bg-blue-600 text-white">
      <Navbar/>
      <About/>
      <Booking/>
      <Event/>
      <Donation/>
      <Contact/>
      <Footer/>
    </div>
  );

}

export default Landingpage;