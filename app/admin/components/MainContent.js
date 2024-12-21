// components/MainContent.js

import { ActiveUsersOverview } from './ActiveUsersOverview';
import { RevenueAnalytics } from './RevenueAnalytics';
import { RecentActivities } from './RecentActivities';
import { RoleBasedPermissions } from './RoleBasedPermissions';
import { SubscriptionPlans } from './SubscriptionPlans';

export const MainContent = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActiveUsersOverview />
        <RevenueAnalytics />
        <RecentActivities />
      </div>
      {/* Interactive Panels */}
      <div className="mt-6">
        <RoleBasedPermissions />
        <SubscriptionPlans />
      </div>
    </main>
  );
};
