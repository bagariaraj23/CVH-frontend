// app/api/verification/submit/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();

        console.log(data);

        // Check if a verification request already exists
        const existingRequest = await prisma.verificationRequest.findFirst({
            where: { email: data.email }
        });

        // If request exists and status isn't 'not_verified', return error
        if (existingRequest && existingRequest.status !== 'not_verified') {
            return NextResponse.json({
                success: false,
                message: "A verification request already exists for this email address"
            });
        }

        // Create or update user
        const user = await prisma.user.upsert({
            where: { email: data.email },
            update: {
                role: data.role,
                status: 'pending',
                details: data.details
            },
            create: {
                email: data.email,
                role: data.role,
                status: 'pending',
                details: data.details
            }
        });

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
                    email: data.email,
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
