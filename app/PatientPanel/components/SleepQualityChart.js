'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(BarElement, LinearScale, CategoryScale);

export default function SleepQualityChart() {
  const data = {
    labels: ['Deep Sleep', 'Light Sleep', 'REM', 'Awake'],
    datasets: [
      {
        label: 'Hours',
        data: [2, 4, 1.5, 0.5],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow rounded p-4 h-64">
      <h3 className="text-lg font-semibold mb-4">Sleep Quality</h3>
      <div className="h-40">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
