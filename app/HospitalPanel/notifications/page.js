'use client';

import { useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Insurance Policy',
      description: 'A new insurance policy has been added for Patient A.',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'System Maintenance',
      description: 'Scheduled system maintenance on 2024-12-01.',
      time: '1 day ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Pending Approval',
      description: 'Appointment request from Patient B is pending approval.',
      time: '3 days ago',
      type: 'warning',
    },
  ]);

  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      title: `New Notification ${notifications.length + 1}`,
      description: `Description for notification ${notifications.length + 1}.`,
      time: new Date().toLocaleString(),
      type: 'info',
    };
    setNotifications([newNotification, ...notifications]);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <button
            onClick={addNotification}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Notification
          </button>
        </div>
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded shadow border-l-4 ${
                notif.type === 'success'
                  ? 'border-green-500 bg-green-50'
                  : notif.type === 'info'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex justify-between items-start">
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
