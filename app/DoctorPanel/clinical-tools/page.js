import Link from 'next/link';

export default function ClinicalTools() {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-6">Clinical Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instant Health Advice */}
          <Link
            href="/clinical-tools/health-advice"
            className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Instant Health Advice</h3>
            <p className="text-gray-700">
              Get AI-powered recommendations based on patient symptoms.
            </p>
          </Link>
          {/* Lab Results */}
          <Link
            href="/clinical-tools/lab-results"
            className="bg-green-100 p-4 rounded-lg shadow hover:bg-green-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Lab Results</h3>
            <p className="text-gray-700">View and analyze patient lab results.</p>
          </Link>
          {/* Imaging */}
          <Link
            href="/clinical-tools/imaging"
            className="bg-purple-100 p-4 rounded-lg shadow hover:bg-purple-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Imaging</h3>
            <p className="text-gray-700">Access and review medical imaging reports.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
