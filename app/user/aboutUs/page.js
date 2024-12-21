"use client";
import React from "react";
import Image from "next/image";
import aboutImage from "/public/img/young-female.jpg"; // Replace with your actual image path

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16 px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800">
            About Us
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-blue-600">
            CareValue: Transforming Healthcare in Nigeria
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Born amidst Lagos' vibrancy, Dr. Obi's journey from witnessing
            healthcare struggles in Nigeria to delivering advanced
            cardiovascular care in the United States ignited a mission.
            CareValue embodies this mission, aiming to uplift Nigerians through
            accessible, world-class healthcare.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our roots are deep in Nigeria's culture, but our standards soar at
            global heights. From telemedicine to specialized treatments, we
            bring international medical excellence right to your home,
            respecting local traditions along the way.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Join us in revolutionizing Nigerian healthcare. With CareValue,
            exceptional care is not a privilege but a standard for every
            Nigerian. Start your healthier tomorrow with us today.
          </p>

          <h3 className="text-xl lg:text-2xl font-bold text-blue-500">
            Our Mission: "Ilera Ni Wa" (Your Well-being is Our Priority)
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            At CareValue Health, we believe your well-being is paramount. That's
            why we put you at the heart of our mission. Our mission goes beyond
            simply providing healthcare. We strive to Empower, Heal, and Thrive
            alongside you. This commitment translates into three core pillars
            that guide everything we do:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li className="text-gray-700 text-lg">
              <strong>Patient-Centered Care:</strong> Accessible, top-tier
              medical care tailored to your unique needs and goals. We empower
              you to take control of your health through education, resources,
              and open communication.
            </li>
            <li className="text-gray-700 text-lg">
              <strong>Seamless Connectivity:</strong> We bridge the gap between
              you and expert care. Through telemedicine and a robust network of
              healthcare professionals, we ensure you receive the right care at
              the right time, no matter your location.
            </li>
            <li className="text-gray-700 text-lg">
              <strong>Thriving Community:</strong> Your well-being is our
              priority. We foster a supportive community that provides
              encouragement, resources, and access to valuable healthcare
              information. Here, you'll find support on your journey to a
              healthier you.
            </li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            This is more than a website; it's an invitation to a healthier
            tomorrow. Let's start your journey today.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Schedule Your Free Consultation
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={aboutImage}
            alt="CareValue Healthcare"
            layout="intrinsic"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
