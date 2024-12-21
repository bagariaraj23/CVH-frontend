'use client';

export default function HealthRecordsPage() {
  const records = [
    {
      id: 1,
      date: '2024-11-18',
      type: 'Lab Result',
      description: 'Blood Test',
      file: 'blood-test.pdf',
    },
    {
      id: 2,
      date: '2024-11-15',
      type: 'Imaging',
      description: 'Chest X-Ray',
      file: 'chest-xray.jpg',
    },
    {
      id: 3,
      date: '2024-11-10',
      type: 'Prescription',
      description: 'Medication List',
      file: 'prescription.pdf',
    },
  ];

  return (
    <main className="p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Health Records</h2>
      <div className="bg-white shadow rounded p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="py-2 px-4 border-b">{record.date}</td>
                <td className="py-2 px-4 border-b">{record.type}</td>
                <td className="py-2 px-4 border-b">{record.description}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                    View
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
