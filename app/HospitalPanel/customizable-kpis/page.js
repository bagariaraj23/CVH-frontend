'use client';

import { useState } from 'react';

export default function CustomizableKPIs() {
  const [kpis, setKpis] = useState([
    { id: 1, name: 'Revenue', target: '$100,000', actual: '$90,000' },
    { id: 2, name: 'Patient Volume', target: '500', actual: '450' },
    { id: 3, name: 'Staff Utilization', target: '80%', actual: '75%' },
  ]);

  const [newKPI, setNewKPI] = useState({ name: '', target: '', actual: '' });

  const addKPI = () => {
    if (newKPI.name && newKPI.target && newKPI.actual) {
      const kpi = {
        id: kpis.length + 1,
        ...newKPI,
      };
      setKpis([...kpis, kpi]);
      setNewKPI({ name: '', target: '', actual: '' });
    }
  };

  const deleteKPI = (id) => {
    setKpis(kpis.filter((kpi) => kpi.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Customizable KPIs</h2>
      {/* Add KPI Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New KPI</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="KPI Name"
            value={newKPI.name}
            onChange={(e) => setNewKPI({ ...newKPI, name: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Target"
            value={newKPI.target}
            onChange={(e) => setNewKPI({ ...newKPI, target: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Actual"
            value={newKPI.actual}
            onChange={(e) => setNewKPI({ ...newKPI, actual: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addKPI}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add KPI
          </button>
        </div>
      </div>
      {/* KPIs Table */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Current KPIs</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Target</th>
              <th className="py-2 px-4 border-b text-left">Actual</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kpis.map((kpi) => (
              <tr key={kpi.id}>
                <td className="py-2 px-4 border-b">{kpi.id}</td>
                <td className="py-2 px-4 border-b">{kpi.name}</td>
                <td className="py-2 px-4 border-b">{kpi.target}</td>
                <td className="py-2 px-4 border-b">{kpi.actual}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button
                    onClick={() => deleteKPI(kpi.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
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
