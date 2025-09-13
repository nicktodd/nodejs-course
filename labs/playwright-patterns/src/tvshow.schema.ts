import { z } from 'zod';

export const TVShowSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  genre: z.string().min(1),
  seasons: z.number().int().nonnegative(),
  rating: z.number().min(0).max(10),
  description: z.string().optional(),
  imageUrl: z.string().url().optional()
});

export type TVShow = z.infer<typeof TVShowSchema>;

export const UserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).default('user')
});

export type User = z.infer<typeof UserSchema>;
