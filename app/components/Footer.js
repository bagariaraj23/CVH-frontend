"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#A8C8FF] to-[#FFDEFF] flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-20 py-12 text-gray-700">
        {/* Footer Logo and Contact Information */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-1/3">
          <Image
            src="/img/CVH.png" // Path to your logo image in the public/img folder
            alt="CareValue Health Logo"
            width={150}
            height={150}
            className="object-contain mb-4"
          />
          <p className="text-sm text-center md:text-left">
            Email: <a href="mailto:support@carevaluehealth.com" className="hover:underline">support@carevaluehealth.com</a>
          </p>
          <p className="text-sm text-center md:text-left">
            Phone: <a href="tel:+15551234567" className="hover:underline">+1 (555) 123-4567</a>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 text-center text-sm font-medium text-gray-700 w-full md:w-1/3 mb-6 md:mb-0">
          <Link href="/user/privacyPolicy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/user/termsAndServices" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/user/aboutUs" className="hover:underline">
            About Us
          </Link>
          <Link href="/user/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/user/contactUs" className="hover:underline">
            Contact Us
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 text-gray-700 w-full md:w-1/3">
          <Link href="https://facebook.com" target="_blank" className="text-2xl hover:text-[#12104A]">
            <FaFacebook />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="text-2xl hover:text-[#12104A]">
            <FaInstagram />
          </Link>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="w-full text-center py-4 text-sm text-gray-700 border-t border-gray-300">
        © 2024 CareValue Health. All rights reserved.
      </div>
    </footer>
  );
};
