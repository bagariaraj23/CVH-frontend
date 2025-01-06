// app/api/verification/submit/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();
        const { walletAddress, role, details, name, specialization, licenseNumber, address, registrationId } = data;

        // Check if a verification request already exists
        const existingRequest = await prisma.verificationRequest.findFirst({
            where: { walletAddress }
        });

        // If request exists and status isn't 'not_verified', return error
        if (existingRequest && existingRequest.status !== 'not_verified') {
            return NextResponse.json({
                success: false,
                message: "A verification request already exists for this wallet address"
            });
        }

        // Create or update user
        const user = await prisma.user.upsert({
            where: { walletAddress },
            update: {
                role,
                status: 'pending',
                details
            },
            create: {
                walletAddress,
                role,
                status: 'pending',
                details
            }
        });

        // Create or update verification request
        const verificationRequest = existingRequest
            ? await prisma.verificationRequest.update({
                where: { id: existingRequest.id },
                data: {
                    role,
                    details,
                    status: 'pending',
                    name,
                    specialization,
                    licenseNumber,
                    address,
                    registrationId,
                    premiumUser: false,
                    userId: user.id
                }
            })
            : await prisma.verificationRequest.create({
                data: {
                    walletAddress,
                    role,
                    details,
                    name,
                    specialization,
                    licenseNumber,
                    address,
                    registrationId,
                    premiumUser: false,
                    userId: user.id
                }
            });

        return NextResponse.json({
            success: true,
            message: "Verification request submitted successfully"
        });

    } catch (error) {
        console.error('Error submitting verification request:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to submit verification request"
        }, { status: 500 });
    }
}
