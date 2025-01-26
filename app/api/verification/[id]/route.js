import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
    try {
        // Await the params before using them
        const { id } = await params;

        const { status } = await request.json();

        // First find the verification request
        const verificationRequest = await prisma.verificationRequest.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!verificationRequest) {
            return NextResponse.json({
                success: false,
                message: "Verification request not found"
            }, { status: 404 });
        }

        // Update the verification request status
        const updatedRequest = await prisma.verificationRequest.update({
            where: { id },
            data: {
                status,
                updatedAt: new Date()
            }
        });

        // Update the user status
        await prisma.user.update({
            where: { id: verificationRequest.userId },
            data: { status }
        });

        // If the status is 'verified', create corresponding role-specific entry
        if (status === 'verified') {
            const { role, name, specialization, licenseNumber, address, registrationId, walletAddress } = verificationRequest;

            switch (role) {
                case 'DOCTOR':
                    await prisma.doctor.create({
                        data: {
                            id: verificationRequest.userId,
                            walletAddress,
                            name,
                            specialization,
                            licenseNumber,
                            verified: true,
                            details: verificationRequest.details
                        }
                    });
                    break;

                case 'HOSPITAL':
                    await prisma.hospital.create({
                        data: {
                            id: verificationRequest.userId,
                            walletAddress,
                            name,
                            address,
                            registrationId,
                            verified: true,
                            details: verificationRequest.details
                        }
                    });
                    break;

                case 'PATIENT':
                    await prisma.patient.create({
                        data: {
                            id: verificationRequest.userId,
                            walletAddress,
                            name,
                            details: verificationRequest.details
                        }
                    });
                    break;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Verification status updated to ${status}`
        });

    } catch (error) {
        console.error('Error updating verification:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to update verification status"
        }, { status: 500 });
    }
}