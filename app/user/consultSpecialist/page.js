"use client";
import React from "react";
import Image from "next/image";
import { FaUserMd, FaVideo, FaCalendarAlt } from "react-icons/fa";

const SpecialistConsultation = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-[#0d1945]">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] bg-gradient-to-r from-[#A8C8FF] to-[#FFDEFF] flex items-center justify-center">
        <div className="text-center text-[#0d1945] max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-4">Specialist Consultation</h1>
          <p className="text-lg">
            Connect with global specialists and access telemedicine options for personalized medical advice. 
            We bridge the gap between self-service and expert consultations to provide you with the support you need.
          </p>
          <button className="mt-6 px-8 py-3 bg-white text-[#1a237e] font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Book Your Consultation
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-semibold text-center mb-12">Our Telemedicine Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Video Consultation */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
            <FaVideo className="text-4xl text-[#1a237e] mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-center mb-4">Video Consultation</h3>
            <p className="text-gray-600 text-center">
              Schedule a secure video call with a specialist. Get face-to-face guidance on your health concerns from anywhere.
            </p>
          </div>

          {/* Card 2: In-depth Medical Advice */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
            <FaUserMd className="text-4xl text-[#1a237e] mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-center mb-4">In-depth Medical Advice</h3>
            <p className="text-gray-600 text-center">
              Receive expert medical advice tailored to your specific needs from our network of global healthcare professionals.
            </p>
          </div>

          {/* Card 3: Flexible Appointment Scheduling */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
            <FaCalendarAlt className="text-4xl text-[#1a237e] mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-center mb-4">Flexible Appointment Scheduling</h3>
            <p className="text-gray-600 text-center">
              Choose from a variety of available times to schedule a consultation that suits your schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#12104A] py-16 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-8">Why Choose Our Specialist Consultation?</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex items-start">
              <FaUserMd className="text-2xl text-white mr-4" />
              <span>Access to world-renowned specialists and experts in various fields of medicine.</span>
            </li>
            <li className="flex items-start">
              <FaVideo className="text-2xl text-white mr-4" />
              <span>Convenient telemedicine options including video and audio consultations.</span>
            </li>
            <li className="flex items-start">
              <FaCalendarAlt className="text-2xl text-white mr-4" />
              <span>Flexible scheduling to fit your needs, ensuring timely medical support.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="flex flex-col items-center py-16 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-4 text-center">Ready to Connect with a Specialist?</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8">
          Schedule a consultation today and get expert guidance for your health concerns.
        </p>
        <button className="px-8 py-3 bg-[#1a237e] text-white font-semibold rounded-full shadow-lg hover:bg-[#0d1945] transition duration-300">
          Book Your Consultation
        </button>
      </div>
    </div>
  );
};

export default SpecialistConsultation;
