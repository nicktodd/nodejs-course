import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().optional(),
  publicationYear: z.number().int().min(1000).max(new Date().getFullYear()),
  genre: z.string().min(1, "Genre is required"),
  pages: z.number().int().positive("Pages must be a positive number"),
  rating: z.number().min(1).max(5).optional(),
  description: z.string().optional()
});

export const CreateBookSchema = BookSchema.omit({ id: true });
export const UpdateBookSchema = BookSchema.partial().omit({ id: true });

export type Book = z.infer<typeof BookSchema>;
export type CreateBook = z.infer<typeof CreateBookSchema>;
export type UpdateBook = z.infer<typeof UpdateBookSchema>;
