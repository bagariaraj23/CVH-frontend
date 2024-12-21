'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function Patients() {
  const [patients] = useState([
    { id: 1, name: 'Alice Johnson', age: 29, lastVisit: '2024-11-10' },
    { id: 2, name: 'Bob Smith', age: 45, lastVisit: '2024-10-22' },
    { id: 3, name: 'Charlie Davis', age: 34, lastVisit: '2024-09-15' },
    { id: 4, name: 'Dana Lee', age: 51, lastVisit: '2024-08-30' },
    { id: 5, name: 'Ethan Clark', age: 38, lastVisit: '2024-07-18' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-6">Patients</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Age</th>
              <th className="py-2 px-4 border-b text-left">Last Visit</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="py-2 px-4 border-b">{patient.name}</td>
                <td className="py-2 px-4 border-b">{patient.age}</td>
                <td className="py-2 px-4 border-b">{patient.lastVisit}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/patients/${patient.id}`} className="text-blue-500 hover:underline">
                    View EHR
                  </Link>
                  <span className="mx-2">|</span>
                  <Link href={`/telemedicine/${patient.id}`} className="text-green-500 hover:underline">
                    Start Telemedicine
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
