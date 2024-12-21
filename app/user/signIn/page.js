"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="w-80 h-80 bg-blue-300 opacity-30 rounded-full blur-3xl absolute top-10 left-10"></div>
        <div className="w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-2xl absolute bottom-20 right-20"></div>
      </div>

      {/* Signup Form Container */}
      <div className="relative z-10 max-w-md w-full bg-white shadow-2xl rounded-lg p-8 space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#12104A]">
          Create Your Account
        </h1>
        <p className="text-gray-600 text-center">
          Join us and start your healthcare journey today.
        </p>

        {/* Signup Form */}
        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <div className="relative mt-1">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <div className="relative mt-1">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="password"
                id="confirm-password"
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#12104A] hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/user/login" className="text-[#12104A] font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
