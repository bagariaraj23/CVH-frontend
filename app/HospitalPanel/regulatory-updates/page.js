'use client';

import { useState } from 'react';

export default function RegulatoryUpdates() {
  const [updates, setUpdates] = useState([
    {
      id: 1,
      title: 'HIPAA Compliance Update',
      description: 'New guidelines issued for patient data protection.',
      date: '2024-11-18',
    },
    {
      id: 2,
      title: 'OSHA Safety Standards',
      description: 'Updated safety protocols for hospital staff.',
      date: '2024-11-15',
    },
    {
      id: 3,
      title: 'FDA Regulations',
      description: 'Changes in medical device approval processes.',
      date: '2024-11-10',
    },
  ]);

  const addUpdate = () => {
    const newUpdate = {
      id: updates.length + 1,
      title: `New Regulation ${updates.length + 1}`,
      description: `Description for regulation ${updates.length + 1}.`,
      date: new Date().toISOString().split('T')[0],
    };
    setUpdates([...updates, newUpdate]);
  };

  const deleteUpdate = (id) => {
    setUpdates(updates.filter((update) => update.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Regulatory Updates</h2>
      <button
        onClick={addUpdate}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Update
      </button>
      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-white shadow rounded p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold">{update.title}</h3>
              <p className="text-gray-700">{update.description}</p>
              <p className="text-sm text-gray-500">{update.date}</p>
            </div>
            <button
              onClick={() => deleteUpdate(update.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
