// components/RecentActivities.js

export const RecentActivities = () => {
    const activities = [
      'User John updated profile',
      'Admin Lisa added a new user',
      'Server maintenance completed',
      // ...additional activities
    ];
  
    return (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="max-h-64 overflow-y-auto">
          <ul>
            {activities.map((activity, index) => (
              <li key={index} className="py-2 border-b">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  