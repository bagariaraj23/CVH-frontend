'use client';

import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Patient',
    status: 'Active',
    joined: 'January 15, 2023',
    lastLogin: 'November 18, 2024, 4:30 PM',
    profileImage: '/imran1.png', // Replace with your image URL
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    setUser({ ...formData });
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 p-6 bg-gradient-to-r from-blue-50 to-white">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-6 md:mt-0 md:ml-8 flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-lg">{user.email}</p>
            <div className="mt-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Role</h3>
            <p className="text-gray-600">{user.role}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Joined</h3>
            <p className="text-gray-600">{user.joined}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Last Login</h3>
            <p className="text-gray-600">{user.lastLogin}</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
