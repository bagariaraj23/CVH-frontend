'use client';

import { useState } from 'react';

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      patient: 'Alice Johnson',
      feedback: 'Excellent service and friendly staff.',
      rating: 5,
      date: '2024-11-19',
    },
    {
      id: 2,
      patient: 'Bob Smith',
      feedback: 'Waiting time was too long.',
      rating: 2,
      date: '2024-11-18',
    },
    {
      id: 3,
      patient: 'Charlie Davis',
      feedback: 'Great facilities and efficient processes.',
      rating: 4,
      date: '2024-11-17',
    },
  ]);

  const [newFeedback, setNewFeedback] = useState({
    patient: '',
    feedback: '',
    rating: 5,
  });

  const addFeedback = () => {
    if (newFeedback.patient && newFeedback.feedback) {
      const feedback = {
        id: feedbacks.length + 1,
        patient: newFeedback.patient,
        feedback: newFeedback.feedback,
        rating: newFeedback.rating,
        date: new Date().toISOString().split('T')[0],
      };
      setFeedbacks([...feedbacks, feedback]);
      setNewFeedback({ patient: '', feedback: '', rating: 5 });
    }
  };

  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Patient Feedback</h2>
      {/* Add Feedback Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Feedback</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={newFeedback.patient}
            onChange={(e) => setNewFeedback({ ...newFeedback, patient: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Feedback"
            value={newFeedback.feedback}
            onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Rating:</label>
            <select
              value={newFeedback.rating}
              onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addFeedback}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </div>
      </div>
      {/* Feedbacks List */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-4">All Feedback</h3>
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-4 rounded shadow bg-blue-50 flex justify-between items-start"
            >
              <div>
                <h4 className="text-lg font-semibold">{fb.patient}</h4>
                <p className="text-gray-700">{fb.feedback}</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < fb.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.972c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.376 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.972a1 1 0 00-.364-1.118L2.454 9.4c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.973z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{fb.rating} Stars</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{fb.date}</p>
              </div>
              <button
                onClick={() => deleteFeedback(fb.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
