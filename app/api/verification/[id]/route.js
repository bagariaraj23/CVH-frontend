// import prisma from "@/prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// export async function PATCH(req, { params }) {
//     const { id } = params;
//     const { status } = await req.json();
//     console.log("api/verification/[id]:", id + " " + status);
//     const verification = await prisma.verificationRequest.update({
//         where: { id },
//         data: { status },
//     });

//     console.log("Verification updated:", verification);

//     if (status === "verified") {
//         await prisma.user.create({
//             data: {
//                 walletAddress: verification.walletAddress,
//                 role: verification.role,
//             },
//         });
//     }

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
// }
export async function PATCH(req, context) {
    const { params } = context;
    const { id } = params;
    const { status } = await req.json();

    console.log("api/verification/[id]:", id, status);

    // Update verification request
    const verification = await prisma.verificationRequest.update({
        where: { id },
        data: { status },
    });

    console.log("Verification updated:", verification);

    if (status === "verified") {
        if (!verification.walletAddress || !verification.role) {
            return new Response(
                JSON.stringify({ error: "Invalid verification data" }),
                { status: 400 }
            );
        }

        // Create user
        await prisma.user.create({
            data: {
                walletAddress: verification.walletAddress,
                role: verification.role,
            },
        });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
