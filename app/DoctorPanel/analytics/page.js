'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Analytics() {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 7000, 6000, 8000, 7500, 9000],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const outcomesData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Patient Outcomes',
        data: [85, 88, 90, 92],
        backgroundColor: '#10B981',
      },
    ],
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto space-y-6">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-6">Revenue Analytics</h2>
        <div className="h-80">
          <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-6">Patient Outcomes</h2>
        <div className="h-80">
          <Bar data={outcomesData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </main>
  );
}
