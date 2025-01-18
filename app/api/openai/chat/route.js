import { NextResponse } from 'next/server';
import { openai, MEDICAL_SYSTEM_PROMPT } from '@/app/utils/openai-config';

export async function POST(request) {
    try {
        const { message } = await request.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: MEDICAL_SYSTEM_PROMPT
                },
                { role: "user", content: message }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;

        // Parse response into structured format
        const sections = {
            conditions: response.match(/Likely conditions:(.*?)(?=Severity level:|$)/s)?.[1]?.trim(),
            severity: response.match(/Severity level:(.*?)(?=Recommended next steps:|$)/s)?.[1]?.trim(),
            nextSteps: response.match(/Recommended next steps:(.*?)(?=Red flag symptoms:|$)/s)?.[1]?.trim(),
            redFlags: response.match(/Red flag symptoms:(.*?)(?=Disclaimer:|$)/s)?.[1]?.trim(),
            disclaimer: response.match(/Disclaimer:(.*?)$/s)?.[1]?.trim()
        };

        return NextResponse.json({
            response,
            structured: sections
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({
            error: 'Failed to process chat request',
            details: error.message
        }, { status: 500 });
    }
} 