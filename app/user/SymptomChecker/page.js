"use client";
import React, { useState } from "react";

export default function SymptomChecker() {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [addedSymptoms, setAddedSymptoms] = useState([]);
  const [searchText, setSearchText] = useState("");

  const bodyParts = {
    head: ["Headache", "Dizziness", "Blurred vision"],
    chest: ["Chest pain", "Shortness of breath", "Cough"],
    stomach: ["Stomach ache", "Nausea", "Vomiting"],
    legs: ["Leg pain", "Swelling", "Numbness"],
  };

  const handleBodyPartClick = (part) => {
    setSelectedBodyPart(part);
  };

  const handleAddSymptom = (symptom) => {
    if (!addedSymptoms.includes(symptom)) {
      setAddedSymptoms((prev) => [...prev, symptom]);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold">CareValue Health Symptom Checker</h1>
          <button
            onClick={() => {
              setAddedSymptoms([]);
              setSelectedBodyPart(null);
              setSearchText("");
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Restart ↺
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Search Symptoms */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Search Symptoms</h2>
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search symptoms..."
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="border rounded px-3 py-2">
              {selectedBodyPart && bodyParts[selectedBodyPart]
                ? bodyParts[selectedBodyPart]
                    .filter((symptom) =>
                      symptom.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((symptom, index) => (
                      <p
                        key={index}
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => handleAddSymptom(symptom)}
                      >
                        {symptom}
                      </p>
                    ))
                : "No Symptoms Found."}
            </div>
          </div>

          {/* Body Map */}
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Body Map</h2>
            <p className="text-sm text-gray-600 mb-4">
              Click on a body part to filter symptoms.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 500"
              className="w-full max-w-sm mx-auto cursor-pointer"
            >
              {/* Head */}
              <circle
                cx="100"
                cy="50"
                r="30"
                fill={selectedBodyPart === "head" ? "lightblue" : "gray"}
                onClick={() => handleBodyPartClick("head")}
              />
              {/* Chest */}
              <rect
                x="70"
                y="90"
                width="60"
                height="80"
                fill={selectedBodyPart === "chest" ? "lightblue" : "gray"}
                onClick={() => handleBodyPartClick("chest")}
              />
              {/* Stomach */}
              <rect
                x="70"
                y="180"
                width="60"
                height="60"
                fill={selectedBodyPart === "stomach" ? "lightblue" : "gray"}
                onClick={() => handleBodyPartClick("stomach")}
              />
              {/* Legs */}
              <rect
                x="70"
                y="250"
                width="25"
                height="100"
                fill={selectedBodyPart === "legs" ? "lightblue" : "gray"}
                onClick={() => handleBodyPartClick("legs")}
              />
              <rect
                x="105"
                y="250"
                width="25"
                height="100"
                fill={selectedBodyPart === "legs" ? "lightblue" : "gray"}
                onClick={() => handleBodyPartClick("legs")}
              />
            </svg>
          </div>

          {/* Added Symptoms */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Added Symptoms</h2>
            <div className="border rounded px-3 py-2 mb-4">
              {addedSymptoms.length ? (
                addedSymptoms.map((symptom, index) => (
                  <p key={index} className="flex justify-between items-center">
                    {symptom}
                  </p>
                ))
              ) : (
                <p className="text-gray-600">Begin by adding a symptom.</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                How long have you been sick? (optional)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 mr-2"
                />
                <span>Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
