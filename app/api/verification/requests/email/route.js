// app/api/verification/requests/route.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

// Handle requests to fetch all verification requests or check the status of a specific request.
export async function GET(req) {
    try {
        // Modified to only fetch pending requests
        const requests = await prisma.verificationRequest.findMany({
            where: {
                status: 'pending'  // Only get requests with pending status
            }
        });

        console.log("Fetched pending verification requests:", requests);
        return new Response(JSON.stringify(requests), { status: 200 });
    } catch (error) {
        console.error("Error fetching verification requests:", error);
        return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Email is required"
            }, { status: 400 });
        }

        // First find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                verificationRequests: true // Include the latest verification request
            }
        });

        if (!user) {
            return NextResponse.json({
                status: "not-found",
                message: "No user found with this email."
            }, { status: 404 });
        }

        // Get the latest verification request
        const verificationRequest = user.verificationRequests[user.verificationRequests.length - 1];

        if (!verificationRequest) {
            return NextResponse.json({
                status: "not-found",
                message: "No verification request found."
            });
        }

        if (verificationRequest.status === "verified") {
            // If verified, return role information
            return NextResponse.json({
                status: "verified",
                role: user.role.toLowerCase(),
                message: "User is verified."
            });
        } else if (verificationRequest.status === "not_verified") {
            return NextResponse.json({
                status: "not_verified",
                message: "Verification request was rejected."
            });
        } else if (verificationRequest.status === "pending") {
            return NextResponse.json({
                status: "pending",
                message: "Verification request is still under review."
            });
        }

        return NextResponse.json({
            status: verificationRequest.status,
            message: "Verification status retrieved successfully."
        });
        
    } catch (error) {
        console.error('Error checking verification status:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to check verification status",
            error: error.message
        }, { status: 500 });
    }
}