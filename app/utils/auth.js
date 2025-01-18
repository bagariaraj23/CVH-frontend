import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkPremiumAccess(walletAddress) {
    try {
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

        if (!user || !user.patient?.premiumSubscription) {
            return false;
        }

        const subscription = user.patient.premiumSubscription;
        const now = new Date();
        return subscription.active && subscription.endDate > now;
    } catch (error) {
        console.error('Premium access check error:', error);
        return false;
    }
} 