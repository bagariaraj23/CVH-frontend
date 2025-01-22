import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { reference } = await req.json();

        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (data.status && data.data.status === 'success') {
            // Here you should update your database to mark the user as premium
            // await db.user.update({ ... })

            return NextResponse.json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Payment verification failed'
            }, { status: 400 });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}