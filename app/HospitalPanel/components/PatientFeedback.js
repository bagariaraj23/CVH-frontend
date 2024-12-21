import { StarIcon } from '@heroicons/react/solid';

export default function PatientFeedback() {
  const rating = 4.5;

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold text-gray-700">Patient Feedback</h3>
      <div className="flex items-center mt-4">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-6 w-6 ${
              index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-xl font-bold text-gray-800">{rating}/5</span>
      </div>
      <p className="text-gray-600 mt-2">Based on recent surveys and feedback.</p>
    </div>
  );
}
