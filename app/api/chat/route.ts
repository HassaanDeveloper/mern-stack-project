import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const apiKey = process.env.GEMINI_API_KEY;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    if (geminiResponse.ok) {
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return NextResponse.json({ reply });
    } else {
      console.error('Gemini API Error:', JSON.stringify(data, null, 2));
      return NextResponse.json({ error: 'Something went wrong with Gemini API' }, { status: 500 });
    }
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
