'use client';

import { useState } from 'react';

export default function InsuranceClaims() {
  const [claims, setClaims] = useState([
    {
      id: 1,
      patient: 'Alice Johnson',
      claimNumber: 'IC-1001',
      amount: '$5,000',
      status: 'Pending',
    },
    {
      id: 2,
      patient: 'Bob Smith',
      claimNumber: 'IC-1002',
      amount: '$3,200',
      status: 'Approved',
    },
    {
      id: 3,
      patient: 'Charlie Davis',
      claimNumber: 'IC-1003',
      amount: '$4,750',
      status: 'Rejected',
    },
  ]);

  const addClaim = () => {
    const newClaim = {
      id: claims.length + 1,
      patient: `Patient ${claims.length + 1}`,
      claimNumber: `IC-10${claims.length + 1}`,
      amount: `$${(Math.random() * 5000 + 1000).toFixed(2)}`,
      status: 'Pending',
    };
    setClaims([...claims, newClaim]);
  };

  const deleteClaim = (id) => {
    setClaims(claims.filter((claim) => claim.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Insurance Claims</h2>
      <button
        onClick={addClaim}
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Add Claim
      </button>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Patient</th>
            <th className="py-2 px-4 border-b text-left">Claim Number</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td className="py-2 px-4 border-b">{claim.id}</td>
              <td className="py-2 px-4 border-b">{claim.patient}</td>
              <td className="py-2 px-4 border-b">{claim.claimNumber}</td>
              <td className="py-2 px-4 border-b">{claim.amount}</td>
              <td className="py-2 px-4 border-b">{claim.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline mr-2">Edit</button>
                <button
                  onClick={() => deleteClaim(claim.id)}
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
