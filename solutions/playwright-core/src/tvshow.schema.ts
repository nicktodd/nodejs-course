import { z } from 'zod';

export const TVShowSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  genre: z.string().min(1),
  seasons: z.number().int().nonnegative(),
  rating: z.number().min(0).max(10),
  description: z.string().optional()
});

export type TVShow = z.infer<typeof TVShowSchema>;
