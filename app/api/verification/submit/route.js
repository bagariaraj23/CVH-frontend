// app/api/verification/submit/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(req) {
    const { walletAddress, role, details } = await req.json();
    console.log("data in server:", walletAddress + " " + role + " " + details);

    try {
        const newRequest = await prisma.verificationRequest.create({
            data: { walletAddress, role, details },
        });

        return new Response(
            JSON.stringify({ message: "Verification request submitted.", id: newRequest.id }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating verification request:", error);
        return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
    }
}
