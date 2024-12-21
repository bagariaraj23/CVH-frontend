'use client';

import { useState } from 'react';
import { BellIcon, UserCircleIcon, CogIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image'; // Importing the Next.js Image component

export default function Header() {
  const [facility, setFacility] = useState('Main Hospital');

  return (
    <header className="flex items-center text-black justify-between bg-white p-4 shadow-md">
      {/* Left Side: Facility Logo and Dropdown */}
      <div className="flex items-center space-x-4">
        <Image
          src="/img/CVH.png" // Path to your logo in the public folder
          alt="Logo"
          width={90}
          height={90}
          className="object-contain"
        />
        <select
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option>Main Hospital</option>
          <option>Clinic A</option>
          <option>Clinic B</option>
        </select>
      </div>
      {/* Right Side: Icons */}
      <div className="flex items-center space-x-4">
        <Link href="/HospitalPanel/notifications" className="relative">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </Link>
        <Link href="/HospitalPanel/profile">
          <UserCircleIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </Link>
        <Link href="/HospitalPanel/settings">
          <CogIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </Link>
      </div>
    </header>
  );
}
