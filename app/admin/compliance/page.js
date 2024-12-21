// pages/compliance.js

export default function Compliance() {
    const reports = [
      { name: 'Annual Compliance Report', date: '2023-01-15' },
      { name: 'Security Audit', date: '2023-06-30' },
      // ...additional reports
    ];
  
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Compliance Reports</h2>
          <ul>
            {reports.map((report, index) => (
              <li key={index} className="py-2 border-b flex justify-between">
                <span>{report.name}</span>
                <span>{report.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }
  