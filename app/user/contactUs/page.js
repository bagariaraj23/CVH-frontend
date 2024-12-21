// pages/contact.js
"use client";
import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-[#0d1945] py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Have a question?</h1>
      <p className="text-lg mb-10 text-center max-w-xl">
        Get in touch below, and one of our friendly team members will be in contact.
      </p>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-5xl">
        
        {/* Contact Form */}
        <div className="bg-blue-100 w-full max-w-lg p-8 rounded-lg shadow-lg lg:mb-0">
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-grow bg-white text-[#0d1945] p-3 rounded-full w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#0d1945]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-grow bg-white 100 text-[#0d1945] p-3 rounded-full w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#0d1945]"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="bg-white 100 text-[#0d1945] p-3 rounded-full w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1945]"
          />
          <input
            type="text"
            placeholder="Company Name"
            className="bg-white 100 text-[#0d1945] p-3 rounded-full w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1945]"
          />
          <textarea
            placeholder="Your Message"
            className="bg-white 100 text-[#0d1945] p-3 rounded-lg w-full h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0d1945] resize-none"
          ></textarea>
          <button className="bg-[#0d1945] text-white py-3 px-8 rounded-full hover:bg-[#141a3e] transition">
            Send Message
          </button>
        </div>

        {/* Contact Information */}
        <div className="text-left lg:mt-0 w-full max-w-lg">
          <h2 className="text-3xl font-semibold mb-6">Contact us</h2>

          <p className="font-semibold mb-1">E-mail</p>
          <p className="mb-4">contact@carevaluehealth.com</p>

          <p className="font-semibold mb-1">Phone</p>
          <p>WhatsApp: +234 805 809 5803, +18433236616</p>
          <p>Phone: +234 805 809 5803</p>
          <p className="mb-4">Phone: +13074756005</p>

          <p className="font-semibold mb-1">Address</p>
          <p>14A Trem Close, Off Chevron Alternative Lekki 106104, Lagos, Nigeria</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
