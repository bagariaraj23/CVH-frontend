'use client';

import Link from 'next/link';

export default function Engagement() {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Engagement</h2>
      {/* Links to sub-pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/HospitalPanel/crm-tools"
          className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">CRM Tools</h3>
          <p className="text-gray-700">Manage customer relationships and interactions.</p>
        </Link>
        <Link
          href="/HospitalPanel/feedback"
          className="bg-green-100 p-4 rounded-lg shadow hover:bg-green-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">Feedback</h3>
          <p className="text-gray-700">Collect and analyze patient feedback.</p>
        </Link>
      </div>
    </main>
  );
}
