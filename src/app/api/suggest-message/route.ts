import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string separated by '||'. These questions are for an anonymous messaging platform like NGL. Example Format: 'What's a hobby you've always wanted to try?||If you could have dinner with any historical figure, who would it be?||What's a simple pleasure that makes your day better?'.";

        const hasOpenAI = !!process.env.OPENAI_API_KEY;
        const hasGemini = !!(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY);

        if (!hasOpenAI && !hasGemini) {
            return NextResponse.json(
                { error: 'AI API key missing. Please add GEMINI_API_KEY or OPENAI_API_KEY to your .env file.' },
                { status: 500 }
            );
        }

        let text = '';
        if (hasGemini) {
            const response = await generateText({
                model: google('gemini-1.5-flash'),
                prompt,
            });
            text = response.text;
        } else {
            const response = await generateText({
                model: openai('gpt-4o-mini'),
                prompt,
            });
            text = response.text;
        }

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error('Error generating suggestions:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred while generating suggestions.' },
            { status: 500 }
        );
    }
}
