// app/user/premium/success/page.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function PremiumSuccessPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-8">Thank you for upgrading to Premium. Enjoy your new features!</p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
