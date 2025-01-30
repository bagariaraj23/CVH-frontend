// /app/api/subscription/check/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { walletAddress } = await request.json();
        if (!walletAddress) {
            return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
        }

        // 1. Find user by walletAddress
        const user = await prisma.user.findUnique({
            where: { walletAddress },
            // We join the related Patient, and load PremiumSubscription if it exists
            include: {
                patient: {
                    include: {
                        premiumSubscription: true
                    }
                }
            }
        });

        // If user not found, no subscription
        if (!user) {
            return NextResponse.json({ isPremium: false });
        }

        // 2. Check if user is a Patient with an active PremiumSubscription
        const premiumSub = user.patient?.premiumSubscription;
        if (!premiumSub) {
            // No subscription record
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