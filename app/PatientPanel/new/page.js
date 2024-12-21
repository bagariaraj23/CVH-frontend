'use client';

import { useState } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/navigation';

export default function ScheduleAppointmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const router = useRouter();

  const doctors = [
    {
      id: 1,
      name: 'Dr. Emily Smith',
      specialty: 'Cardiologist',
      fee: 200,
      photo: '/images/doctors/doctor1.jpg',
    },
    {
      id: 2,
      name: 'Dr. John Doe',
      specialty: 'Dermatologist',
      fee: 150,
      photo: '/images/doctors/doctor2.jpg',
    },
    {
      id: 3,
      name: 'Dr. Sarah Lee',
      specialty: 'Pediatrician',
      fee: 180,
      photo: '/images/doctors/doctor3.jpg',
    },
  ];

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      alert('Please select a date and time.');
      return;
    }

    const newAppointment = {
      id: Date.now(), // Unique ID
      date: appointmentDate,
      time: appointmentTime,
      doctor: selectedDoctor.name,
      location: `Room ${Math.floor(Math.random() * 300) + 100}, Main Hospital`,
      type: 'In-Person',
      status: 'Upcoming',
    };

    alert(
      `Appointment Scheduled:\nDoctor: ${newAppointment.doctor}\nDate: ${newAppointment.date}\nTime: ${newAppointment.time}`
    );

    setIsModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDate('');
    setAppointmentTime('');
    router.push('/PatientPanel/appointments');
  };

  return (
    <main className="p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Schedule Appointment</h2>
      {/* Doctor List */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Select a Doctor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white shadow rounded p-4 flex flex-col items-center text-center"
            >
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="h-24 w-24 rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{doctor.name}</h4>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-700 mt-2">Fee: ${doctor.fee}</p>
              <button
                onClick={() => handleSelectDoctor(doctor)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Appointment Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleScheduleAppointment} className="space-y-4">
              {/* Doctor Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedDoctor.photo}
                  alt={selectedDoctor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{selectedDoctor.name}</p>
                  <p className="text-gray-600">{selectedDoctor.specialty}</p>
                  <p className="text-gray-700">Fee: ${selectedDoctor.fee}</p>
                </div>
              </div>
              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium mb-1">Select Date</label>
                <div className="relative">
                  <CalendarIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              {/* Time Picker */}
              <div>
                <label className="block text-sm font-medium mb-1">Select Time</label>
                <div className="relative">
                  <ClockIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
