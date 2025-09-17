import { z } from 'zod';

// ========================================
// 1. BASIC SCHEMAS
// ========================================

// String validation
export const NameSchema = z.string().min(1, "Name cannot be empty").max(100, "Name too long");

// Number validation
export const AgeSchema = z.number().int().min(0, "Age must be positive").max(150, "Age too high");

// Email validation
export const EmailSchema = z.string().email("Invalid email format");

// ========================================
// 2. OBJECT SCHEMAS
// ========================================

// User schema with required fields
export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: NameSchema,
  email: EmailSchema,
  age: AgeSchema,
  isActive: z.boolean()
});

// User schema with optional fields
export const CreateUserSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  age: AgeSchema,
  isActive: z.boolean().default(true).optional()
});

// ========================================
// 3. ARRAY SCHEMAS
// ========================================

export const TagsSchema = z.array(z.string()).min(1, "At least one tag required");
export const UsersListSchema = z.array(UserSchema);

// ========================================
// 4. ADVANCED SCHEMAS
// ========================================

// Enum validation
export const StatusSchema = z.enum(['pending', 'approved', 'rejected']);

// Union types
export const IdSchema = z.union([z.string(), z.number()]);

// Product schema with nested validation
export const ProductSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'books', 'food']),
  tags: TagsSchema,
  inStock: z.boolean(),
  // Optional nested object
  metadata: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    createdBy: z.string()
  }).optional()
});

// ========================================
// 5. CUSTOM VALIDATION
// ========================================

// Password with custom validation
export const PasswordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .refine(
    (password: string) => /[A-Z]/.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password: string) => /[a-z]/.test(password),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (password: string) => /[0-9]/.test(password),
    "Password must contain at least one number"
  );

// Registration form schema
export const RegistrationSchema = z.object({
  username: z.string().min(3).max(30),
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine((val: boolean) => val === true, "Must agree to terms")
}).refine(
  (data: any) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
);

// ========================================
// 6. TYPE INFERENCE
// ========================================

// TypeScript types automatically inferred from schemas
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Registration = z.infer<typeof RegistrationSchema>;
export type Status = z.infer<typeof StatusSchema>;
