import { prisma } from "@/lib/prisma";

export async function PATCH(request, { params }) {
    try {
        const id = await params.id;
        const { status } = await request.json();

        // First update the user verification status
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { status }
        });

        console.log(`api/verification/${id}: ${status}`);

        // If the user is verified, create entry in respective role table
        if (status === 'verified') {
            const {
                role,
                walletAddress,
                details,
                name,
                licenseNumber,
                specialization,
                address,
                registrationId,
                premiumUser
            } = updatedUser;

            switch (role.toLowerCase()) {
                case 'doctor':
                    await prisma.doctor.create({
                        data: {
                            walletAddress,
                            name: name || '',
                            specialization: specialization || '',
                            details,
                            licenseNumber: licenseNumber || '',
                            verified: true
                        }
                    });
                    break;

                case 'hospital':
                    await prisma.hospital.create({
                        data: {
                            walletAddress,
                            name: name || '',
                            address: address || '',
                            registrationId: registrationId || '',
                            details,
                            verified: true
                        }
                    });
                    break;

                case 'patient':
                    await prisma.patient.create({
                        data: {
                            walletAddress,
                            name: name || '',
                            premiumUser: premiumUser || false,
                            details
                        }
                    });
                    break;
            }
        }

        console.log("Verification updated:", updatedUser);

        return Response.json(updatedUser);
    } catch (error) {
        console.error("Error updating verification:", error);
        return Response.json(
            { error: "Failed to update verification status" },
            { status: 500 }
        );
    }
}
