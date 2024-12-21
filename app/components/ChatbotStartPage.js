"use client";
import React, { useState } from "react";
import Image from "next/image";

const ChatbotStartPage = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleStartChat = () => {
    if (age && gender) {
      alert(`Starting chat for a ${age}-year-old ${gender}`);
    } else {
      alert("Please enter your age and select your gender to get started.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Image Grid */}
      <div className="w-full max-w-md overflow-hidden bg-white shadow-xl mb-6 rounded-lg">
        <div className="grid grid-cols-3 gap-0">
          <Image src="/img/th1.jpg" alt="Person 1" width={80} height={80} className="object-cover" />
          <Image src="/img/th2.jpg" alt="Person 2" width={80} height={80} className="object-cover" />
          <Image src="/img/th3.jpg" alt="Person 3" width={80} height={80} className="object-cover" />
          <Image src="/img/th4.jpg" alt="Person 4" width={80} height={80} className="object-cover" />
          <Image src="/img/th5.jpg" alt="Person 5" width={80} height={80} className="object-cover" />
          <Image src="/img/th6.jpg" alt="Person 6" width={80} height={80} className="object-cover" />
        </div>
        <div className="p-6">
          <p className="text-center text-gray-700 font-medium">
            My service is completely free and private. I've already helped over 3,545,439 chats! I can even arrange an
            online visit with a top-tier doctor if needed.
          </p>
        </div>
      </div>

      {/* Instruction Section */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg text-center mb-4">
        <p className="text-gray-700 font-medium">
          Please tell me your age and biological sex to get started.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-4 flex flex-col gap-4 items-center">
        <div className="flex gap-4">
          <input
            type="number"
            min="1"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg p-2 text-center outline-none focus:ring focus:ring-blue-200"
          />
          <button
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              gender === "Female" ? "bg-[#b39ddb] text-black" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleGenderChange("Female")}
          >
            Female
          </button>
          <button
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              gender === "Male" ? "bg-[#b39ddb] text-black" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleGenderChange("Male")}
          >
            Male
          </button>
        </div>
      </div>

      {/* Start Button */}
      <button
        className="w-full max-w-md mt-6 py-3 bg-[#3f51b5] text-white rounded-lg font-medium text-lg shadow-lg hover:bg-[#303f9f] transform hover:scale-105 transition-all duration-300"
        onClick={handleStartChat}
      >
        Get Started
      </button>

      {/* HIPAA Compliant Label */}
      <p className="mt-2 text-gray-500 text-sm">
        <span role="img" aria-label="lock">
          🔒
        </span>{" "}
        CareValue Health
      </p>
    </div>
  );
};

export default ChatbotStartPage;
