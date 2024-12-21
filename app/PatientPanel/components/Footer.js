'use client';

export default function Footer() {
  return (
    <footer className="bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} CareValue Health. All rights reserved.
        </div>
        <div className="space-x-4">
          <a href="#" className="text-blue-600 hover:underline">
            FAQs
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Support
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Logout
          </a>
        </div>
      </div>
    </footer>
  );
}
