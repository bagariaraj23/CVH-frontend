"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitVerificationRequest } from "@/app/utils/api";

export default function VerificationForm() {
    const [formData, setFormData] = useState({
        walletAddress: "",
        role: "DOCTOR",
        details: "",
        // Doctor fields
        name: "",
        specialization: "",
        licenseNumber: "",
        // Hospital fields
        address: "",
        registrationId: "",
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await submitVerificationRequest(formData);

            if (response.success) {
                router.push("/user/under-review");
            } else {
                alert(response.message || "Failed to submit verification request");
            }
        } catch (error) {
            alert("Error submitting verification request");
        }
    };

    const renderRoleSpecificFields = () => {
        switch (formData.role) {
            case "DOCTOR":
                return (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                        <input
                            type="text"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            placeholder="Specialization"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                        <input
                            type="text"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            placeholder="License Number"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                    </>
                );
            case "HOSPITAL":
                return (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Hospital Name"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Hospital Address"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                        <input
                            type="text"
                            name="registrationId"
                            value={formData.registrationId}
                            onChange={handleChange}
                            placeholder="Registration ID"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                    </>
                );
            case "PATIENT":
                return (
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="mt-1 p-2 w-full rounded border"
                        required
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#A8C8FF] to-[#FFDEFF] text-white p-4">
            <div className="bg-white text-blue-900 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Verification Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="walletAddress"
                            value={formData.walletAddress}
                            onChange={handleChange}
                            placeholder="Wallet Address"
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                    </div>
                    <div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full rounded border"
                        >
                            <option value="DOCTOR">Doctor</option>
                            <option value="HOSPITAL">Hospital</option>
                            <option value="PATIENT">Patient</option>
                        </select>
                    </div>
                    {renderRoleSpecificFields()}
                    <div>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Additional Details"
                            className="mt-1 p-2 w-full rounded border"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-900 text-white rounded hover:bg-blue-800"
                    >
                        Submit for Verification
                    </button>
                </form>
            </div>
        </div>
    );
}
