"use client";
import React from "react";
import { FaRegFileAlt, FaHistory, FaStethoscope, FaCalendarAlt, FaClipboardList, FaFileMedical } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const PatientPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-[#0d1945]">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] bg-gradient-to-r from-[#A8C8FF] to-[#FFDEFF] flex items-center justify-center">
        <div className="text-center text-[#0d1945] max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-4" aria-label="Patient Portal Heading">Patient Portal</h1>
          <p className="text-lg">
            Your health journey all in one place. Access your health records, view consultation history, and receive personalized recommendations.
          </p>
          <button
            className="mt-6 px-8 py-3 bg-white text-[#1a237e] font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            aria-label="Log In to Your Patient Portal"
          >
            Log In to Your Portal
          </button>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#0d1945]">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Link 1: Medical Records */}
          <Tooltip title="Access your medical records" placement="top" arrow>
            <a href="/medical-records" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center text-center">
              <FaFileMedical className="text-4xl text-[#1a237e] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Medical Records</h3>
              <p className="text-sm text-gray-600">Easily view your medical history, including test results and treatment plans.</p>
            </a>
          </Tooltip>

          {/* Link 2: Upcoming Appointments */}
          <Tooltip title="View your upcoming appointments" placement="top" arrow>
            <a href="/upcoming-appointments" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center text-center">
              <FaCalendarAlt className="text-4xl text-[#1a237e] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Appointments</h3>
              <p className="text-sm text-gray-600">Stay on top of your health with reminders for all upcoming appointments.</p>
            </a>
          </Tooltip>

          {/* Link 3: Previous Consultations */}
          <Tooltip title="Check your previous consultations" placement="top" arrow>
            <a href="/consultation-history" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center text-center">
              <FaClipboardList className="text-4xl text-[#1a237e] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Consultations</h3>
              <p className="text-sm text-gray-600">Review notes and summaries from past consultations to track progress.</p>
            </a>
          </Tooltip>
        </div>
      </div>

      {/* Portal Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-semibold text-center mb-12">Your Personal Health Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Health Records */}
          <Tooltip title="Access your medical history, test results, and treatment plans anytime, anywhere." placement="top" arrow>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
              <FaRegFileAlt className="text-4xl text-[#1a237e] mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-center mb-4">Health Records</h3>
              <p className="text-gray-600 text-center">
                Access your medical history, test results, and treatment plans anytime, anywhere.
              </p>
            </div>
          </Tooltip>

          {/* Card 2: Consultation History */}
          <Tooltip title="View past consultations and follow-up notes from healthcare providers." placement="top" arrow>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
              <FaHistory className="text-4xl text-[#1a237e] mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-center mb-4">Consultation History</h3>
              <p className="text-gray-600 text-center">
                View past consultations and follow-up notes from healthcare providers.
              </p>
            </div>
          </Tooltip>

          {/* Card 3: Personalized Recommendations */}
          <Tooltip title="Receive tailored recommendations for diet, exercise, and health maintenance." placement="top" arrow>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
              <FaStethoscope className="text-4xl text-[#1a237e] mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-center mb-4">Personalized Recommendations</h3>
              <p className="text-gray-600 text-center">
                Receive recommendations tailored to your health needs, from diet to exercise.
              </p>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="flex flex-col items-center py-16 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-4 text-center">Ready to Access Your Health Journey?</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8">
          Log in to view your health records, track your progress, and receive personalized care guidance.
        </p>
        <button
          className="px-8 py-3 bg-[#1a237e] text-white font-semibold rounded-full shadow-lg hover:bg-[#0d1945] transition duration-300"
          aria-label="Log In to Access Your Health Journey"
        >
          Log In to Patient Portal
        </button>
        <p className="text-gray-500 text-sm mt-4">
          New user? <a href="/user/register" className="text-[#1a237e] hover:underline">Sign up</a> for access.
        </p>
      </div>
    </div>
  );
};

export default PatientPortal;
