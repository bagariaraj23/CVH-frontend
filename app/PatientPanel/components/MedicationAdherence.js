'use client';

export default function MedicationAdherence() {
  const adherencePercentage = 80;

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-4">Medication Adherence</h3>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{ width: `${adherencePercentage}%` }}
          ></div>
        </div>
        <span className="ml-4 font-semibold text-gray-700">
          {adherencePercentage}%
        </span>
      </div>
      <p className="text-gray-600 mt-2">
        You have taken 80% of your prescribed medications this month.
      </p>
    </div>
  );
}
