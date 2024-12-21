'use client'
import { useState } from 'react';

export const TodayAppointments = () => {
  const [appointments] = useState([
    { time: '09:00 AM', patient: 'Alice Johnson', purpose: 'Routine Checkup' },
    { time: '10:30 AM', patient: 'Bob Smith', purpose: 'Follow-up' },
    { time: '12:00 PM', patient: 'Charlie Davis', purpose: 'New Patient Consultation' },
    { time: '02:00 PM', patient: 'Dana Lee', purpose: 'Physical Therapy' },
    { time: '03:30 PM', patient: 'Ethan Clark', purpose: 'Lab Results Review' },
  ]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition"
          >
            <p className="text-lg font-semibold">{appointment.time}</p>
            <p className="text-gray-700">{appointment.patient}</p>
            <p className="text-sm text-gray-500">{appointment.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
