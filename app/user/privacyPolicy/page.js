// pages/privacy.js
"use client";
import React from 'react';
import { FaUserShield, FaLock, FaClipboardList, FaRegEdit, FaGlobe, FaSyncAlt, FaHeadset } from 'react-icons/fa';

const privacySections = [
  {
    icon: <FaUserShield className="text-[#0d1945] text-3xl" />,
    title: "Information We Collect",
    items: [
      {
        subtitle: "Personal Information",
        text: "We collect personal data such as your name, address, contact information, and date of birth when you use CareValue Health.",
      },
      {
        subtitle: "Medical Information",
        text: "To provide healthcare services, we collect health-related data including medical history, prescription information, and records of consultations.",
      },
      {
        subtitle: "Usage Information",
        text: "We gather data about your interactions with our platform, including device information, log data, and location data if you use location-based services.",
      },
    ],
  },
  {
    icon: <FaLock className="text-[#0d1945] text-3xl" />,
    title: "How We Use Your Information",
    items: [
      {
        subtitle: "Medical Care",
        text: "Your data is used to provide healthcare services like telemedicine consultations, medical records management, and prescription services.",
      },
      {
        subtitle: "Improving Our Services",
        text: "We use your information to enhance our platform, personalize your experience, and improve our medical services.",
      },
      {
        subtitle: "Communication",
        text: "We may contact you for appointment reminders, updates, and important health-related information.",
      },
    ],
  },
  {
    icon: <FaClipboardList className="text-[#0d1945] text-3xl" />,
    title: "Data Sharing",
    items: [
      {
        subtitle: "Healthcare Providers",
        text: "We share your information with healthcare professionals to facilitate consultations and deliver medical services.",
      },
      {
        subtitle: "Third-Party Service Providers",
        text: "We engage trusted partners to support our operations, but they are only authorized to use your data as needed.",
      },
    ],
  },
  {
    icon: <FaRegEdit className="text-[#0d1945] text-3xl" />,
    title: "Data Security",
    items: [
      {
        subtitle: "Protection",
        text: "We implement strict security measures to safeguard your data from unauthorized access, disclosure, alteration, or destruction.",
      },
      {
        subtitle: "Access Control",
        text: "Access to your data is restricted to authorized personnel who are bound by confidentiality agreements.",
      },
    ],
  },
  {
    icon: <FaGlobe className="text-[#0d1945] text-3xl" />,
    title: "Your Choices",
    items: [
      {
        subtitle: "Access and Correction",
        text: "You can access, review, and correct your personal information in your account settings.",
      },
      {
        subtitle: "Opting Out",
        text: "You can opt out of non-essential communications, though certain communications related to your healthcare are necessary.",
      },
    ],
  },
  {
    icon: <FaSyncAlt className="text-[#0d1945] text-3xl" />,
    title: "Compliance with Laws",
    items: [
      {
        subtitle: "Legal Obligations",
        text: "We comply with all applicable healthcare and data protection laws in the USA and Nigeria.",
      },
    ],
  },
  {
    icon: <FaHeadset className="text-[#0d1945] text-3xl" />,
    title: "Contact Us",
    items: [
      {
        subtitle: "Support",
        text: "If you have questions about our privacy practices or need assistance, contact us at support@carevaluehealth.com.",
      },
    ],
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] to-[#f5f7fa] py-12 px-4 flex flex-col items-center text-[#0d1945]">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-[#1a237e]">Privacy Policy</h1>
      <p className="text-xl text-center max-w-2xl mb-12 text-gray-600">
        At CareValue Health, your privacy and the security of your personal information are our top priorities. This Privacy Policy outlines how we collect, use, share, and protect your data.
      </p>

      <div className="w-full max-w-4xl space-y-10">
        {privacySections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition-transform duration-150 hover:scale-105"
          >
            <div className="flex items-center mb-4">
              {section.icon}
              <h2 className="text-2xl font-semibold ml-3">{section.title}</h2>
            </div>
            <div className="space-y-4 ml-8">
              {section.items.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-[#1a237e]">{item.subtitle}</h3>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="text-center text-gray-700 mt-16">
          <p>Your trust is essential to us. We take every measure to protect your privacy and ensure confidentiality.</p>
          <p className="mt-4 font-bold text-[#1a237e]">Thank you for choosing CareValue Health.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
