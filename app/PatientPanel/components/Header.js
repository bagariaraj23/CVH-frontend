'use client';

import { useState, useEffect } from 'react';
import { BellIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Header() {
  const [user, setUser] = useState(null);     // Stores user details from DB
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // /**
  //  * 1. On mount, try to get the connected wallet (if any).
  //  * 2. If found, fetch user details from your DB via an API route
  //  */
  const fetchWalletAddress = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const address = accounts[0];
      if (address) {
        setWalletAddress(address);
      } else {
        toast.error("No wallet connected");
      }
    } catch (error) {
      console.error("Failed to fetch wallet address!", error);
    }
  };

  // Fetch wallet address on mount
  useEffect(() => {
    fetchWalletAddress();
  }, []);

  /**
   * Utility function to fetch user details by wallet address
   * This could call /api/user?walletAddress=xyz or a similar route
   */
  const fetchUserDetails = async (address) => {
    try {
      setLoading(true);
      // Example: call an API route that returns { name, profileImage, wellnessScore } for this wallet
      const res = await fetch(`/api/user/details?walletAddress=${address.toLowerCase()}`);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      // Example shape: data = { name: "John Doe", profileImage: "/some.png", wellnessScore: 85, ... }
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // Fetch user details when walletAddress changes
  useEffect(() => {
    if (walletAddress) {
      fetchUserDetails(walletAddress);
    }
  }, [walletAddress]); // <- Now runs only when walletAddress updates

  if (loading) {
    return (
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <p>Loading user details...</p>
      </header>
    );
  }
  const displayName = user?.name || walletAddress || 'Guest';

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Left Side: Personal Profile Summary */}
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-lg font-semibold">{displayName}</h2>
          <p className="text-sm text-gray-600">
            {user?.role ? `Role: ${user.role}` : 'No role assigned'}
          </p>
          <p className="text-sm text-gray-600">
            {user?.status ? `Status: ${user.status}` : 'Not Verified!'}
          </p><p className="text-sm text-gray-600">
            {user?.premium == true ? `Subscription: Premium User!` : 'Subscription: Not Premium User!'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/PatientPanel/notifications">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
        </Link>
        <Link href="/PatientPanel/help">
          <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}