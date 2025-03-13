import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json(); // Parse request body
        const { name, email, password, role, specialization, licenseNumber, address, registrationId, details } = body;

        if (!email || !password || !role || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user based on role
        const userData = {
            name,
            email,
            password: hashedPassword,
            authType: "EMAIL_PASSWORD",
            role,
            details,
        };

        if (role === "DOCTOR") {
            userData.specialization = specialization;
            userData.licenseNumber = licenseNumber;
        } else if (role === "HOSPITAL") {
            userData.address = address;
            userData.registrationId = registrationId;
        }

        // Save user in database
        const user = await prisma.user.create({ data: userData });

        console.log("User registered successfully:", user);

        return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
