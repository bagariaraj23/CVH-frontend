export default function Financials() {
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Financials</h2>
        {/* Links to sub-pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/HospitalPanel/revenue-trends"
            className="bg-yellow-100 p-4 rounded-lg shadow hover:bg-yellow-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Revenue Trends</h3>
            <p className="text-gray-700">View and analyze revenue over time.</p>
          </a>
          <a
            href="/HospitalPanel/insurance-claims"
            className="bg-purple-100 p-4 rounded-lg shadow hover:bg-purple-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Insurance Claims</h3>
            <p className="text-gray-700">Manage insurance claims and billing.</p>
          </a>
        </div>
      </main>
    );
  }
  