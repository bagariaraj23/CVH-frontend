// app/api/premium/paystack-webhook/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyPaystackPayment } from '@/app/utils/paystack-verify';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Paystack sends a POST with JSON containing at least:
 *  { event: 'charge.success', data: { reference, ... } }
 * We'll parse the reference, verify it, and update the user if needed.
 */
export async function POST(request) {
    try {
        // If you want to verify the signature, you'd parse the raw body
        // and compare with 'x-paystack-signature'. This is optional but recommended.
        // 1. read raw body as text
        const rawBody = await request.text();

        // 2. get signature from headers
        const signature = request.headers.get('x-paystack-signature');
        const secret = process.env.PAYSTACK_SECRET_KEY;

        // 3. compute HMAC
        const expectedSignature = crypto
            .createHmac('sha512', secret)
            .update(rawBody, 'utf8')
            .digest('hex');

        if (signature !== expectedSignature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
        }

        // If we pass here, the body is from Paystack
        // 4. parse the JSON body ourselves
        const data = JSON.parse(rawBody);
        const event = data.event; // e.g. "charge.success"
        const ref = data.data.reference;

        if (event !== 'charge.success') {
            return NextResponse.json({ status: 'ignored', reason: 'Not a charge.success event' }, { status: 200 });
        }

        const reference = data.reference;
        if (!reference) {
            return NextResponse.json({ error: 'No reference found in payload' }, { status: 400 });
        }

        // 1. Verify with Paystack
        const paystackData = await verifyPaystackPayment(reference);
        if (!paystackData) {
            // If verification fails, ignore or log an error
            return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
        }

        // At this point, we have paystackData with e.g. paystackData.metadata or paystackData.customer.email
        const { email } = paystackData.customer;

        // 2. Find user in DB by email or other metadata
        let user = await prisma.user.findUnique({
            where: { email },
            include: {
                patient: {
                    include: { premiumSubscription: true }
                }
            }
        });

        // If user not found by email, you might store user info in metadata
        // e.g., const walletAddress = paystackData.metadata?.walletAddress;
        // and do a fallback findUnique by walletAddress

        if (!user) {
            // Could create a new user or just ignore
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 3. Mark user as premium
        await prisma.user.update({
            where: { id: user.id },
            data: {
                premium: true
            }
        });

        // 4. Upsert subscription if user is a patient
        if (user.patient) {
            const now = new Date();
            const endDate = new Date();
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
                    features: ['speech-to-text', 'speech-to-speech'],
                    active: true
                }
            });
        }

        // Return 200 so Paystack knows we processed it
        return NextResponse.json({ status: 'ok' }, { status: 200 });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}