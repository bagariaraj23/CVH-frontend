export default function AppointmentScheduler() {
    return (
      <div className="bg-white shadow rounded p-4 h-96">
        <h3 className="text-lg font-semibold text-gray-700">Appointment Scheduler</h3>
        <div className="mt-4 flex flex-col space-y-2">
          {/* Dummy appointments */}
          <div className="p-2 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer">
            Dr. Smith - 9:00 AM - Patient A
          </div>
          <div className="p-2 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer">
            Dr. Johnson - 10:00 AM - Patient B
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Appointment
          </button>
        </div>
      </div>
    );
  }
  