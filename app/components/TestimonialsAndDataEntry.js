"use client";
import React, { useState } from "react";
import Image from "next/image";

export const TestimonialsAndDataEntry = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleGetStarted = () => {
    if (!age || !gender) {
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", text: "Please provide both your age and biological sex to continue." },
      ]);
      return;
    }

    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: `I am a ${age}-year-old ${gender}.` },
    ]);

    setChatMessages((prev) => [
      ...prev,
      { type: "bot", text: `Thank you! Let's proceed with the next steps based on your profile.` },
    ]);

    setFormSubmitted(true);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setChatMessages((prev) => [...prev, { type: "user", text: userInput }]);

    setChatMessages((prev) => [
      ...prev,
      { type: "bot", text: `You said: "${userInput}". How can I assist you further?` },
    ]);

    setUserInput("");
  };

  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-y-8 lg:gap-y-0 px-4 sm:px-8 md:px-16 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white min-h-[85vh]">
      {/* Chatbot Section (Left Side, 60% Width) */}
      <div className="w-full lg:w-2/4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
        <div className="w-full bg-white border border-gray-300 rounded-lg shadow-lg p-6 h-[65vh] lg:h-[75vh] flex flex-col">
          <div className="bg-[#12104A] text-white text-lg font-bold rounded-t-md px-4 py-3 flex justify-between items-center">
            <span>Chat with Us</span>
            <span className="bg-white text-[#12104A] rounded-full px-2 py-1 text-sm">Live</span>
          </div>
          <div className="flex-grow overflow-auto p-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.type === "bot" ? "bg-gray-100" : "bg-blue-100 text-right"
                } p-3 rounded-lg shadow-sm text-gray-800 mb-2`}
              >
                <span className="font-medium">
                  {message.type === "bot" ? "Bot:" : "You:"}
                </span>{" "}
                {message.text}
              </div>
            ))}

            {!formSubmitted && (
              <>
                <div>
                  <label htmlFor="age" className="block text-base md:text-lg font-medium text-gray-900">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                </div>

                <div>
                  <label className="block text-base md:text-lg font-medium text-gray-700">
                    Biological Sex
                  </label>
                  <div className="flex text-black space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={() => setGender("Male")}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={() => setGender("Female")}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="w-full px-6 py-3 text-white bg-[#12104A] rounded-full shadow-lg hover:bg-blue-700 transition duration-300 mt-4"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
          {formSubmitted && (
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-[#12104A]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="ml-2 px-4 py-2 bg-[#12104A] text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials Section (Right Side, 40% Width) */}
      <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight">
          Loved by Our Users
        </h2>
        <p className="text-sm md:text-lg font-medium text-gray-600">
          Trusted by over <span className="text-blue-600">1.5 million users</span>. 100% private,
          secure, and here to connect you with top-tier doctors.
        </p>

        <div className="flex space-x-4 sm:space-x-6">
          <Image
            src="/img/th1.jpg"
            alt="User 1"
            width={80}
            height={80}
            className="max-w-[80px] sm:max-w-[100px] rounded-full shadow-lg border-4 border-[#b3e5fc] transform hover:scale-110 transition-transform duration-300"
          />
          <Image
            src="/img/th4.jpg"
            alt="User 2"
            width={80}
            height={80}
            className="max-w-[80px] sm:max-w-[100px] rounded-full shadow-lg border-4 border-[#9fa8da] transform hover:scale-110 transition-transform duration-300"
          />
          <Image
            src="/img/th6.jpg"
            alt="User 3"
            width={80}
            height={80}
            className="max-w-[80px] sm:max-w-[100px] rounded-full shadow-lg border-4 border-[#b39ddb] transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6 space-y-4">
          <p className="text-sm md:text-base font-medium text-gray-700">
            “This platform has completely transformed the way I interact with my doctor. It's seamless,
            secure, and incredibly user-friendly.”
          </p>
          <p className="text-xs sm:text-sm font-bold text-blue-600">- Maria Gonzalez</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 bg-[#AA90F1] text-[#3A3A5A] font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            HIPAA-Compliant
          </div>
          <div className="px-4 py-2 bg-[#bff9fd] text-[#3A3A5A] font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            Trusted Worldwide
          </div>
        </div>
      </div>
    </section>
  );
};
