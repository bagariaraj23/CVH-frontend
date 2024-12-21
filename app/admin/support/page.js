// pages/support.js

export default function Support() {
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Helpdesk</h2>
          <p>Contact our support team for assistance.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Create Ticket</button>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Knowledge Base</h2>
          <ul>
            <li className="py-2 border-b">
              <a href="#" className="text-blue-500 hover:underline">
                How to reset your password
              </a>
            </li>
            <li className="py-2 border-b">
              <a href="#" className="text-blue-500 hover:underline">
                Setting up two-factor authentication
              </a>
            </li>
            {/* ...additional articles */}
          </ul>
        </div>
      </main>
    );
  }
  