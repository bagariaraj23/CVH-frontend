// app/utils/paystack-verify.js
import axios from 'axios';

/**
 * Calls the Paystack verify endpoint using the 'reference' returned upon successful payment.
 * Returns the entire 'data.data' if the transaction was found and 'status' is 'success', otherwise null.
 *
 * @param {string} reference - The reference returned by Paystack after payment
 * @returns {object|null} - The verified transaction data or null if not verified
 */
export async function verifyPaystackPayment(reference) {
    try {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            throw new Error("Paystack secret key not found in environment variables.");
        }

        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${secretKey}`
            }
        });

        // If Paystack responded with a successful verification
        if (data.status && data.data && data.data.status === 'success') {
            return data.data;  // All transaction details
        }
        return null;
    } catch (err) {
        console.error('Error verifying Paystack payment:', err.message);
        return null;
    }
}
