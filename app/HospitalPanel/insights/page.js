'use client';

import Link from 'next/link';

export default function Insights() {
  return (
    <main className=" text-black flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Insights</h2>
      {/* Links to sub-pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/HospitalPanel/ai-predictions"
          className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">AI Predictions</h3>
          <p className="text-gray-700">Leverage AI for predictive analytics.</p>
        </Link>
        <Link
          href="/HospitalPanel/customizable-kpis"
          className="bg-green-100 p-4 rounded-lg shadow hover:bg-green-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">Customizable KPIs</h3>
          <p className="text-gray-700">Define and track your own KPIs.</p>
        </Link>
      </div>
    </main>
  );
}
