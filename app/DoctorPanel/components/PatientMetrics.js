import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export const PatientMetrics = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Blood Pressure',
        data: [120, 122, 119, 121, 118, 117],
        borderColor: '#3B82F6',
        backgroundColor: '#DBEAFE',
        fill: true,
      },
      {
        label: 'Fasting Glucose Levels',
        data: [95, 92, 90, 93, 88, 85],
        borderColor: '#10B981',
        backgroundColor: '#D1FAE5',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow rounded p-4 h-96">
      <h2 className="text-xl font-bold mb-4">Patient Metrics</h2>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
