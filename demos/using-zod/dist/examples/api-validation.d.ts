import { z } from 'zod';
/**
 * This file demonstrates real-world API validation scenarios
 * Shows how to use Zod in Express.js-like applications
 */
declare const RegisterRequestSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}>, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}>;
declare const LoginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const CreateProductRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    category: z.ZodEnum<["electronics", "clothing", "books", "home", "sports"]>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    inStock: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    category: "electronics" | "clothing" | "books" | "home" | "sports";
    inStock: boolean;
    tags?: string[] | undefined;
    description?: string | undefined;
}, {
    name: string;
    price: number;
    category: "electronics" | "clothing" | "books" | "home" | "sports";
    tags?: string[] | undefined;
    inStock?: boolean | undefined;
    description?: string | undefined;
}>;
declare const ProductSearchQuerySchema: z.ZodEffects<z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["electronics", "clothing", "books", "home", "sports"]>>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["name", "price", "date"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    sortBy: "name" | "price" | "date";
    sortOrder: "asc" | "desc";
    category?: "electronics" | "clothing" | "books" | "home" | "sports" | undefined;
    minPrice?: number | undefined;
    q?: string | undefined;
    maxPrice?: number | undefined;
}, {
    category?: "electronics" | "clothing" | "books" | "home" | "sports" | undefined;
    minPrice?: number | undefined;
    limit?: number | undefined;
    q?: string | undefined;
    maxPrice?: number | undefined;
    page?: number | undefined;
    sortBy?: "name" | "price" | "date" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>, {
    limit: number;
    page: number;
    sortBy: "name" | "price" | "date";
    sortOrder: "asc" | "desc";
    category?: "electronics" | "clothing" | "books" | "home" | "sports" | undefined;
    minPrice?: number | undefined;
    q?: string | undefined;
    maxPrice?: number | undefined;
}, {
    category?: "electronics" | "clothing" | "books" | "home" | "sports" | undefined;
    minPrice?: number | undefined;
    limit?: number | undefined;
    q?: string | undefined;
    maxPrice?: number | undefined;
    page?: number | undefined;
    sortBy?: "name" | "price" | "date" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
declare const UserResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    email: z.ZodString;
    createdAt: z.ZodString;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    isActive: boolean;
    createdAt: string;
    username: string;
}, {
    id: number;
    email: string;
    isActive: boolean;
    createdAt: string;
    username: string;
}>;
declare const ProductResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    price: z.ZodNumber;
    category: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
    inStock: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    price: number;
    category: string;
    tags: string[];
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    description: string | null;
}, {
    id: number;
    name: string;
    price: number;
    category: string;
    tags: string[];
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    description: string | null;
}>;
declare const ErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            field: string;
        }, {
            message: string;
            field: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    }, {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    success: false;
    error: {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    };
}, {
    success: false;
    error: {
        code: string;
        message: string;
        details?: {
            message: string;
            field: string;
        }[] | undefined;
    };
}>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;
export type ProductSearchQuery = z.infer<typeof ProductSearchQuerySchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export declare function simulateApiEndpoints(): void;
export declare function demonstrateTransformations(): void;
export {};
//# sourceMappingURL=api-validation.d.ts.map