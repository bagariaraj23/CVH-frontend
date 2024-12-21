'use client'
import { TodayAppointments } from './components/TodayAppointments';
import { PatientMetrics } from './components/PatientMetrics';
import { Notifications } from './components/Notifications';
import { Shortcuts } from './components/Shortcuts';

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      {/* Shortcuts */}
      <Shortcuts />
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TodayAppointments />
        <PatientMetrics />
        <Notifications />
      </div>
    </main>
  );
}
