// app/api/ai/chat/route.ts
import { z } from 'zod';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define request schema with Zod
const requestSchema = z.object({
  query: z.string().min(1).max(1000), // Limit to 1000 chars
  context?: z.string(), // Optional context for pharmacy-specific queries
});

/**
 * LLM Integration Environment Variables
 * 
 * - LLM_API_URL: Base URL of the LLM API (e.g., "https://api.openai.com/v1/chat/completions")
 * - LLM_API_KEY: Your LLM API key (keep secret!)
 * - LLM_MODEL_NAME: Specific model name (e.g., "gpt-4-1106-preview")
 * - MAX_TOKENS: Max response length (default: 500)
 * - TIMEOUT: Request timeout in ms (default: 5000)
 */
const envVars = {
  LLM_API_URL: process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions',
  LLM_API_KEY: process.env.LLM_API_KEY,
  LLM_MODEL_NAME: process.env.LLM_MODEL_NAME || 'gpt-4-1106-preview',
  MAX_TOKENS: parseInt(process.env.MAX_TOKENS || '500'),
  TIMEOUT: parseInt(process.env.TIMEOUT || '5000'),
};

// Sanitization rules for pharmaceutical context
const sanitizeInput = (input: string) => {
  // Remove special characters and HTML tags
  const cleaned = input
    .replace(/[<>]/g, '') // Strip HTML tags
    .replace(/[^\w\s.,!?-]/g, '') // Allow only alphanumerics and basic punctuation
    .trim();
    
  // pharmacy-specific safety checks
  const dangerousTerms = ['drug recipe', 'controlled substance', 'counterfeit', 'illegal'];
  if (dangerousTerms.some(term => cleaned.toLowerCase().includes(term))) {
    throw new Error('Safety violation detected');
  }
  
  return cleaned;
};

export async function POST(req) {
  try {
    // Validate and sanitize input
    const { body } = await req.json();
    const validated = requestSchema.parse(body);
    const sanitizedQuery = sanitizeInput(validated.query);
    
    // Safety check
    if (!envVars.LLM_API_KEY) {
      return new NextResponse(
        'LLM API key not configured',
        { status: 500 }
      );
    }

    // LLM API request
    const response = await fetch(`${envVars.LLM_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${envVars.LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: envVars.LLM_MODEL_NAME,
        max_tokens: envVars.MAX_TOKENS,
        messages: [
          { role: 'system', content: 'You are a pharmacy assistant. Prioritize patient safety and accurate medical information. Do not provide dosage instructions or drug interactions unless explicitly asked.' },
          { role: 'user', content: sanitizedQuery }
        ]
      }),
      signal: req.signal
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(data.choices?.[0]?.message?.content || 'No response', {
      status: 200,
    });

  } catch (error) {
    console.error('AI Chat Error:', error.message);
    return new NextResponse('Error processing request', {
      status: 500
    });
  }
}