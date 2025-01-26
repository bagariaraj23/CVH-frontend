// app/api/verification/submit/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();
        // Ensure wallet address is lowercase
        data.walletAddress = data.walletAddress.toLowerCase();

        console.log("Received verification request data:", data);

        // Check if a verification request already exists
        const existingRequest = await prisma.verificationRequest.findFirst({
            where: { walletAddress: data.walletAddress }
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
            where: { walletAddress: data.walletAddress },
            update: {
                role: data.role,
                status: 'pending',
                details: data.details
            },
            create: {
                walletAddress: data.walletAddress,
                role: data.role,
                status: 'pending',
                details: data.details
            }
        });
        console.log("User created/updated:", user);

        // Create or update verification request
        const verificationRequest = existingRequest
            ? await prisma.verificationRequest.update({
                where: { id: existingRequest.id },
                data: {
                    role: data.role,
                    details: data.details,
                    status: 'pending',
                    name: data.name,
                    specialization: data.specialization,
                    licenseNumber: data.licenseNumber,
                    address: data.address,
                    registrationId: data.registrationId,
                    premiumUser: false,
                    userId: user.id
                }
            })
            : await prisma.verificationRequest.create({
                data: {
                    walletAddress: data.walletAddress,
                    role: data.role,
                    details: data.details,
                    name: data.name,
                    specialization: data.specialization,
                    licenseNumber: data.licenseNumber,
                    address: data.address,
                    registrationId: data.registrationId,
                    premiumUser: false,
                    userId: user.id
                }
            });
        console.log("Verification request created/updated:", verificationRequest);

        return NextResponse.json({
            success: true,
            message: "Verification request submitted successfully",
            request: verificationRequest
        });

    } catch (error) {
        console.error('Error submitting verification request:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to submit verification request",
            error: error.message
        }, { status: 500 });
    }
}
