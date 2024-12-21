'use client';
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export const Shortcuts = () => {
  return (
    <div className="bg-white shadow rounded p-4 flex space-x-4">
      {/* E-Prescriptions Shortcut */}
      <Link
        href="/e-prescriptions"
        className="flex items-center bg-[#12104A] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        <PencilAltIcon className="h-6 w-6 mr-2" />
        E-Prescriptions
      </Link>
      {/* New Appointment Shortcut */}
      <Link
        href="/appointments/new"
        className="flex items-center bg-[#12104A] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        New Appointment
      </Link>
    </div>
  );
};
