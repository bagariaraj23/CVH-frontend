'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  ClipboardListIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChatAltIcon,
  ChartBarIcon,
} from '@heroicons/react/outline';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/HospitalPanel', icon: HomeIcon },
    { name: 'Operations', href: '/HospitalPanel/operations', icon: ClipboardListIcon },
    { name: 'Financials', href: '/HospitalPanel/financials', icon: CurrencyDollarIcon },
    { name: 'Compliance', href: '/HospitalPanel/compliance', icon: ShieldCheckIcon },
    { name: 'Engagement', href: '/HospitalPanel/engagement', icon: ChatAltIcon },
    { name: 'Insights', href: '/HospitalPanel/insights', icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 h-screen bg-[#12104A] text-white flex flex-col">
      <nav className="mt-10 flex-1">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center px-4 py-2 hover:bg-blue-800 transition">
            <item.icon className="h-6 w-6 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
