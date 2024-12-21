'use client';

import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Appointment Reminder',
      description: 'You have an appointment tomorrow at 9:00 AM with Dr. Emily Smith.',
      time: '2 hours ago',
      type: 'reminder',
    },
    {
      id: 2,
      title: 'Lab Results Available',
      description: 'Your recent lab results are now available in Health Records.',
      time: '1 day ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'New Message from Support',
      description: 'Our support team has responded to your query.',
      time: '3 days ago',
      type: 'message',
    },
  ]);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <main className="p-6 bg-gray-100">
      <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="p-4 rounded shadow bg-blue-50 border-l-4 border-blue-500 flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold">{notif.title}</h3>
                <p className="text-gray-700">{notif.description}</p>
                <p className="text-sm text-gray-500 mt-2">{notif.time}</p>
              </div>
              <button
                onClick={() => deleteNotification(notif.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
