'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/outline';

export const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/DoctorPanel', icon: <HomeIcon className="h-6 w-6 mr-3" /> },
    { name: 'Patients', href: '/DoctorPanel/patients', icon: <UsersIcon className="h-6 w-6 mr-3" /> },
    { name: 'Appointments', href: '/DoctorPanel/appointments', icon: <CalendarIcon className="h-6 w-6 mr-3" /> },
    { name: 'Clinical Tools', href: '/DoctorPanel/clinical-tools', icon: <BriefcaseIcon className="h-6 w-6 mr-3" /> },
    { name: 'Analytics', href: '/DoctorPanel/analytics', icon: <ChartBarIcon className="h-6 w-6 mr-3" /> },
    { name: 'Settings', href: '/DoctorPanel/settings', icon: <CogIcon className="h-6 w-6 mr-3" /> },
  ];

  return (
    <aside className="w-64 h-screen bg-[#12104A] text-white flex flex-col">
      <nav className="mt-10 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 hover:bg-blue-800 ${
              router.pathname === item.href ? 'bg-blue-800' : ''
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
