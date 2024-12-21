'use client';

import { useState } from 'react';

export default function AuditLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      user: 'Admin',
      action: 'Added new user',
      timestamp: '2024-11-20 10:00 AM',
    },
    {
      id: 2,
      user: 'User1',
      action: 'Updated patient record',
      timestamp: '2024-11-19 2:30 PM',
    },
    {
      id: 3,
      user: 'Admin',
      action: 'Deleted appointment',
      timestamp: '2024-11-18 4:15 PM',
    },
  ]);

  const addLog = () => {
    const newLog = {
      id: logs.length + 1,
      user: 'User' + (logs.length + 1),
      action: 'Performed action ' + (logs.length + 1),
      timestamp: new Date().toLocaleString(),
    };
    setLogs([...logs, newLog]);
  };

  const deleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Audit Logs</h2>
      <button
        onClick={addLog}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Log
      </button>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">User</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
            <th className="py-2 px-4 border-b text-left">Timestamp</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="py-2 px-4 border-b">{log.id}</td>
              <td className="py-2 px-4 border-b">{log.user}</td>
              <td className="py-2 px-4 border-b">{log.action}</td>
              <td className="py-2 px-4 border-b">{log.timestamp}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteLog(log.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
