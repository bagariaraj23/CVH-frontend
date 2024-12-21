'use client'
import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'Light',
    notifications: true,
    language: 'English',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <form>
          {/* Theme */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
          {/* Notifications */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-sm font-medium">Enable Notifications</span>
            </label>
          </div>
          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => alert('Settings saved!')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
