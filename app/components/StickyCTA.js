"use client";
import React from "react";
import Link from "next/link";

export const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#12104A] to-[#083e9a] text-white py-3 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      {/* CTA Button */}
      <div className="flex flex-col md:flex-row items-center md:space-x-6">
        <Link
          href="/user/AiDoctor"
          className="px-5 py-2 bg-white text-[#12104A] font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Get Started for Free
        </Link>
        <p className="mt-2 md:mt-0 text-sm md:text-base text-center md:text-left">
          No payment required, start your free consultation now!
        </p>
      </div>
    </div>
  );
};
