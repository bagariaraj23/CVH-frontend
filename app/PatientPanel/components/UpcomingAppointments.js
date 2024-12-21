'use client';

import Link from 'next/link';

export default function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      time: '2024-11-21 09:00 AM',
      location: 'Room 101, Main Hospital',
      doctor: 'Dr. Emily Smith',
    },
    {
      id: 2,
      time: '2024-11-23 02:30 PM',
      location: 'Online (Telemedicine)',
      doctor: 'Dr. John Doe',
    },
    {
      id: 3,
      time: '2024-11-25 11:00 AM',
      location: 'Room 202, Clinic A',
      doctor: 'Dr. Sarah Lee',
    },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
          >
            <div>
              <p className="font-semibold">{appt.time}</p>
              <p className="text-gray-600">{appt.location}</p>
              <p className="text-gray-600">With {appt.doctor}</p>
            </div>
            <Link href={`/appointments/${appt.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
