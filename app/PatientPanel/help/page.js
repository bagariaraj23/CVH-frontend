'use client';

export default function HelpPage() {
  return (
    <main className="p-6 bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
      <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">How can we assist you?</h3>
        <p className="text-gray-700 mb-4">
          If you have any questions or need assistance, please reach out to our support team.
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> support@healthcarepro.com
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p className="text-gray-700 mt-4">
          Our support team is available 24/7 to assist you with any inquiries.
        </p>
      </div>
    </main>
  );
}
