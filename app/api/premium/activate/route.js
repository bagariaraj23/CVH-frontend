// app/api/premium/activate/route.js
import { NextResponse } from 'next/server';
import { verifyPaystackPayment } from '@/app/utils/paystack-verify';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { walletAddress, email, reference } = await request.json();

        if (!walletAddress || !reference) {
            return NextResponse.json({ error: 'Missing walletAddress or reference' }, { status: 400 });
        }

        // 1. Verify with Paystack
        const paystackData = await verifyPaystackPayment(reference);

        if (!paystackData) {
            return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
        }

        // 2. Find user by walletAddress or fallback to email
        let user = await prisma.user.findUnique({
            where: { walletAddress },
            include: {
                patient: {
                    include: { premiumSubscription: true }
                }
            }
        });

        if (!user && email) {
            user = await prisma.user.findUnique({
                where: { email },
                include: {
                    patient: {
                        include: { premiumSubscription: true }
                    }
                }
            });
        }

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 3. Mark user as premium
        await prisma.user.update({
            where: { id: user.id },
            data: {
                premium: true
            }
        });

        // 4. Upsert a PremiumSubscription if they are a patient
        if (user.patient) {
            const now = new Date();
            const endDate = new Date();
            // e.g. 1 month subscription
            endDate.setMonth(endDate.getMonth() + 1);

            await prisma.premiumSubscription.upsert({
                where: { patientId: user.patient.id },
                update: {
                    active: true,
                    subscriptionType: 'monthly',
                    startDate: now,
                    endDate,
                    updatedAt: new Date()
                },
                create: {
                    patientId: user.patient.id,
                    subscriptionType: 'monthly',
                    startDate: now,
                    endDate,
                    features: ['speech-to-text', 'speech-to-speech', 'premium-support', 'bookings and appointments'],
                    active: true
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error activating premium:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
