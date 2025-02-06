"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { checkUserRole } from "../utils/api";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [userRole, setUserRole] = useState(null);    // e.g. "doctor", "patient", etc.
  const [userStatus, setUserStatus] = useState(null); // e.g. "pending", "verified", "not_verified"
  
  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            await handleRoleCheck(accounts[0]);
          }
        } catch (err) {
          alert("Error checking wallet connection. Please try again.");
          console.error("Error checking wallet connection:", err);
        }
      }
    };

    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      await handleRoleCheck(accounts[0]);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
    router.push('/');
    toast.info("Wallet disconnected. Please manually remove the wallet connection from your metamask extension in the browser.", {
      position: "top-right",
      autoClose: 5000
    });
  };

  const toggleWalletConnection = async () => {
    if (isConnected) {
      handleDisconnect();
    } else {
      await connectWallet();
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not installed. Please install MetaMask to proceed.", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setWalletAddress(address);
      setIsConnected(true);
      await handleRoleCheck(address);
    } catch (err) {
      if (err.code === 4001) {
        toast.error("Connection request denied by user.", {
          position: "top-right",
          autoClose: 5000
        });
      } else {
        toast.error("Failed to connect wallet. Please try again.", {
          position: "top-right",
          autoClose: 5000
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleCheck = async (address) => {
    try {
      const response = await checkUserRole(address.toLowerCase());
      const { role, status } = response;
      setUserRole(role);
      setUserStatus(status);

      // First check if it's admin
      if (address === "0x4d5b0Ac9C4148932bd10a28B1E0a064f51f390D4".toLowerCase()) {
        router.push("/admin");
        return;
      }

      // Handle different status cases
      switch (status) {
        case "verified":
          // Instead of forcibly routing them, we let them remain on the page
          // Then they can click a link "Go to your dashboard" if they want
          toast.success(`You are verified as ${role}. You can access your dashboard from the menu.`, {
            position: "top-right",
            autoClose: 5000
          });
          break;

        case "pending":
          router.push("/user/under-review");
          break;

        case "not_verified":
          switch (role.toLowerCase()) {
            case "none":
              toast.warning("The user has been marked as not verified. Please fill the verification Form again!", {
                position: "top-right",
                autoClose: 5000
              });
          }
          router.push("/user/verification");
          break;
        case "new":
        default:
          router.push("/user/verification");
          break;
      }
    } catch (err) {
      console.error("Error in handleRoleCheck:", err);
      setError("Unable to check user role. Try again later.");
      // Possibly route to a default page or just do nothing
    }
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "AI Doctor", link: "/user/AiDoctor" },
    { name: "Consult a Specialist", link: "/user/consultSpecialist" },
    { name: "Patient Portal", link: "/user/patientPortal" },
    { name: "Testimonials", link: "/user/testimonials" },
    { name: "Contact Us", link: "/user/contactUs" },
  ];

  const dropdownItems = [
    { name: "About Us", link: "/user/aboutUs" },
    { name: "Blog", link: "/user/blog" },
    { name: "Privacy Policy", link: "/user/privacyPolicy" },
    { name: "Terms of Service", link: "/user/termsAndServices" },
  ];

  // If user is verified, we can show a direct link to their panel
  // e.g. if userRole == "doctor", link => "/DoctorPanel"
  let panelLink = null;
  if (userStatus === "verified") {
    switch ((userRole || "").toLowerCase()) {
      case "admin":
        panelLink = "/admin";
        break;
      case "doctor":
        panelLink = "/DoctorPanel";
        break;
      case "hospital":
        panelLink = "/HospitalPanel";
        break;
      case "patient":
        panelLink = "/PatientPanel";
        break;
      default:
        panelLink = "/user/verification";
    }
  }

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-[#12104A] text-white shadow-md font-[Poppins] sticky top-0 z-50 sm:px-6 md:px-10 lg:px-12 xl:px-16 md:py-4">
      {/* Logo with Home Link */}
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <Image
            src="/img/logo.jpg" // Update the path to your image file
            alt="CareValue Health Logo"
            width={140} // Smaller size for mobile
            height={60}
            quality={100}
            priority
            className="md:w-[140px] md:h-[60px] lg:w-[160px] lg:h-[70px]" // Adjust sizes for larger screens
          />
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex space-x-4 text-white font-medium text-base lg:text-lg xl:text-xl">
        {navItems.map((navItem, idx) => (
          <Link key={idx} href={navItem.link} className="hover:text-gray-300">
            {navItem.name}
          </Link>
        ))}

        {/* If user is verified, show a "Go to Dashboard" link manually */}
        {userStatus === "verified" && panelLink && (
          <Link href={panelLink} className="hover:text-gray-300">
            Dashboard
          </Link>
        )}

        {/* Dropdown Menu for More */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="hover:text-gray-300">More</span>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#12104A] text-white rounded-md shadow-lg p-3 border border-gray-600">
              {dropdownItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="block px-4 py-2 text-sm lg:text-base font-normal hover:bg-gray-700 hover:text-white rounded"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Action Icons and Mobile Hamburger Icon */}
      <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5 text-white">
        <FaSearch className="text-base md:text-lg lg:text-xl hover:text-gray-300 cursor-pointer" />
        {/* Wallet Connect */}
        <div
          className="flex items-center cursor-pointer space-x-2"
          onClick={toggleWalletConnection}
        >
          <FaUser className="text-base md:text-lg lg:text-xl hover:text-gray-300" />
          <span className="hidden md:block">
            {loading ? "Connecting..." :
              isConnected && walletAddress
                ? `Disconnect: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
          </span>
        </div>
        <FaShoppingBag className="text-base md:text-lg lg:text-xl hover:text-gray-300 cursor-pointer" />
        <div
          className="text-base md:text-lg lg:text-xl hover:text-gray-300 cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="fixed inset-0 bg-gradient-to-b from-[#12104A] to-[#000] text-white flex flex-col items-center justify-start md:hidden z-40 p-5 space-y-5 pt-10">
          {/* Close Icon */}
          <div className="self-end mb-5 pr-5">
            <FaTimes
              className="text-2xl cursor-pointer hover:text-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>

          {/* Navigation Links */}
          {navItems.map((navItem, idx) => (
            <Link
              key={idx}
              href={navItem.link}
              className="text-lg font-medium w-full text-center py-2 hover:bg-[#1a1a5a] rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {navItem.name}
            </Link>
          ))}

          {/* Dropdown Items for "More" Section */}
          <div className="space-y-2 mt-5">
            <span className="text-lg font-medium">More</span>
            {dropdownItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="text-base block px-4 py-2 hover:bg-[#1a1a5a] rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};