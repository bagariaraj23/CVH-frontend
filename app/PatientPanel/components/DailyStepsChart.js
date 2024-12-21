'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function DailyStepsChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Steps',
        data: [8000, 9500, 10000, 7000, 12000, 11000, 9000],
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
    <div className="bg-white shadow rounded p-4 h-64">
      <h3 className="text-lg font-semibold mb-4">Daily Steps</h3>
      <div className="h-40">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
