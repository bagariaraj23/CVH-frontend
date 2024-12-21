'use client';

import Link from 'next/link';

export default function DoctorCard({ doctor, onSelect }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center">
      <img
        src={doctor.photo}
        alt={doctor.name}
        className="h-24 w-24 rounded-full object-cover"
      />
      <div className="mt-4 md:mt-0 md:ml-6 flex-1">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-700 mt-2">Fee: ${doctor.fee}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <button
          onClick={() => onSelect(doctor)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Select
        </button>
      </div>
    </div>
  );
}
