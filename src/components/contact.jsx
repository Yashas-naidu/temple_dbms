import React from "react";
import "../App.css"

function Contact(){
    return(
      <section id="contact" className="min-h-screen bg-white text-blue-800 flex items-center justify-center">
      <div className="max-w-2xl text-center p-10">
        <h2 className="text-5xl font-bold mb-6">Contact Us</h2>
        <p className="text-2xl mb-6">For any inquiries, feedback, or support, feel free to reach out to us:</p>
        <p className="text-2xl font-bold mt-4">support@templetrek.com</p>
        <p className="text-2xl mt-2">We aim to respond to all queries within 24 hours.</p>
      </div>
    </section>
    );
}

export default Contact;