
'use server';

/**
 * @fileOverview Provides teaching assistance to tutors based on their subjects.
 *
 * - teachingAssistant - A function that handles the teaching assistant flow.
 * - TeachingAssistantInput - The input type for the teachingAssistant function.
 * - TeachingAssistantOutput - The return type for the teachingAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateStream } from 'genkit/generate';

const TeachingAssistantInputSchema = z.object({
  message: z.string().describe('The user\'s message or question.'),
  subjects: z.array(z.string()).describe('The subjects the tutor teaches.'),
});
export type TeachingAssistantInput = z.infer<typeof TeachingAssistantInputSchema>;

const TeachingAssistantOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});
export type TeachingAssistantOutput = z.infer<typeof TeachingAssistantOutputSchema>;

export async function teachingAssistant(input: TeachingAssistantInput) {
    return teachingAssistantFlow(input);
}


const prompt = `You are a helpful AI assistant for a tutor. The tutor teaches the following subjects: {{subjects}}.
Help them with their request: {{message}}.
Provide concise, practical, and helpful information.`;

const teachingAssistantFlow = ai.defineFlow(
  {
    name: 'teachingAssistantFlow',
    inputSchema: TeachingAssistantInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    return generateStream({
        model: 'googleai/gemini-2.0-flash',
        prompt: prompt,
        input
    });
  }
);
