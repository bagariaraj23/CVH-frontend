"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitVerificationRequest } from "@/app/utils/api";

export default function VerificationForm() {
    const [role, setRole] = useState("doctor");
    const [walletAddress, setWalletAddress] = useState("");
    const [details, setDetails] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("wallet address, role and verif. details:", walletAddress + " " + role + " " + details );
        const response = await submitVerificationRequest({ walletAddress, role, details });
        console.log("Response in user/verification:", JSON.stringify(response));
        
        if (response.message === "Verification request submitted.") {
            router.push("/user/under-review");
        } else {
            alert(response.message || "Failed to submit your verification request.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#A8C8FF] to-[#FFDEFF] text-white p-4">
            <div className="bg-white text-blue-900 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Verification Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="walletAddress" className="block text-sm font-medium text-blue-900">
                            Wallet Address
                        </label>
                        <input
                            type="text"
                            id="walletAddress"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value.toLowerCase())}
                            className="mt-1 p-2 w-full rounded border focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Enter your wallet address"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-blue-900">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 p-2 w-full rounded border bg-white focus:ring focus:ring-blue-300 focus:outline-none"
                        >
                            <option value="doctor">Doctor</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="details" className="block text-sm font-medium text-blue-900">
                            Details
                        </label>
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="mt-1 p-2 w-full rounded border focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Enter your details for verification"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-900 text-white rounded hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                        >
                            Submit for Verification
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
