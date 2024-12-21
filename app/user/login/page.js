"use client";
import { useState } from 'react';

export default function CareValueHealth() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!age || !gender) {
      setError('Please provide both age and gender.');
      return;
    }
    if (parseInt(age) < 18) {
      setError('Age must be 18 or older.');
      return;
    }

    setError('');
    // Pass age and gender to chatbot or API
    console.log('Age:', age, 'Gender:', gender);
    alert(`Starting chatbot for Age: ${age}, Gender: ${gender}`);
  };

  return (
    <div className="flex flex-col   items-center justify-center min-h-screen bg-gradient-to-b text-black text-center">
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'black' }}>
        Hi, I'm CareValue, your private and personal AI doctor.
      </h1>
      <p className="text-lg mb-2">As an AI doctor, my service is fast and free.</p>
      <p className="text-lg mb-4">I've already helped people in 4,109,128 chats!</p>
      <p className="text-md mb-8">When we're done, you can have a video visit with a top doctor for $29.</p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <label htmlFor="age" className="block text-left mb-2 font-semibold">Age (18+)</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded-md p-2 mb-4 text-black"
          placeholder="Enter your age"
        />

        <label className="block text-left mb-2 font-semibold">Gender</label>
        <div className="flex justify-center gap-4 mb-4">
          <label className="text-black">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
              className="mr-2"
            />
            Female
          </label>
          <label className="text-black">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
              className="mr-2"
            />
            Male
          </label>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Get Started
        </button>

        <p className="text-sm mt-4 text-gray-600">HIPAA compliant and anonymous</p>
      </div>
    </div>
  );
}
