'use client';

import { useState } from 'react';
import { BellIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const user = {
    name: 'John Doe',
    wellnessScore: 85,
    profileImage: '/imran1.png', // Replace with your image URL
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Left Side: Personal Profile Summary */}
      <div className="flex items-center space-x-4">
        <img
          src={user.profileImage}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">
            Wellness Score: {user.wellnessScore}%
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link href="/PatientPanel/notifications">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
        </Link>
        <Link href="/PatientPanel/help">
          <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}
