'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Appointments() {
  const [appointments] = useState([
    { id: 1, date: '2024-11-20', patient: 'Alice Johnson', status: 'Scheduled' },
    { id: 2, date: '2024-11-21', patient: 'Bob Smith', status: 'Completed' },
    { id: 3, date: '2024-11-22', patient: 'Charlie Davis', status: 'Scheduled' },
  ]);

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-6">Appointments</h2>
        <div className="flex justify-end mb-4">
          <Link
            href="/appointments/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Schedule New Appointment
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Patient</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b">{appointment.date}</td>
                <td className="py-2 px-4 border-b">{appointment.patient}</td>
                <td className="py-2 px-4 border-b">{appointment.status}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/appointments/${appointment.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
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
