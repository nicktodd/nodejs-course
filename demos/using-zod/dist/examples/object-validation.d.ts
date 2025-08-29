import { z } from 'zod';
/**
 * This file demonstrates how to work with complex objects using Zod
 * Shows nested objects, optional fields, and real-world scenarios
 */
declare const PersonSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    age: z.ZodNumber;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    age: number;
    firstName: string;
    lastName: string;
}, {
    email: string;
    age: number;
    firstName: string;
    lastName: string;
}>;
declare const UserProfileSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    createdAt: string;
    username: string;
    isPublic: boolean;
    firstName?: string | undefined;
    lastName?: string | undefined;
    bio?: string | undefined;
}, {
    email: string;
    username: string;
    createdAt?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    bio?: string | undefined;
    isPublic?: boolean | undefined;
}>;
declare const AddressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodString;
    country: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}, {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string | undefined;
}>;
declare const CustomerSchema: z.ZodObject<{
    id: z.ZodNumber;
    personalInfo: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        age: z.ZodNumber;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        age: number;
        firstName: string;
        lastName: string;
    }, {
        email: string;
        age: number;
        firstName: string;
        lastName: string;
    }>;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string | undefined;
    }>;
    preferences: z.ZodObject<{
        newsletter: z.ZodDefault<z.ZodBoolean>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
        language: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        newsletter: boolean;
        theme: "light" | "dark";
        language: string;
    }, {
        newsletter?: boolean | undefined;
        theme?: "light" | "dark" | undefined;
        language?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: number;
    personalInfo: {
        email: string;
        age: number;
        firstName: string;
        lastName: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    preferences: {
        newsletter: boolean;
        theme: "light" | "dark";
        language: string;
    };
}, {
    id: number;
    personalInfo: {
        email: string;
        age: number;
        firstName: string;
        lastName: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string | undefined;
    };
    preferences: {
        newsletter?: boolean | undefined;
        theme?: "light" | "dark" | undefined;
        language?: string | undefined;
    };
}>;
declare const OrderItemSchema: z.ZodObject<{
    productId: z.ZodString;
    productName: z.ZodString;
    quantity: z.ZodNumber;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    price: number;
    productId: string;
    productName: string;
    quantity: number;
}, {
    price: number;
    productId: string;
    productName: string;
    quantity: number;
}>;
declare const OrderSchema: z.ZodObject<{
    orderId: z.ZodString;
    customerId: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        productName: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        price: number;
        productId: string;
        productName: string;
        quantity: number;
    }, {
        price: number;
        productId: string;
        productName: string;
        quantity: number;
    }>, "many">;
    totalAmount: z.ZodNumber;
    status: z.ZodEnum<["pending", "processing", "shipped", "delivered", "cancelled"]>;
    orderDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderId: string;
    customerId: number;
    items: {
        price: number;
        productId: string;
        productName: string;
        quantity: number;
    }[];
    totalAmount: number;
    orderDate: string;
}, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderId: string;
    customerId: number;
    items: {
        price: number;
        productId: string;
        productName: string;
        quantity: number;
    }[];
    totalAmount: number;
    orderDate: string;
}>;
export type Person = z.infer<typeof PersonSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export declare function runObjectExamples(): void;
export declare function runAdvancedObjectExamples(): void;
export {};
//# sourceMappingURL=object-validation.d.ts.map