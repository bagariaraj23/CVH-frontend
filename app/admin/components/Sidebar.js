// components/Sidebar.js

export const Sidebar = () => {
    return (
      <aside className="w-64 h-screen bg-[#12104A] text-white">
        <nav className="mt-10 space-y-2">
          {/* Dashboard */}
          <a
            href="/admin"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            Dashboard
          </a>
          {/* User Management */}
          <a
            href="/admin/user-management"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            User Management
          </a>
          {/* Settings */}
          <a
            href="/admin/settings"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            Settings
          </a>
          {/* Security */}
          <a
            href="/admin/security"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            Security
          </a>
          {/* Support */}
          <a
            href="/admin/support"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            Support
          </a>
          {/* Compliance */}
          <a
            href="/admin/compliance"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            Compliance
          </a>
          {/* AI Management */}
          <a
            href="/admin/ai-management"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            AI Management
          </a>
          {/* Verification Requests */}
          <a
            href="/admin/verificationRequests"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            Verification Requests
          </a>
        </nav>
      </aside>
    );
  };
  