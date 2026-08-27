import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string separated by '||'. These questions are for an anonymous messaging platform like NGL. Example Format: 'What's a hobby you've always wanted to try?||If you could have dinner with any historical figure, who would it be?||What's a simple pleasure that makes your day better?'.";

        const result = streamText({
            model: openai('gpt-4o-mini'),
            prompt,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('Error generating suggestions:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred while generating suggestions.' },
            { status: 500 }
        );
    }
}
