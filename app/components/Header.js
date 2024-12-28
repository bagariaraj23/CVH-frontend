"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { ethers } from "ethers";
import { checkUserRole } from "../utils/api"; // API utility to check user role
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [walletAddress, setWalletAddress] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask not installed. Please install MetaMask to proceed.");
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setWalletAddress(address);
      await handleRoleCheck(address);
    } catch (err) {
      if (err.code === 4001) { // User rejected the request
        setError("Connection request denied by user.");
      } else {
        console.error("Error in wallet connection:", err);
        setError("Failed to connect wallet. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleRoleCheck = async (address) => {
    try {
      const response = await checkUserRole(address);
      console.log("Response.role", response, response.role);
      switch (response.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        case "hospital":
          router.push("/hospital/dashboard");
          break;
        case "patient":
          router.push("/patient/dashboard");
          break;
        default:
          router.push("/user/verification");
      }
    } catch (err) {
      console.error("Error in handleRoleCheck:", err);
      setError("Unable to check user role. Try again later.");
    }
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "AI Doctor", link: "/user/AiDoctor" },
    // { name: "Symptom Checker", link: "/user/SymptomChecker" },
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
      <nav className="hidden md:flex space-x-4 lg:space-x-6 text-white font-medium text-base lg:text-lg xl:text-xl">
        {navItems.map((navItem, idx) => (
          <Link key={idx} href={navItem.link} className="hover:text-gray-300">
            {navItem.name}
          </Link>
        ))}

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
          onClick={connectWallet}
        >
          <FaUser className="text-base md:text-lg lg:text-xl hover:text-gray-300" />
          <span className="hidden md:block">
            {walletAddress
              ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Login"}
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

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

// export const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navItems = [
//     { name: "Home", link: "/" },
//     { name: "AI Doctor", link: "/user/AiDoctor" },
//     { name: "Consult a Specialist", link: "/user/consultSpecialist" },
//     { name: "Patient Portal", link: "/user/patientPortal" },
//     { name: "Testimonials", link: "/user/testimonials" },
//     { name: "Contact Us", link: "/user/contactUs" },
//   ];

//   const dropdownItems = [
//     { name: "About Us", link: "/user/aboutUs" },
//     { name: "Blog", link: "/user/blog" },
//     { name: "Privacy Policy", link: "/user/privacyPolicy" },
//     { name: "Terms of Service", link: "/user/termsAndServices" },
//   ];

//   return (
//     <header className="flex items-center justify-between px-5 py-3 bg-[#12104A] text-white shadow-md font-[Poppins] sticky top-0 z-50 sm:px-6 md:px-10 lg:px-12 xl:px-16 md:py-4">
//       <Link href="/" passHref>
//         <div className="flex items-center cursor-pointer">
//           <Image
//             src="/img/logo.jpg"
//             alt="CareValue Health Logo"
//             width={140}
//             height={60}
//             quality={100}
//             priority
//           />
//         </div>
//       </Link>

//       <nav className="hidden md:flex space-x-4 lg:space-x-6 text-white font-medium text-base lg:text-lg xl:text-xl">
//         {navItems.map((navItem, idx) => (
//           <Link key={idx} href={navItem.link} className="hover:text-gray-300">
//             {navItem.name}
//           </Link>
//         ))}
//         <div
//           className="relative cursor-pointer"
//           onMouseEnter={() => setIsDropdownOpen(true)}
//           onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//           <span className="hover:text-gray-300">More</span>
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-[#12104A] text-white rounded-md shadow-lg p-3 border border-gray-600">
//               {dropdownItems.map((item, idx) => (
//                 <Link
//                   key={idx}
//                   href={item.link}
//                   className="block px-4 py-2 text-sm lg:text-base font-normal hover:bg-gray-700 hover:text-white rounded"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5 text-white">
//         <FaSearch className="text-base md:text-lg lg:text-xl hover:text-gray-300 cursor-pointer" />
//         <Link href="/user/login" passHref>
//           <div className="flex items-center cursor-pointer space-x-2">
//             <FaUser className="text-base md:text-lg lg:text-xl hover:text-gray-300" />
//             <span className="hidden md:block">Login</span>
//           </div>
//         </Link>
//         <FaShoppingBag className="text-base md:text-lg lg:text-xl hover:text-gray-300 cursor-pointer" />
//         <div
//           className="text-base md:text-lg lg:text-xl hover:text-gray-300 cursor-pointer md:hidden"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <nav className="fixed inset-0 bg-gradient-to-b from-[#12104A] to-[#000] text-white flex flex-col items-center justify-start md:hidden z-40 p-5 space-y-5 pt-10">
//           <div className="self-end mb-5 pr-5">
//             <FaTimes
//               className="text-2xl cursor-pointer hover:text-gray-400"
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//           </div>
//           {navItems.map((navItem, idx) => (
//             <Link
//               key={idx}
//               href={navItem.link}
//               className="text-lg font-medium w-full text-center py-2 hover:bg-[#1a1a5a] rounded"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               {navItem.name}
//             </Link>
//           ))}
//           <div className="space-y-2 mt-5">
//             <span className="text-lg font-medium">More</span>
//             {dropdownItems.map((item, idx) => (
//               <Link
//                 key={idx}
//                 href={item.link}
//                 className="text-base block px-4 py-2 hover:bg-[#1a1a5a] rounded"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </nav>
//       )}
//     </header>
//   );
// };
