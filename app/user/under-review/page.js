"use client";
import { useEffect, useState } from "react";
import { checkVerificationStatus } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function UnderReview() {
    const [error, setError] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask not installed. Please install MetaMask to proceed.");
            setError("MetaMask not installed. Please install MetaMask to proceed.");
            return;
        }

        try {
            setLoading(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const address = accounts[0];
            await verifyStatus(address);
        } catch (err) {
            alert("Failed to connect wallet. Please try again.");
            setError("Failed to connect wallet. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const verifyStatus = async (walletAddress) => {
        try {
            const response = await checkVerificationStatus(walletAddress);

            if (response.status === "verified") {
                const { role } = response;

                switch (role) {
                    case "doctor":
                        router.push(`/DoctorPanel`);
                        break;
                    case "hospital":
                        router.push(`/HospitalPanel`);
                        break;
                    case "admin":
                        router.push(`/AdminPanel`);
                        break;
                    case "patient":
                        router.push(`/PatientPanel`);
                        break;
                    default:
                        console.warn(`Unknown role: ${role}`);
                        setError("Unexpected role. Please contact support.");
                }
            } else if (response.status === "not_verified") {
                router.push(`/user/not-verified`);
            } else if (response.status === "not-found") {
                toast.info(
                    `The Verification request for the user with walletAddress: ${walletAddress} not found. Please fill out the verification form to continue!`,
                    {
                        position: "top-right",
                        autoClose: 5000
                    }
                );
                router.push(`/user/verification`);
            } else if (response.status === "pending") {
                toast.info(
                    `The Verification request for the user with walletAddress: ${walletAddress} is still Pending.`,
                    {
                        position: "top-right",
                        autoClose: 5000
                    }
                );
                router.push(`/user/pending`);
            } else {
                console.warn("Unexpected status:", response.status);
                setError("Unexpected verification status. Please contact support.");
            }
        } catch (err) {
            console.error("Error checking verification status:", err);
            setError("Failed to check verification status. Please try again.");
        }
    };


    // useEffect(() => {
    //     async function verifyStatus() {
    //         try {
    //             const wallet = walletAddress;
    //             const response = await checkVerificationStatus(wallet);

    //             if (response.status === "verified") {
    //                 router.push(`/user/dashboard`);
    //             } else if (response.status === "not_verified") {
    //                 router.push(`/user/not-verified`);
    //             } else {
    //                 router.push(`/user/verification`);
    //             }
    //         } catch (err) {
    //             console.error("Error checking verification status:", err);
    //             setError("Failed to check verification status. Please try again.");
    //         }
    //     }
    //     verifyStatus();
    // }, [router]);



    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-8 bg-white shadow-lg rounded-md text-center max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
                <p className="text-lg text-gray-700 mb-6">
                    Click below to check your verification status:
                </p>
                <button
                    onClick={connectWallet}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-lg font-semibold shadow hover:bg-blue-500 transition duration-200"
                >
                    Check Verification Status
                </button>
            </div>
        </div>
    );

}
