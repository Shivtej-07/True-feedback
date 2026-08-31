import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const fallbackSuggestionsPool = [
    [
        "What's a hobby you've always wanted to try?",
        "If you could have dinner with any historical figure, who would it be?",
        "What's a simple pleasure that makes your day better?"
    ],
    [
        "What's the best advice you've ever received?",
        "If you could travel anywhere right now, where would you go?",
        "What's something you're really passionate about?"
    ],
    [
        "What's your favorite memory from this past year?",
        "If you could have one superpower, what would it be?",
        "What song has been on repeat for you lately?"
    ],
    [
        "What's a movie or book that changed your perspective?",
        "What's one thing on your bucket list you want to accomplish soon?",
        "What's your secret talent that not many people know about?"
    ]
];

function getRandomFallback(): string {
    const randomIndex = Math.floor(Math.random() * fallbackSuggestionsPool.length);
    return fallbackSuggestionsPool[randomIndex].join('||');
}

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            text: getRandomFallback(),
            isFallback: true,
            warning: 'GEMINI_API_KEY is missing. Please add it to .env or Vercel Environment Variables.'
        });
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string separated by '||'. These questions are for an anonymous messaging platform like NGL. Example Format: 'What's a hobby you've always wanted to try?||If you could have dinner with any historical figure, who would it be?||What's a simple pleasure that makes your day better?'.";

        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
        });

        const text = response.text || getRandomFallback();
        return NextResponse.json({ text });
    } catch (error: any) {
        console.error('Error generating AI suggestions:', error?.message || error);
        return NextResponse.json({
            text: getRandomFallback(),
            isFallback: true,
            warning: `Gemini API Error: Invalid or unauthenticated API key. Please set a valid GEMINI_API_KEY (starts with AIzaSy) in Google AI Studio.`
        });
    }
}


