"use client";
import { useEffect, useState } from "react";
import { fetchVerificationRequests, updateVerificationStatus } from "@/app/utils/api";

export default function AdminVerificationRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadRequests() {
            setLoading(true);
            setError(null);
            try {
                console.log("Admin is fetching verification requests...");
                const data = await fetchVerificationRequests();
                setRequests(data);
            } catch (err) {
                console.error("Error fetching verification requests:", err);
                setError("Failed to load verification requests.");
            } finally {
                setLoading(false);
            }
        }
        loadRequests();
    }, []);

    const handleVerification = async (id, status) => {
        if (window.confirm(`Are you sure you want to mark this request as ${status}?`)) {
            setError(null);
            try {
                console.log("Admin updating the status : ", status, " for the request ID: ", id);
                await updateVerificationStatus(id, status);
                setRequests((prev) => prev.filter((req) => req.id !== id));
            } catch (err) {
                console.error(`Error updating verification status for ID ${id}:`, err);
                setError("Failed to update verification status. Please try again.");
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen p-6 bg-gray-50">Loading...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen p-6 bg-gray-50">
                <h1 className="text-3xl font-bold mb-6">Verification Requests</h1>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Verification Requests</h1>
            {requests.length === 0 ? (
                <p>No verification requests at the moment.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
                            <div>
                                <p><strong>Wallet Address:</strong> {req.walletAddress}</p>
                                <p><strong>Role:</strong> {req.role}</p>
                                <p><strong>Details:</strong> {req.details || "N/A"}</p>
                            </div>
                            <div className="space-x-4">
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                                    onClick={() => handleVerification(req.id, "verified")}
                                >
                                    Verify
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                    onClick={() => handleVerification(req.id, "not_verified")}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
