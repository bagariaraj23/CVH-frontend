export default function Operations() {
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Operations</h2>
        {/* Links to sub-pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/HospitalPanel/appointment-scheduling"
            className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
            <p className="text-gray-700">Manage appointments and schedules.</p>
          </a>
          <a
            href="/HospitalPanel/staffing"
            className="bg-green-100 p-4 rounded-lg shadow hover:bg-green-200 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Staffing</h3>
            <p className="text-gray-700">Manage staff schedules and availability.</p>
          </a>
        </div>
      </main>
    );
  }
  