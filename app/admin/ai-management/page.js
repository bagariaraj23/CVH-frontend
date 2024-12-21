// pages/ai-management.js

export default function AIManagement() {
    const models = [
      { name: 'Recommendation Engine', status: 'Active', performance: '95%' },
      { name: 'Spam Filter', status: 'Training', performance: 'N/A' },
      // ...additional models
    ];
  
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">AI Models</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Performance</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{model.name}</td>
                  <td className="py-2 px-4 border-b">{model.status}</td>
                  <td className="py-2 px-4 border-b">{model.performance}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:underline mr-2">View</button>
                    <button className="text-green-500 hover:underline">Deploy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
  