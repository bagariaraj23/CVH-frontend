'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function AIPredictions() {
  const [predictions, setPredictions] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patient Admissions Prediction',
        data: [50, 55, 60, 58, 65, 70],
        borderColor: '#3B82F6',
        backgroundColor: '#DBEAFE',
        fill: true,
      },
      {
        label: 'Revenue Prediction',
        data: [50000, 55000, 60000, 58000, 65000, 70000],
        borderColor: '#10B981',
        backgroundColor: '#DCFCE7',
        fill: true,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">AI Predictions</h2>
      <div className="bg-white shadow rounded p-6">
        <div className="h-96">
          <Line data={predictions} options={options} />
        </div>
      </div>
    </main>
  );
}
