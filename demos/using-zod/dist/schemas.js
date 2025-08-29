"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationSchema = exports.PasswordSchema = exports.ProductSchema = exports.IdSchema = exports.StatusSchema = exports.UsersListSchema = exports.TagsSchema = exports.CreateUserSchema = exports.UserSchema = exports.EmailSchema = exports.AgeSchema = exports.NameSchema = void 0;
const zod_1 = require("zod");
// ========================================
// 1. BASIC SCHEMAS
// ========================================
// String validation
exports.NameSchema = zod_1.z.string().min(1, "Name cannot be empty").max(100, "Name too long");
// Number validation
exports.AgeSchema = zod_1.z.number().int().min(0, "Age must be positive").max(150, "Age too high");
// Email validation
exports.EmailSchema = zod_1.z.string().email("Invalid email format");
// ========================================
// 2. OBJECT SCHEMAS
// ========================================
// User schema with required fields
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    name: exports.NameSchema,
    email: exports.EmailSchema,
    age: exports.AgeSchema,
    isActive: zod_1.z.boolean()
});
// User schema with optional fields
exports.CreateUserSchema = zod_1.z.object({
    name: exports.NameSchema,
    email: exports.EmailSchema,
    age: exports.AgeSchema,
    isActive: zod_1.z.boolean().default(true).optional()
});
// ========================================
// 3. ARRAY SCHEMAS
// ========================================
exports.TagsSchema = zod_1.z.array(zod_1.z.string()).min(1, "At least one tag required");
exports.UsersListSchema = zod_1.z.array(exports.UserSchema);
// ========================================
// 4. ADVANCED SCHEMAS
// ========================================
// Enum validation
exports.StatusSchema = zod_1.z.enum(['pending', 'approved', 'rejected']);
// Union types
exports.IdSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number()]);
// Product schema with nested validation
exports.ProductSchema = zod_1.z.object({
    id: exports.IdSchema,
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    category: zod_1.z.enum(['electronics', 'clothing', 'books', 'food']),
    tags: exports.TagsSchema,
    inStock: zod_1.z.boolean(),
    // Optional nested object
    metadata: zod_1.z.object({
        createdAt: zod_1.z.string().datetime(),
        updatedAt: zod_1.z.string().datetime(),
        createdBy: zod_1.z.string()
    }).optional()
});
// ========================================
// 5. CUSTOM VALIDATION
// ========================================
// Password with custom validation
exports.PasswordSchema = zod_1.z.string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
    .refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
    .refine((password) => /[0-9]/.test(password), "Password must contain at least one number");
// Registration form schema
exports.RegistrationSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(30),
    email: exports.EmailSchema,
    password: exports.PasswordSchema,
    confirmPassword: zod_1.z.string(),
    agreedToTerms: zod_1.z.boolean().refine((val) => val === true, "Must agree to terms")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});
//# sourceMappingURL=schemas.js.map