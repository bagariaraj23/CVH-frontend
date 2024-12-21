'use client';
import { MenuIcon, BellIcon, UserCircleIcon, CogIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex text-black items-center justify-between bg-white p-4 shadow-md">
      {/* Left Side */}
      <div className="flex items-center">
        <button className="mr-4 p-2 rounded hover:bg-gray-100 transition">
          <MenuIcon className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold">CareValue Health</span>
      </div>
      {/* Right Side */}
      <div className="flex items-center">
        {/* Notifications */}
        <Link href="/admin/notifications">
          <button className="mr-4 p-2 rounded hover:bg-gray-100 transition">
            <BellIcon className="h-6 w-6" />
          </button>
        </Link>
        {/* User Account */}
        <Link href="/admin/user-account">
          <button className="mr-4 p-2 rounded hover:bg-gray-100 transition">
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </Link>
        {/* System Updates */}
        <Link href="/admin/settings">
          <button className="p-2 rounded hover:bg-gray-100 transition">
            <CogIcon className="h-6 w-6" />
          </button>
        </Link>
      </div>
    </header>
  );
};
