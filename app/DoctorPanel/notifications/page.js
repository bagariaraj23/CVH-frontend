'use client';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: 'Appointment Scheduled',
      description: 'Your appointment with Dr. Smith is confirmed for 2024-11-21 at 10:00 AM.',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'Lab Results Ready',
      description: 'Your lab results for the recent tests are now available.',
      time: '1 day ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Payment Overdue',
      description: 'You have an outstanding balance of $200. Please make your payment.',
      time: '3 days ago',
      type: 'warning',
    },
  ];

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded shadow border-l-4 ${
                notification.type === 'success'
                  ? 'border-green-500 bg-green-50'
                  : notification.type === 'info'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-gray-700">{notification.description}</p>
              <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
