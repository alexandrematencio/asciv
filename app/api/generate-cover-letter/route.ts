import { NextRequest, NextResponse } from 'next/server';
import { GeneratePromptSchema, createValidationErrorResponse, logAndGetSafeError } from '@/lib/validation-schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validation = GeneratePromptSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { ...createValidationErrorResponse(validation.error) },
        { status: 400 }
      );
    }

    const { prompt } = validation.data;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const coverLetter = data.content[0].text;

    return NextResponse.json({ coverLetter });
  } catch (error) {
    const errorMessage = logAndGetSafeError('Generate Cover Letter Error', error, 'Failed to generate cover letter');
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
