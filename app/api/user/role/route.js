// app/api/user/role/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
    const { walletAddress } = await req.json();

    try {
        // Check user in the database
        const user = await prisma.user.findUnique({
            where: { walletAddress },
            select: {
                role: true,
                status: true
            },
        });

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
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
