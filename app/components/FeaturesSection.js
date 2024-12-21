// components/FeaturesSection.js
"use client";

import React, { useState } from "react";
import { FeatureCard } from "./FeatureCard";
import { FaCalendarAlt, FaClipboard, FaCreditCard, FaUsers, FaMagic } from "react-icons/fa";

// Image sources (replace these with actual image URLs)
const images = [
  "/img/88866f193793211.65f301b7f09f8_430x.gif",
  "/img/CVH-03-24-06-02_430x.png",
  "/img/CVH-03-24-007.jpg",
  "/img/Screenshot_2024-06-23_at_10.58.32_PM_430x.png",
  "/img/SCREEN-CVH_430x.png"
  
];
export const FeaturesSection = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const features = [
    {
      icon: <FaCalendarAlt className="text-2xl text-white" />,
      title: "Easy scheduling",
      description: "Accept online bookings. Automate your reminders.",
      image: images[0],
    },
    {
      icon: <FaClipboard className="text-2xl text-white" />,
      title: "Best documentation",
      description: "Streamline your intake, note-taking, and documentation.",
      image: images[1],
    },
    {
      icon: <FaCreditCard className="text-2xl text-white" />,
      title: "Secure billing & payments",
      description: "Simple, fast, and digital.",
      image: images[2],
    },
    {
      icon: <FaUsers className="text-2xl text-white" />,
      title: "Professional client portal",
      description: "Seamless care with an easy-to-use client app.",
      image: images[3],
    },
    {
      icon: <FaMagic className="text-2xl text-white" />,
      title: "Powerful AI & automations",
      description: "Reduce busy work so you can do your best work.",
      image: images[4],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10 px-8 py-12 bg-[#12104A]">
      {/* Left Side - Feature Cards */}
      <div className="flex flex-col w-full md:w-1/2">
        <h2 className="text-4xl font-bold text-white mb-6">
        Why Choose CareValue Health?
        </h2>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            onHover={() => setCurrentImage(feature.image)}
          />
        ))}
      </div>

      {/* Right Side - Image Display */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={currentImage}
          alt="Feature Display"
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};
