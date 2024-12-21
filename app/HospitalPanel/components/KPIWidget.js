export default function KPIWidget({ title, value, change }) {
    return (
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="flex items-center mt-2">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          <span
            className={`ml-2 text-sm ${
              change.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    );
  }
  