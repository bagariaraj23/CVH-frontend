// app/api/user/role/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
    const { walletAddress } = await req.json();

    try {
        // Check if it's admin address
        if (walletAddress.toLowerCase() === "0x4d5b0Ac9C4148932bd10a28B1E0a064f51f390D4".toLowerCase()) {
            return new Response(JSON.stringify({
                role: "admin",
                status: "verified"
            }), { status: 200 });
        }

        // Check user in the database
        const user = await prisma.user.findUnique({
            where: { walletAddress: walletAddress.toLowerCase() },
            select: {
                role: true,
                status: true
            },
        });

        console.log("User:", user, walletAddress);

        if (user) {
            console.log("User found:", user);
            // Only return role if user is verified
            if (user.status === 'verified') {
                return new Response(JSON.stringify({
                    role: user.role,
                    status: user.status
                }), { status: 200 });
            } else {
                // If user exists but not verified, return status
                return new Response(JSON.stringify({
                    role: "none",
                    status: user.status
                }), { status: 200 });
            }
        } else {
            console.log("User not found");
            return new Response(JSON.stringify({
                role: "none",
                status: "new"
            }), { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        return new Response(JSON.stringify({ 
            error: "Internal server error",
            details: error.message 
        }), { status: 500 });
    }
}
