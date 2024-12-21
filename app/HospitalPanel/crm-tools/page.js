'use client';

import { useState } from 'react';

export default function CRMTools() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Dr. Emily Clark',
      email: 'emily.clark@example.com',
      phone: '555-1234',
    },
    {
      id: 2,
      name: 'Mr. John Doe',
      email: 'john.doe@example.com',
      phone: '555-5678',
    },
    {
      id: 3,
      name: 'Ms. Sarah Lee',
      email: 'sarah.lee@example.com',
      phone: '555-9012',
    },
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const addContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      const contact = {
        id: contacts.length + 1,
        ...newContact,
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', email: '', phone: '' });
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">CRM Tools</h2>
      {/* Add Contact Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addContact}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Contact
          </button>
        </div>
      </div>
      {/* Contacts Table */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Contacts</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="py-2 px-4 border-b">{contact.id}</td>
                <td className="py-2 px-4 border-b">{contact.name}</td>
                <td className="py-2 px-4 border-b">{contact.email}</td>
                <td className="py-2 px-4 border-b">{contact.phone}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
