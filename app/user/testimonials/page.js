"use client";
import React from 'react';

const testimonials = [
  {
    text: "The response time was very fast, and the service was good. I was attended to well and loved your service. Please keep it up. Thank you.",
    author: "Abebor N.",
    date: "April 2, 2024",
  },
  {
    text: "It was a good idea to come to CareValue Health in the first place. Meeting wonderful nurses with good customer service. My experience at CareValue Health was fantastic.",
    author: "Kennedy C.",
    date: "March 25, 2024",
  },
  {
    text: "With the way I was attended to, I would be visiting CareValue Health again. My experience with them was excellent. It is a good hospital to visit whenever one needs medical attention.",
    author: "Adedokun A.",
    date: "February 2, 2024",
  },
  {
    text: "The friendliness of both nurses and the doctor in CareValue Health is second to none. They make their patients feel welcome. Great and exceptional service.",
    author: "Wada J.",
    date: "March 28, 2024",
  },
  {
    text: "From my perspective, the test analysis conducted was satisfactory. You guys are doing a commendable job. Additionally, I noticed that the interior of the building is wonderfully constructed and rebranded, with excellent testing equipment such as blood pressure machines and sugar testing systems, among others. Please continue your efforts. The doctors are highly trained in their profession and are also performing admirably. Keep it up the good work! May God bless you all.",
    author: "Godwin N.",
    date: "April 9, 2024",
  },
  {
    text: "The reception time was very good, and the workers were fantastic. The ambience is great for medical wellness. I rate this facility above 90%.",
    author: "Benjamin O.",
    date: "March 26, 2024",
  },
];

const Testimonials = () => {
  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-900">Voices of Wellness</h1>
      <p className="text-lg text-center max-w-2xl mb-10 text-gray-700">
        Real Stories from CareValue Health Champions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {/* Profile Icon Placeholder */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex justify-center items-center">
                <span className="text-lg font-bold text-blue-900">{testimonial.author?.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-blue-900">{testimonial.author || "Anonymous"}</p>
                {testimonial.date && (
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                )}
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="italic text-gray-800">“{testimonial.text}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
