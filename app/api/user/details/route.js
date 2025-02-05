// app/api/user/details/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
    const url = new URL(req.url);
    const walletAddress = url.searchParams.get('walletAddress');

    console.log(walletAddress);

    if (!walletAddress) {
        return NextResponse.json({ error: 'Missing walletAddress' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { walletAddress: walletAddress.toLowerCase() }
        });
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
