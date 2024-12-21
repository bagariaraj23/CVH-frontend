'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardListIcon,
  CreditCardIcon,
  HeartIcon,
  SupportIcon,
  CogIcon,
} from '@heroicons/react/outline';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/PatientPanel', icon: HomeIcon },
    { name: 'Appointments', href: '/PatientPanel/appointments', icon: CalendarIcon },
    { name: 'Health Records', href: '/PatientPanel/health-records', icon: ClipboardListIcon },
    { name: 'Billing & Payments', href: '/PatientPanel/billing-payments', icon: CreditCardIcon },
    { name: 'Wellness', href: '/PatientPanel/wellness', icon: HeartIcon },
    { name: 'Support', href: '/PatientPanel/support', icon: SupportIcon },
    { name: 'Settings', href: '/PatientPanel/settings', icon: CogIcon },
  ];

  return (
    <aside className="w-64 h-screen bg-[#12104A] text-white flex flex-col">
      <div className="flex items-center justify-center mt-10">
        <Link href="/home" className="text-2xl font-bold">
          CareValue Health
        </Link>
      </div>
      <nav className="mt-10 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 hover:bg-blue-800 transition ${
                isActive ? 'bg-blue-800' : ''
              }`}
            >
              <item.icon className="h-6 w-6 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
