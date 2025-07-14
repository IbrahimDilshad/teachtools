'use server';

/**
 * @fileOverview Automatically suggests personalized reminder messages for upcoming classes, payment deadlines, and missed attendance.
 *
 * - smartReminderGeneration - A function that handles the smart reminder generation process.
 * - SmartReminderGenerationInput - The input type for the smartReminderGeneration function.
 * - SmartReminderGenerationOutput - The return type for the smartReminderGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReminderGenerationInputSchema = z.object({
  reminderType: z
    .enum(['upcomingClass', 'paymentDeadline', 'missedAttendance'])
    .describe('The type of reminder to generate.'),
  studentName: z.string().describe('The name of the student.'),
  className: z.string().describe('The name of the class (if applicable).'),
  paymentDueDate: z.string().describe('The payment due date (if applicable).'),
  date: z.string().describe('The date of the event (if applicable).'),
});
export type SmartReminderGenerationInput = z.infer<typeof SmartReminderGenerationInputSchema>;

const SmartReminderGenerationOutputSchema = z.object({
  reminderMessage: z.string().describe('The generated reminder message.'),
});
export type SmartReminderGenerationOutput = z.infer<typeof SmartReminderGenerationOutputSchema>;

export async function smartReminderGeneration(input: SmartReminderGenerationInput): Promise<SmartReminderGenerationOutput> {
  return smartReminderGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartReminderGenerationPrompt',
  input: {schema: SmartReminderGenerationInputSchema},
  output: {schema: SmartReminderGenerationOutputSchema},
  prompt: `You are a helpful assistant that generates personalized reminder messages for teachers to send to students and parents.

  Based on the reminder type, student name, and other relevant information, create a concise and engaging reminder message.

  Reminder Type: {{{reminderType}}}
  Student Name: {{{studentName}}}
  Class Name: {{{className}}}
  Payment Due Date: {{{paymentDueDate}}}
  Date: {{{date}}}

  Generated Reminder Message:`,
});

const smartReminderGenerationFlow = ai.defineFlow(
  {
    name: 'smartReminderGenerationFlow',
    inputSchema: SmartReminderGenerationInputSchema,
    outputSchema: SmartReminderGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
