// pages/settings.js

export default function Settings() {
    return (
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">System Integration</label>
              <input
                type="text"
                placeholder="Integration Key"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Configuration</label>
              <textarea
                placeholder="System Configuration"
                className="w-full mt-2 p-2 border rounded"
              ></textarea>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Settings</button>
          </form>
        </div>
      </main>
    );
  }
  