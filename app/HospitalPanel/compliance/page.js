'use client';

import Link from 'next/link';

export default function Compliance() {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Compliance</h2>
      {/* Links to sub-pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/HospitalPanel/audit-logs"
          className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">Audit Logs</h3>
          <p className="text-gray-700">View and manage system audit logs.</p>
        </Link>
        <Link
          href="/HospitalPanel/regulatory-updates"
          className="bg-green-100 p-4 rounded-lg shadow hover:bg-green-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">Regulatory Updates</h3>
          <p className="text-gray-700">Stay updated with the latest regulations.</p>
        </Link>
      </div>
    </main>
  );
}
