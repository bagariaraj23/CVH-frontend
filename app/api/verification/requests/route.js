// app/api/verification/requests/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// Handle requests to fetch all verification requests or check the status of a specific request.
export async function GET(req) {
    try {
        // console.log("Fetching all verification requests in server verification/requests/route.js: ...");
        const requests = await prisma.verificationRequest.findMany();
        console.log("Fetched all verification requests in server verification/requests/route.js:", requests);
        return new Response(JSON.stringify(requests), { status: 200 });
    } catch (error) {
        console.error("Error fetching verification requests:", error);
        return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
    }
}

// export async function POST(req) {
//     const { walletAddress } = await req.json();
//     // console.log("Wallet address:", walletAddress);
//     try {
//         const request = await prisma.verificationRequest.findFirst({
//             where: { walletAddress },
//         });

//         console.log(request);

//         if (!request) {
//             return new Response(
//                 JSON.stringify({ status: "no_request", message: "No verification request found." }),
//                 { status: 404 }
//             );
//         }

//         return new Response(JSON.stringify(request), { status: 200 });
//     } catch (error) {
//         console.error("Error checking verification status:", error);
//         return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
//     }
// }

export async function POST(req) {
    const { walletAddress } = await req.json();

    try {
        const verificationRequest = await prisma.verificationRequest.findFirst({
            where: { walletAddress },
        });

        if (!verificationRequest) {
            return new Response(
                JSON.stringify({ status: "not-found", message: "No verification request found." }),
                { status: 404 }
            );
        }

        console.log(walletAddress, JSON.stringify(verificationRequest));

        if (verificationRequest.status === "verified") {
            let roleDetails;
            let role = verificationRequest.role.toLowerCase();
            console.log("role:", role);

            if (role === "doctor") {
                roleDetails = await prisma.doctor.findFirst({
                    where: { walletAddress },
                });
                console.log("Inside doc", roleDetails);
            } else if (role === "hospital") {
                roleDetails = await prisma.hospital.findFirst({
                    where: { walletAddress },
                });
                console.log("Inside hosp", roleDetails);
            } else if (role === "admin") {
                roleDetails = await prisma.admin.findFirst({
                    where: { walletAddress },
                });
            } else if (role === "patient") {
                roleDetails = await prisma.patient.findFirst({
                    where: { walletAddress },
                });
            }

            console.log(roleDetails);

            if (roleDetails) {
                return new Response(
                    JSON.stringify({
                        status: "verified",
                        role: verificationRequest.role.toLowerCase(), // Normalize role
                    }),
                    { status: 200 }
                );
            } else {
                return new Response(
                    JSON.stringify({
                        status: "verified",
                        role: "unknown",
                        message: "Role details not found for the verified user.",
                    }),
                    { status: 200 }
                );
            }
        }

        return new Response(
            JSON.stringify({ status: verificationRequest.status, message: "Verification in progress or not verified." }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking verification status:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error." }),
            { status: 500 }
        );
    }
}