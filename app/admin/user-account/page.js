
'use client'
import { useState } from 'react';

export default function UserAccount() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'January 15, 2023',
    lastLogin: 'November 18, 2024, 10:15 AM',
    profileImage: '/imran1.png', // Path to your profile image
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Save Changes
  const handleSaveChanges = () => {
    setUserData(editData);
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 p-6 bg-gradient-to-r from-blue-50 to-white">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* User Info */}
          <div className="mt-6 md:mt-0 md:ml-8 flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-600 text-lg">{userData.email}</p>
            <div className="mt-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  userData.status === 'Active'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {userData.status}
              </span>
            </div>
          </div>
          {/* Edit Button */}
          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Account Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Role</h3>
            <p className="text-gray-600">{userData.role}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Joined</h3>
            <p className="text-gray-600">{userData.joined}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Last Login</h3>
            <p className="text-gray-600">{userData.lastLogin}</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            View Settings
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
