'use client';

export default function BillingPaymentsPage() {
  const bills = [
    {
      id: 1,
      date: '2024-11-15',
      description: 'Consultation Fee',
      amount: '$100',
      status: 'Due',
    },
    {
      id: 2,
      date: '2024-11-10',
      description: 'Lab Tests',
      amount: '$200',
      status: 'Paid',
    },
    {
      id: 3,
      date: '2024-11-05',
      description: 'Medication',
      amount: '$50',
      status: 'Due',
    },
  ];

  return (
    <main className="p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Billing & Payments</h2>
      <div className="bg-white shadow rounded p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="py-2 px-4 border-b">{bill.date}</td>
                <td className="py-2 px-4 border-b">{bill.description}</td>
                <td className="py-2 px-4 border-b">{bill.amount}</td>
                <td className="py-2 px-4 border-b">{bill.status}</td>
                <td className="py-2 px-4 border-b">
                  {bill.status === 'Due' ? (
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Pay Now
                    </button>
                  ) : (
                    <button className="bg-gray-400 text-white px-3 py-1 rounded" disabled>
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
