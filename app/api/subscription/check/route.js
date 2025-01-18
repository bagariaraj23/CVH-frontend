import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { walletAddress } = await request.json();

        const user = await prisma.user.findUnique({
            where: { walletAddress },
            include: {
                patient: {
                    include: {
                        premiumSubscription: true
                    }
                }
            }
        });

        if (!user || !user.patient || !user.patient.premiumSubscription) {
            return NextResponse.json({ isPremium: false });
        }

        const subscription = user.patient.premiumSubscription;
        const now = new Date();
        const isActive = subscription.active && subscription.endDate > now;

        return NextResponse.json({
            isPremium: isActive,
            subscription: isActive ? {
                endDate: subscription.endDate,
                type: subscription.subscriptionType,
                features: subscription.features
            } : null
        });

    } catch (error) {
        console.error('Subscription check error:', error);
        return NextResponse.json({
            error: 'Failed to check subscription status'
        }, { status: 500 });
    }
} 