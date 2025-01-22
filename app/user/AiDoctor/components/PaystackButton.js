'use client';
import { usePaystackPayment } from 'react-paystack';
import { FaCrown } from 'react-icons/fa';

export default function PaystackButton() {
    const config = {
        reference: new Date().getTime().toString(),
        email: "user@example.com", // You should get this from user's session
        amount: 500000, // Amount in kobo (₦5000)
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        metadata: {
            custom_fields: [
                {
                    display_name: "Premium Access",
                    variable_name: "premium_access",
                    value: "voice_features"
                }
            ]
        }
    };

    const onSuccess = async (reference) => {
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reference: reference.reference })
            });

            const data = await response.json();
            if (data.success) {
                alert('Payment successful! You now have access to premium features.');
                // Refresh the page or update user's premium status
                window.location.reload();
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    };

    const onClose = () => {
        alert('Payment cancelled');
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <button
            onClick={() => initializePayment(onSuccess, onClose)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md"
        >
            <FaCrown className="text-xl" />
            <span>Upgrade to Premium</span>
        </button>
    );
}