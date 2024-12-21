'use client';

export default function WellnessPage() {
  const fitnessPlan = 'Weekly fitness plan: Cardio on Mon/Wed/Fri, Strength on Tue/Thu.';
  const nutritionPlan = 'Daily nutrition plan: Balanced diet with proteins, carbs, and fats.';

  return (
    <main className="p-6 bg-gray-100 overflow-y-auto space-y-6">
      <h2 className="text-2xl font-bold">Wellness</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Plan */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-4">Fitness Plan</h3>
          <p className="text-gray-700">{fitnessPlan}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Details
          </button>
        </div>
        {/* Nutrition Plan */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-4">Nutrition Plan</h3>
          <p className="text-gray-700">{nutritionPlan}</p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Details
          </button>
        </div>
      </div>
    </main>
  );
}
