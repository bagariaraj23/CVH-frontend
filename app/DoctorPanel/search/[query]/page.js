'use client';
import { useParams } from 'next/navigation';

export default function SearchResults() {
  const { query } = useParams();

  // Dummy data for demonstration
  const data = [
    { id: 1, name: 'Alice Johnson', type: 'Patient' },
    { id: 2, name: 'Bob Smith', type: 'Appointment' },
    { id: 3, name: 'Charlie Davis', type: 'Patient' },
  ];

  // Filter results based on the query
  const filteredResults = data.filter((item) =>
    item.name.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{query}"
        </h2>
        {filteredResults.length > 0 ? (
          <ul className="space-y-4">
            {filteredResults.map((result) => (
              <li
                key={result.id}
                className="p-4 rounded shadow bg-blue-50 border-l-4 border-blue-500"
              >
                <p className="text-lg font-semibold">{result.name}</p>
                <p className="text-gray-600">Type: {result.type}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </main>
  );
}
