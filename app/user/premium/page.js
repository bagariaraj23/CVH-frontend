"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Dynamically import PaystackButton with no SSR
const PaystackButton = dynamic(() => import("react-paystack").then(mod => mod.PaystackButton), {
    ssr: false
});

const PremiumPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        walletAddress: "",
    });

    const router = useRouter();
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY; // Replace with your Paystack public key


    // If you're charging in USD, confirm your Paystack account supports USD.
    // Paystack uses "amount" in the smallest currency unit (like kobo in NGN).
    // For $9.99 in USD, that typically means 9.99 * 100 = 999 (cents).
    // If your Paystack account is in NGN, you'd have to convert $9.99 => Naira => kobo.
    // For illustration, assume you can do $9.99 => 999 cents:
    const amountInKobo = 14962*100;
    // // 5000 kobo = 50 NGN, or 500,000 kobo = 5000 NGN. Adjust as needed.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Called when Paystack payment is successful
    const onSuccess = async (reference) => {
        console.log("Payment success reference:", reference);

        // 1. Call your /api/premium/activate route
        try {
            const res = await fetch("/api/premium/activate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password, // If you plan to store it
                    walletAddress: formData.walletAddress,
                    reference: reference.reference
                })
            });

            if (!res.ok) {
                throw new Error("Failed to activate premium membership");
            }

            toast.success("Your premium membership is activated!");
            router.push("/user/premium/success");
        } catch (error) {
            console.error("Error activating premium:", error);
            toast.error("Could not activate premium. Please contact support.");
        }
    };

    const onClose = () => {
        toast.info("Payment window closed.");
    };

    const componentProps = {
        email: formData.email,
        amount: amountInKobo,
        metadata: {
            name: formData.name,
            walletAddress: formData.walletAddress,
        },
        publicKey,
        text: "Pay Now",
        onSuccess,
        onClose,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic form submission logic
        toast.success("Form details submitted. Proceed with payment!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 lg:px-20 text-black">
            <h1 className="text-4xl font-bold text-center mb-8">Go Premium</h1>
            <p className="text-center mb-8">
                Unlock exclusive features with our premium membership:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
                <li>Access to speech-to-text and speech-to-speech features</li>
                <li>Priority support</li>
                <li>Exclusive content and updates</li>
            </ul>

            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Full Name
                        </label>
                        <div className="relative mt-1">
                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email Address
                        </label>
                        <div className="relative mt-1">
                            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="walletAddress" className="block text-gray-700 font-medium">
                            Wallet Address
                        </label>
                        <div className="relative mt-1">
                            <FontAwesomeIcon icon={faWallet} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                id="walletAddress"
                                name="walletAddress"
                                value={formData.walletAddress}
                                onChange={handleChange}
                                placeholder="Enter your wallet address"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* We first submit the form (handleSubmit) to show toast, etc. Then user can click Paystack button
                    <button
                        type="submit"
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg shadow-lg transition duration-300"
                    >
                        Submit Details
                    </button> */}

                    {/* Paystack Button */}
                    <PaystackButton
                        {...componentProps}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg transition duration-300"
                    />
                </form>
            </div>
        </div>
    );
};

export default PremiumPage;
