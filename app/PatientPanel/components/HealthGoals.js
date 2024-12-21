'use client';

export default function HealthGoals() {
  const goals = [
    { id: 1, text: 'Walk 10,000 steps daily', completed: true },
    { id: 2, text: 'Drink 2 liters of water', completed: false },
    { id: 3, text: 'Sleep 8 hours', completed: false },
    { id: 4, text: 'Eat 5 servings of fruits/vegetables', completed: true },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-4">Health Goals</h3>
      <ul className="space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="flex items-center">
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => {}}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-3 text-gray-700">{goal.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
