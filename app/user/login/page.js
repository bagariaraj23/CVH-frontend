// "use client";
// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { useRouter } from "next/navigation";
// import { checkUserRole } from "@/app/utils/api";

// export default function LoginPage() {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const connectWallet = async () => {
//       if (!window.ethereum) {
//         setError("MetaMask not installed. Please install MetaMask to proceed.");
//         return;
//       }

//       try {
//         setLoading(true);
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         const address = accounts[0];
//         setWalletAddress(address);
//         await handleRoleCheck(address);
//       } catch (err) {
//         setError("Failed to connect wallet. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const handleRoleCheck = async (address) => {
//       try {
//         const response = await checkUserRole(address);
//         switch (response.role) {
//           case "admin":
//             router.push("/admin/dashboard");
//             break;
//           case "doctor":
//             router.push("/doctor/dashboard");
//             break;
//           case "hospital":
//             router.push("/hospital/dashboard");
//             break;
//           case "patient":
//             router.push("/patient/dashboard");
//             break;
//           default:
//             router.push("/user/verification");
//         }
//       } catch (err) {
//         console.error("Error in handleRoleCheck:", err);
//         setError("Unable to check user role. Try again later.");
//       }
//     };

//   // const connectWallet = async () => {
//   //   if (!window.ethereum) {
//   //     setError("MetaMask not installed. Please install MetaMask to proceed.");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const accounts = await window.ethereum.request({
//   //       method: "eth_requestAccounts",
//   //     });
//   //     const walletAddress = accounts[0];
//   //     const response = await checkUserRole(walletAddress);

//   //     switch (response.role) {
//   //       case "admin":
//   //         router.push("/admin/dashboard");
//   //         break;
//   //       case "doctor":
//   //         router.push("/doctor/dashboard");
//   //         break;
//   //       case "hospital":
//   //         router.push("/hospital/dashboard");
//   //         break;
//   //       case "patient":
//   //         router.push("/patient/dashboard");
//   //         break;
//   //       case "under_review":
//   //         router.push("/user/under-review");
//   //         break;
//   //       default:
//   //         router.push("/user/verification");
//   //     }
//   //   } catch (err) {
//   //     console.error("Error connecting wallet or checking role:", err);
//   //     setError("Unable to login. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="p-6 bg-white shadow rounded-md max-w-md w-full text-center">
//         <h1 className="text-2xl font-bold mb-4">Login with MetaMask</h1>
//         {error && <p className="text-red-600 mb-4">{error}</p>}
//         <button
//           onClick={connectWallet}
//           disabled={loading}
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
//         >
//           {loading ? "Connecting..." : "Connect Wallet"}
//         </button>
//       </div>
//     </div>
//   );
// }
