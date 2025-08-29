import { z } from 'zod';
export declare const NameSchema: z.ZodString;
export declare const AgeSchema: z.ZodNumber;
export declare const EmailSchema: z.ZodString;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    age: z.ZodNumber;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}, {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}>;
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    age: z.ZodNumber;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    age: number;
    isActive?: boolean | undefined;
}, {
    name: string;
    email: string;
    age: number;
    isActive?: boolean | undefined;
}>;
export declare const TagsSchema: z.ZodArray<z.ZodString, "many">;
export declare const UsersListSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    age: z.ZodNumber;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}, {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}>, "many">;
export declare const StatusSchema: z.ZodEnum<["pending", "approved", "rejected"]>;
export declare const IdSchema: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    name: z.ZodString;
    price: z.ZodNumber;
    category: z.ZodEnum<["electronics", "clothing", "books", "food"]>;
    tags: z.ZodArray<z.ZodString, "many">;
    inStock: z.ZodBoolean;
    metadata: z.ZodOptional<z.ZodObject<{
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        createdBy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
    }, {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    name: string;
    price: number;
    category: "electronics" | "clothing" | "books" | "food";
    tags: string[];
    inStock: boolean;
    metadata?: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
    } | undefined;
}, {
    id: string | number;
    name: string;
    price: number;
    category: "electronics" | "clothing" | "books" | "food";
    tags: string[];
    inStock: boolean;
    metadata?: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
    } | undefined;
}>;
export declare const PasswordSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
export declare const RegistrationSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
    confirmPassword: z.ZodString;
    agreedToTerms: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
}, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
}>, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
}, {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
}>;
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Registration = z.infer<typeof RegistrationSchema>;
export type Status = z.infer<typeof StatusSchema>;
//# sourceMappingURL=schemas.d.ts.map