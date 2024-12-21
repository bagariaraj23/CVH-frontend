"use client";
import React from "react";
import Link from "next/link";
import { FaRobot, FaStethoscope, FaUserShield, FaLock } from "react-icons/fa";

export const CoreServices = () => {
  return (
    <section className="py-20 text-gray-800 text-center bg-gradient-to-b from-[#A8C8FF] to-[#FFDEFF]">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#12104A]">
        Our Core Services
      </h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
        {/* Service 1: AI Doctor Consultations */}
        <div className="p-8 bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl duration-300 flex flex-col items-center">
          <FaRobot className="text-4xl text-[#12104A] mb-4" />
          <h3 className="text-2xl font-semibold mb-4 text-[#12104A]">
            AI Doctor Consultations
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            Get instant health guidance with our AI-powered doctor. Receive
            personalized answers to common health questions, symptom checks, and
            advice—all accessible for free or with advanced features.
          </p>
          <Link
            href="/user/AiDoctor"
            className="inline-block px-6 py-2 text-white bg-[#12104A] rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Try AI Doctor
          </Link>
        </div>

        {/* Service 2: Global Telemedicine */}
        <div className="p-8 bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl duration-300 flex flex-col items-center">
          <FaStethoscope className="text-4xl text-[#12104A] mb-4" />
          <h3 className="text-2xl font-semibold mb-4 text-[#12104A]">
            Global Telemedicine
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            Connect with licensed specialists through secure video or audio
            consultations. Our telemedicine service provides real-time access to
            medical professionals for expert advice from anywhere in the world.
          </p>
          <Link
            href="/user/consultSpecialist"
            className="inline-block px-6 py-2 text-white bg-[#12104A] rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Book a Specialist
          </Link>
        </div>

        {/* Service 3: Second Opinion Service */}
        <div className="p-8 bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl duration-300 flex flex-col items-center">
          <FaUserShield className="text-4xl text-[#12104A] mb-4" />
          <h3 className="text-2xl font-semibold mb-4 text-[#12104A]">
            Second Opinion Service
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            Gain peace of mind with an expert second opinion on critical health
            decisions. Our global network of specialists reviews cases and offers
            professional guidance for better decision-making.
          </p>
          <Link
            href="/second-opinion"
            className="inline-block px-6 py-2 text-white bg-[#12104A] rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Get a Second Opinion
          </Link>
        </div>

        {/* Service 4: Patient Portal */}
        <div className="p-8 bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl duration-300 flex flex-col items-center">
          <FaLock className="text-4xl text-[#12104A] mb-4" />
          <h3 className="text-2xl font-semibold mb-4 text-[#12104A]">
            Patient Portal
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            Access your health records, consultation history, and personalized
            insights all in one secure portal. Manage your health information
            conveniently and stay informed about your care journey.
          </p>
          <Link
            href="/user/patientPortal"
            className="inline-block px-6 py-2 text-white bg-[#12104A] rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Log in to Patient Portal
          </Link>
        </div>
      </div>
    </section>
  );
};
