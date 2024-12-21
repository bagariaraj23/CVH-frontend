
'use client'
import KPIWidget from './components/KPIWidget';
import PatientFeedback from './components/PatientFeedback';
import ResourceAllocation from './components/ResourceAllocation';
import AppointmentScheduler from './components/AppointmentScheduler';
import InventoryManagement from './components/InventoryManagement';

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIWidget title="Revenue" value="$1.2M" change="+5%" />
        <KPIWidget title="Patient Volume" value="2,345" change="+8%" />
        <KPIWidget title="Staff Utilization" value="85%" change="-2%" />
      </div>
      {/* Patient Feedback and Resource Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientFeedback />
        <ResourceAllocation />
      </div>
      {/* Interactive Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppointmentScheduler />
        <InventoryManagement />
      </div>
    </main>
  );
}
