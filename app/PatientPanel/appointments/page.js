'use client';

import Link from 'next/link';

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      date: '2024-11-21',
      time: '09:00 AM',
      doctor: 'Dr. Emily Smith',
      location: 'Room 101, Main Hospital',
      type: 'In-Person',
      status: 'Upcoming',
    },
    {
      id: 2,
      date: '2024-11-18',
      time: '02:30 PM',
      doctor: 'Dr. John Doe',
      location: 'Online (Telemedicine)',
      type: 'Telemedicine',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2024-11-15',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Lee',
      location: 'Room 202, Clinic A',
      type: 'In-Person',
      status: 'Cancelled',
    },
  ];

  return (
    <main className="p-6 bg-gray-100 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Link href="/PatientPanel/new">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Schedule Appointment
          </button>
        </Link>
      </div>
      <div className="bg-white shadow rounded p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Time</th>
              <th className="py-2 px-4 border-b text-left">Doctor</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="py-2 px-4 border-b">{appt.date}</td>
                <td className="py-2 px-4 border-b">{appt.time}</td>
                <td className="py-2 px-4 border-b">{appt.doctor}</td>
                <td className="py-2 px-4 border-b">{appt.type}</td>
                <td className="py-2 px-4 border-b">{appt.status}</td>
                <td className="py-2 px-4 border-b">
                  {appt.status === 'Upcoming' && appt.type === 'Telemedicine' ? (
                    <Link href={`/appointments/${appt.id}/join`}>
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Join
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/appointments/${appt.id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Details
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
