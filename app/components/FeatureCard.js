// components/FeatureCard.js
"use client";
import React from "react";

export const FeatureCard = ({ icon, title, description, onHover }) => {
  return (
    <div
      onMouseEnter={onHover}
      className="flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 bg-[#12104A] hover:bg-[#2E2C72] hover:shadow-lg"
    >
      <div className="w-10 h-10 flex items-center justify-center text-white mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <p className="text-white text-opacity-80">{description}</p>
      </div>
    </div>
  );
};
