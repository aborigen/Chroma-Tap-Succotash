'use server';
/**
 * @fileOverview A flow to generate game icon concepts for Chroma Tap.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateIconInputSchema = z.object({
  style: z.string().optional().default('minimalist neon'),
});

const GenerateIconOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});

export async function generateGameIcon(input: { style?: string } = {}): Promise<{ imageUrl: string }> {
  return generateGameIconFlow(input);
}

const generateGameIconFlow = ai.defineFlow(
  {
    name: 'generateGameIconFlow',
    inputSchema: GenerateIconInputSchema,
    outputSchema: GenerateIconOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A high-quality minimalist hyper-casual game icon for a rhythm game titled 'Chroma Tap'. 
      Features a thick glowing neon ring divided into four vibrant segments: electric blue, aqua green, coral red, and sunset yellow. 
      A bright white glowing orb cursor is perfectly aligned with the blue segment. 
      Deep dark professional background, 3D render style with soft shadows, vibrant colors, clean edges, glossy finish, square composition, mobile game app store aesthetic.`,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image');
    }

    return {
      imageUrl: media.url,
    };
  }
);
