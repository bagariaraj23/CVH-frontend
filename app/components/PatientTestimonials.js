"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    text: "My clients love the client portal.",
    name: "Aegeus Luca",
    role: "Health Coach",
    image: "/img/pexels-laura-james-6098057.jpg" // Replace with the actual image path
  },
  {
    text: "My team loves how easy it is to manage appointments.",
    name: "Andrea Magnus",
    role: "Practice Manager",
    image: "/img/blog3.jpg" // Replace with the actual image path
  },
  {
    text: "I have found it very useful for my practice.",
    name: "David Smith",
    role: "General Practitioner",
    image: "/img/SCREEN-CVH_430x.png" // Replace with the actual image path
  }
];

export const PatientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50 text-gray-800 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#12104A]">What Our Patients Are Saying</h2>
      
      <div className="relative max-w-3xl mx-auto px-6 overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            x: { type: "tween", duration: 0.8, ease: "easeInOut" }
          }}
          className="p-8 bg-white rounded-xl shadow-lg min-w-full flex flex-col items-center"
        >
          {/* Testimonial Image */}
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-[#A8C8FF]">
            <Image
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          {/* Testimonial Content */}
          <p className="text-xl font-semibold text-[#12104A] mb-4">"{testimonials[currentIndex].text}"</p>
          <p className="text-lg font-bold text-gray-900">{testimonials[currentIndex].name}</p>
          <span className="text-sm text-gray-500 bg-gray-200 rounded-full px-2 py-1">
            {testimonials[currentIndex].role}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
