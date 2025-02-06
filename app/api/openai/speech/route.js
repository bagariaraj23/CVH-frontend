import { NextResponse } from 'next/server';
import { openai, MEDICAL_SYSTEM_PROMPT } from '@/app/utils/openai-config';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { checkPremiumAccess } from '@/app/utils/auth';
import fs from 'fs';

const TMP_DIR = join(process.cwd(), 'tmp');
const STRUCTURED_PROMPT = `
You are an AI medical assistant. Analyze the patient's symptoms and provide a structured response with the following sections:
1. Symptoms Analysis: List and analyze the reported symptoms
2. Possible Conditions: List potential conditions with brief descriptions
3. Severity Assessment: Indicate the level of concern (Low/Moderate/High)
4. Recommended Actions: Immediate steps the patient should take
5. Home Remedies: Safe remedies that can help
6. Warning Signs: Symptoms that would require immediate medical attention
7. Follow-up Recommendations: Whether and when to see a doctor

For speech responses, provide a concise version focusing on the most critical information.
Keep the response clear and conversational but professional.
`;

export async function POST(request) {
    try {
        // Check premium access
        const walletAddress = request.headers.get('wallet-address');
        if (!walletAddress) {
            return NextResponse.json({ error: 'Wallet address required' }, { status: 401 });
        }

        const hasAccess = await checkPremiumAccess(walletAddress);
        if (!hasAccess) {
            return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 });
        }

        const formData = await request.formData();
        const audioFile = formData.get('audio');
        const mode = formData.get('mode');
        const isFollowUp = formData.get('isFollowUp') === 'true';

        if (!audioFile) {
            return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
        }

        // Ensure the tmp directory exists
        await mkdir(TMP_DIR, { recursive: true });

        const bytes = await audioFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = join(TMP_DIR, `${Date.now()}.wav`);
        await writeFile(tempPath, buffer);

        try {
            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream(tempPath),
                model: "whisper-1",
            });

            const messages = [
                { role: "system", content: isFollowUp ? MEDICAL_SYSTEM_PROMPT : STRUCTURED_PROMPT },
                { role: "user", content: transcription.text }
            ];

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                temperature: 0.7,
                max_tokens: isFollowUp ? 200 : 800,
            });

            const response = completion.choices[0]?.message?.content || 'No response available';

            if (mode === 'speech-to-speech') {
                const sections = response.split('\n\n');
                const audioResponse = sections
                    .map(section => section.replace(/^[#*-]\s*|^\d\.\s*/gm, ''))
                    .join(' ');

                const speechResponse = await openai.audio.speech.create({
                    model: "tts-1",
                    voice: "alloy",
                    input: audioResponse,
                    speed: 1.0,
                });

                const audioBuffer = await speechResponse.arrayBuffer();
                const audioUrl = `data:audio/mp3;base64,${Buffer.from(audioBuffer).toString('base64')}`;

                return NextResponse.json({
                    transcription: transcription.text,
                    response,
                    audioResponse,
                    audioUrl
                });
            }

            return NextResponse.json({ transcription: transcription.text, response });
        } finally {
            await unlink(tempPath).catch(err => console.error('Failed to clean up temp file:', err));
        }
    } catch (error) {
        console.error('Speech API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process speech request', details: error.message },
            { status: 500 }
        );
    }
}
