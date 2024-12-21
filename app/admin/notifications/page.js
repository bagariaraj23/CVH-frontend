export default function Notifications() {
    const notifications = [
      {
        id: 1,
        title: 'System Update Scheduled',
        message: 'A system update is scheduled for 12:00 AM on Saturday.',
        timestamp: '2 hours ago',
        status: 'Unread',
      },
      {
        id: 2,
        title: 'New Login Detected',
        message: 'A new login to your account was detected from Chrome on Windows.',
        timestamp: 'Yesterday at 4:15 PM',
        status: 'Read',
      },
      {
        id: 3,
        title: 'Password Changed Successfully',
        message: 'Your account password was successfully changed.',
        timestamp: '3 days ago',
        status: 'Read',
      },
      {
        id: 4,
        title: 'System Maintenance Completed',
        message: 'The scheduled system maintenance has been successfully completed.',
        timestamp: 'Last week',
        status: 'Unread',
      },
    ];
  
    return (
      <main className="flex-1 p-6 bg-gray-100">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-2xl font-bold mb-6">Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${
                  notification.status === 'Unread' ? 'bg-gray-50 border-blue-500' : 'bg-white border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">{notification.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{notification.timestamp}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      notification.status === 'Unread' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {notification.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
  