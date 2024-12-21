"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment via this link, WhatsApp, by calling our office, or by visiting our clinic in person.",
    linkText: "Message us on WhatsApp",
    linkUrl: "#",
  },
  {
    question: "What services does CareValue Health offer?",
    answer: "We offer a wide range of healthcare services including specialization like pediatrics, obstetrics, cardiology, and mental health services. Our services are delivered via physical and virtual consultations. You can explore our family plans and monthly packages here.",
  },
  {
    question: "How quick is the turnaround time to see a doctor?",
    answer: "We deliver on our promise! You'll be connected to a doctor within 24 hours, whether you choose a virtual consultation or an in-clinic appointment. Schedule at your convenience and experience seamless access to quality healthcare.",
  },
  {
    question: "How do I locate your clinic?",
    answer: "Please search for 'CareValue Health' on Google Maps. You can also contact our front desk for directions: +234 805 809 5803.",
  },
  {
    question: "What should I bring for my appointment?",
    answer: "Please bring any relevant medical records, a list of current medications, and identification. This will help our healthcare providers to give you the best possible care.",
  },
  {
    question: "Can I receive health advice over the phone or online?",
    answer: "Yes, we offer virtual consultation services where you can receive health advice from our doctors and nurses over the phone or online. This service is designed to make healthcare more accessible and convenient for you.",
    linkText: "virtual consultation services",
    linkUrl: "#",
  },
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/img/CVH-MANUAL_page-0004.jpg" // Path to your background image in the public folder
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-70"
        />
      </div>

      {/* FAQ Section Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-[#12104A] mb-8">FAQs</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                onClick={() => handleToggle(index)}
                className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-800 hover:text-[#12104A] focus:outline-none"
              >
                <span className="flex items-center">
                  <FaQuestionCircle className="text-[#A8C8FF] mr-2 text-xl" /> {faq.question}
                </span>
                <span className="text-[#A8C8FF]">{activeIndex === index ? "▲" : "▼"}</span>
              </button>
              {activeIndex === index && (
                <div className="mt-3 text-gray-700 pl-8">
                  <p>{faq.answer}</p>
                  {faq.linkText && (
                    <a href={faq.linkUrl} className="text-[#12104A] underline hover:text-[#A8C8FF]">
                      {faq.linkText}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schedule Consultation Button */}
        <div className="mt-10 flex justify-center">
          <button className="px-6 py-3 bg-[#12104A] text-white font-semibold rounded-full hover:bg-[#A8C8FF] transition duration-200 shadow-md">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
