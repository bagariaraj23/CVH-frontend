'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, UserIcon, CogIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image'; // Importing the Image component

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/DoctorPanel/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex items-center text-black justify-between bg-white p-4 shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Image
          src="/img/CVH.png" // Path to your logo image in the public/img folder
          alt="CareValue Health Logo"
          width={90}
          height={90}
          className="object-contain "
        />
        
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search patients or appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-4">
        <Link href="/DoctorPanel/notifications" className="relative">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </Link>
        <Link href="/DoctorPanel/profile">
          <UserIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </Link>
        <Link href="/DoctorPanel/settings">
          <CogIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </Link>
      </div>
    </header>
  );
};
