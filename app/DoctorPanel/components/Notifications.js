

'use client'
import { useState } from 'react';

export const Notifications = () => {
  const [notifications] = useState([
    { id: 1, message: 'New lab results available for patient Bob Smith.', type: 'Lab Results' },
    { id: 2, message: 'Appointment approval pending for patient Dana Lee.', type: 'Approval' },
    { id: 3, message: 'Reminder: Follow-up with Alice Johnson.', type: 'Reminder' },
  ]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start space-x-2">
            <span className="text-blue-500 font-semibold">{notification.type}:</span>
            <span className="text-gray-700">{notification.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
