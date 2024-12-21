"use client";
import React from "react";
import { FaCalendarCheck, FaFileAlt, FaLock, FaUserCircle, FaRobot } from "react-icons/fa";

export const ServicesOverview = () => {
  const services = [
    {
      icon: <FaCalendarCheck className="text-3xl text-[#A8C8FF]" />,
      title: "Easy Scheduling",
      description: "Accept online bookings with automated reminders."
    },
    {
      icon: <FaFileAlt className="text-3xl text-[#A8C8FF]" />,
      title: "Best Documentation",
      description: "Streamline intake, note-taking, and documentation."
    },
    {
      icon: <FaLock className="text-3xl text-[#A8C8FF]" />,
      title: "Secure Billing & Payments",
      description: "Simple, fast, and digital payment solutions."
    },
    {
      icon: <FaUserCircle className="text-3xl text-[#A8C8FF]" />,
      title: "Professional Client Portal",
      description: "Seamless care with an easy-to-use portal."
    },
    {
      icon: <FaRobot className="text-3xl text-[#A8C8FF]" />,
      title: "Powerful AI & Automations",
      description: "Reduce busy work so you can focus on your health."
    }
  ];

  return (
    <section className="py-20 bg-white text-gray-800 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#12104A]">Why Choose CareValue Health?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto px-6">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            {service.icon}
            <h3 className="text-xl font-semibold text-[#12104A] mt-4 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
