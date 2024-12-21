// pages/security.js

export default function Security() {
    const policies = [
      { name: 'Password Policy', status: 'Enabled' },
      { name: 'Two-Factor Authentication', status: 'Disabled' },
      // ...additional policies
    ];
  
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Security Policies</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Policy</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{policy.name}</td>
                  <td className="py-2 px-4 border-b">{policy.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:underline">Toggle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
  