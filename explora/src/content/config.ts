import { defineCollection, z } from 'astro:content';

const places = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(['cafe', 'bar', 'food', 'culture', 'park']),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
      address: z.string().optional(),
    }),
    city: z.enum(['lima', 'cusco', 'arequipa']),
    featured: z.boolean().default(false),
  }),
});

export const collections = { places };
