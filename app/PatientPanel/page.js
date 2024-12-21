'use client';

import UpcomingAppointments from './components/UpcomingAppointments';
import MedicationAdherence from './components/MedicationAdherence';
import HealthGoals from './components/HealthGoals';
import DailyStepsChart from './components/DailyStepsChart';
import SleepQualityChart from './components/SleepQualityChart';

export default function HomePage() {
  return (
    <main className="p-6 bg-gray-100 overflow-y-auto space-y-6">
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingAppointments />
        <MedicationAdherence />
        <HealthGoals />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyStepsChart />
        <SleepQualityChart />
      </div>
    </main>
  );
}
