'use client'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function RevenueTrends() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [50000, 60000, 55000, 70000, 65000, 80000],
        borderColor: '#3B82F6',
        backgroundColor: '#DBEAFE',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="bg-white shadow rounded p-6 h-96">
        <h2 className="text-2xl font-bold mb-6">Revenue Trends</h2>
        <div className="h-80">
          <Line data={data} options={options} />
        </div>
      </div>
    </main>
  );
}
