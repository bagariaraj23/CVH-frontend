import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
        }

        const body = await req.json(); // Parse the request body
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        console.log("User:", user);

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return NextResponse.json({ message: "Login successful", token }, { status: 200 });

    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
