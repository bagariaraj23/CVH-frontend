import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResourceAllocation() {
  const data = {
    labels: ['Available', 'Occupied'],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold text-gray-700">Resource Allocation</h3>
      <div className="flex items-center justify-center mt-4">
        <Doughnut data={data} />
      </div>
      <div className="flex justify-around mt-4">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}
