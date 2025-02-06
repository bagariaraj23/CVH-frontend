// app/api/premium/activate/route.js
import { NextResponse } from 'next/server';
import { verifyPaystackPayment } from '@/app/utils/paystack-verify';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { walletAddress, email, name, password, reference } = await request.json();
        console.log("Wallet Address:", walletAddress);
        console.log("email:", email);
        console.log("name:", name);
        console.log("password:", password);
        console.log("reference:", reference);

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

        // 3. Update the user with the new name/email if needed
        // If user already has name/email, decide if you want to overwrite or skip
        let updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                premium: true,                // Activate premium
                name: user.name || name,      // If user.name is null, set from form
                email: user.email || email,   // If user.email is null, set from form
                // For password, you'd need a "password" column or a separate Auth table if you want to store it.
            }
        });

        // 4. If they are a patient, update the patient table too
        if (user.patient) {
            // If the patient doesn't have name or details, fill from the form
            await prisma.patient.update({
                where: { id: user.id }, // same ID as the user
                data: {
                    walletAddress: user.patient.walletAddress || walletAddress.toLowerCase(),
                    name: user.patient.name || name,
                    details: user.patient.details || '',
                }
            });
        }

        // 5. Upsert a PremiumSubscription if they are a patient
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
