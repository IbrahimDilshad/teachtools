
'use server';

/**
 * @fileOverview Provides teaching assistance to tutors based on their subjects.
 *
 * - teachingAssistant - A function that handles the teaching assistant flow.
 * - TeachingAssistantInput - The input type for the teachingAssistant function.
 * - TeachingAssistantOutput - The return type for the teachingAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TeachingAssistantInputSchema = z.object({
  message: z.string().describe("The user's message or question."),
  subjects: z.array(z.string()).describe('The subjects the tutor teaches.'),
});
export type TeachingAssistantInput = z.infer<typeof TeachingAssistantInputSchema>;

export async function teachingAssistant(input: TeachingAssistantInput) {
    return teachingAssistantFlow(input);
}

const teachingAssistantPrompt = ai.definePrompt({
    name: 'teachingAssistantPrompt',
    input: { schema: TeachingAssistantInputSchema },
    prompt: `You are a helpful AI assistant for a tutor. The tutor teaches the following subjects: {{subjects}}. Help them with their request: {{message}}. Provide concise, practical, and helpful information.`,
});


const teachingAssistantFlow = ai.defineFlow(
  {
    name: 'teachingAssistantFlow',
    inputSchema: TeachingAssistantInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    const { stream } = await teachingAssistantPrompt.generateStream(input);
    
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
            controller.enqueue(encoder.encode(chunk.text));
        }
        controller.close();
      }
    });

    return readableStream;
  }
);
