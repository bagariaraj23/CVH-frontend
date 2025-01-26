"use client";
import { useRouter } from "next/navigation";

export default function NotVerifiedPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-md text-center max-w-md">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Not Verified</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, you are not verified. Please submit the verification request again!
                </p>
                <button
                    onClick={() => router.push("/user/verification")}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-lg font-semibold shadow hover:bg-blue-500 transition duration-200"
                >
                    Fill Verification Form Again
                </button>
            </div>
        </div>
    );
}
