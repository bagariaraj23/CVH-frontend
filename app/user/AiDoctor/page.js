"use client";

import { useState, useEffect, useRef } from "react";

export default function CareValueHealth() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finalReport, setFinalReport] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hi, I'm your private doctor. Please tell me your age and gender to get started.",
    },
  ]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userInput, setUserInput] = useState("");

  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const setFinalReportByResult = (report) => {
    const repo = `Results:\n- Likely Conditions: ${report.responseSummary.likelyConditions}\n- Severity Level: ${report.responseSummary.severityLevel}\n- Next Steps: ${report.responseSummary.nextSteps}\n- Red Flag Symptoms: ${report.responseSummary.redFlagSymptoms}`;
    setFinalReport(repo);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", userInput);

      const res = await fetch("/api/openai", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.data);
      setFinalReportByResult(data.data);

      setChatMessages((prev) => [
        ...prev,
        { type: "user", text: userInput },
        { type: "bot", text: `Results:\n- Likely Conditions: ${data.data.responseSummary.likelyConditions}\n- Severity Level: ${data.data.responseSummary.severityLevel}\n- Next Steps: ${data.data.responseSummary.nextSteps}\n- Red Flag Symptoms: ${data.data.responseSummary.redFlagSymptoms}` },
      ]);
    } catch (err) {
      console.error("Error:", err.message);
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, an error occurred while processing your request. Please try again." },
      ]);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    if (!age.trim() || !gender.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", text: "Please provide both age and gender to proceed." },
      ]);
      setError("Please provide both age and gender.");
      return;
    }
    if (parseInt(age) < 18) {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, you must be at least 18 years old to use this service.",
        },
      ]);
      setError("Age must be 18 or older.");
      return;
    }

    setError("");
    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: `I am a ${age}-year-old ${gender}.` },
      {
        type: "bot",
        text: "Thank you! Let's proceed with the next steps. You can now ask me anything about your health.",
      },
    ]);
    setIsFormSubmitted(true);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    await handleSubmit();
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen text-black text-center"
      style={{
        background: "linear-gradient(to bottom, #FFDEFF, #A8C8FF)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full px-4 py-12 bg-gradient-to-b from-pink-100 to-blue-100">
        {/* Header Content */}
        <div className="max-w-screen-lg w-full text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Meet Your Personal AI Doctor
          </h1>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-700 mb-6">
            Fast. Free. Always Here for You.
          </h2>
          <p className="text-base lg:text-lg text-gray-700 font-medium mb-8">
            We've already empowered over <span className="font-bold text-gray-800">4,152,750</span> people to take control of their health. Now it's your turn.
          </p>
        </div>

        {/* Chat Section */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 flex flex-col my-12">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">
            Healthcare on Your Terms
          </h2>
          <p className="text-sm lg:text-lg text-gray-700 font-medium mb-6">
            <i>No Waiting Rooms. No Hassles. Just Quality Care.</i>
          </p>
          <p className="text-sm lg:text-lg text-gray-700 font-medium mb-6">
            <i>Tell us a bit about yourself to get started:</i>
          </p>

          {!isFormSubmitted && (
            <>
              <label
                htmlFor="age"
                className="block text-sm lg:text-base text-left mb-2 font-semibold"
              >
                Age (18+):
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError("");
                }}
                className="w-full border rounded-md p-2 mb-4 text-black"
                placeholder="Enter your age"
              />

              <label className="block text-sm lg:text-base text-left mb-2 font-semibold">
                Gender:
              </label>
              <div className="flex justify-center gap-4 mb-4">
                <label className="text-black flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setError("");
                    }}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="text-black flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setError("");
                    }}
                    className="mr-2"
                  />
                  Male
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-xs lg:text-sm mb-4">{error}</p>
              )}

              <button
                onClick={handleGetStarted}
                className="bg-[#12104A] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 w-full shadow-lg transform hover:scale-105 transition duration-200 mb-4 text-sm lg:text-base"
              >
                Get Started for Free
              </button>
              <p className="text-xs lg:text-sm text-gray-600">
                No payment required—start your free consultation now!
              </p>
            </>
          )}

          {isFormSubmitted && (
            <div className="overflow-y-auto max-h-96 space-y-2">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg shadow-md text-sm lg:text-base ${
                      message.type === "bot"
                        ? "bg-gray-200 text-black"
                        : "bg-indigo-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
          )}

          {isFormSubmitted && (
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleInputKeyPress}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black text-sm lg:text-base focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="ml-2 px-4 py-2 bg-[#12104A] text-white rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition duration-200 text-sm lg:text-base"
              >
                {loading ? "Processing..." : "Send"}
              </button>
            </div>
          )}
        </div>

        {/* Benefits List */}
        <ul className="text-sm lg:text-lg text-gray-700 font-medium mb-8 lg:mb-0 lg:mr-8 space-y-4 lg:w-1/2 text-left">
          <li>● Get Expert Health Advice Instantly</li>
          <li>● Consult Specialists at Your Convenience</li>
          <li>● Access Second Opinions Quickly and Privately</li>
          <li>● Use Our Symptom Checker Anytime, Anywhere</li>
        </ul>
      </div>
    </div>
  );
}
