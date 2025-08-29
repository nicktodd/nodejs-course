"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateApiEndpoints = simulateApiEndpoints;
exports.demonstrateTransformations = demonstrateTransformations;
const zod_1 = require("zod");
/**
 * This file demonstrates real-world API validation scenarios
 * Shows how to use Zod in Express.js-like applications
 */
// ========================================
// API REQUEST/RESPONSE SCHEMAS
// ========================================
// User registration request
const RegisterRequestSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    confirmPassword: zod_1.z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});
// User login request
const LoginRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required")
});
// Product creation request
const CreateProductRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required").max(200),
    description: zod_1.z.string().max(1000).optional(),
    price: zod_1.z.number().positive("Price must be positive"),
    category: zod_1.z.enum(['electronics', 'clothing', 'books', 'home', 'sports']),
    tags: zod_1.z.array(zod_1.z.string()).max(10, "Maximum 10 tags allowed").optional(),
    inStock: zod_1.z.boolean().default(true)
});
// Query parameters for product search
const ProductSearchQuerySchema = zod_1.z.object({
    q: zod_1.z.string().optional(), // Search query
    category: zod_1.z.enum(['electronics', 'clothing', 'books', 'home', 'sports']).optional(),
    minPrice: zod_1.z.coerce.number().positive().optional(), // coerce string to number
    maxPrice: zod_1.z.coerce.number().positive().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
    sortBy: zod_1.z.enum(['name', 'price', 'date']).default('name'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc')
}).refine((data) => {
    if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
    }
    return true;
}, {
    message: "minPrice must be less than or equal to maxPrice",
    path: ["minPrice"]
});
// ========================================
// RESPONSE SCHEMAS
// ========================================
const UserResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    createdAt: zod_1.z.string().datetime(),
    isActive: zod_1.z.boolean()
});
const ProductResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    inStock: zod_1.z.boolean(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime()
});
const PaginatedResponseSchema = (itemSchema) => zod_1.z.object({
    data: zod_1.z.array(itemSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        totalPages: zod_1.z.number()
    })
});
// ========================================
// ERROR RESPONSE SCHEMA
// ========================================
const ErrorResponseSchema = zod_1.z.object({
    success: zod_1.z.literal(false),
    error: zod_1.z.object({
        code: zod_1.z.string(),
        message: zod_1.z.string(),
        details: zod_1.z.array(zod_1.z.object({
            field: zod_1.z.string(),
            message: zod_1.z.string()
        })).optional()
    })
});
// ========================================
// MIDDLEWARE SIMULATION
// ========================================
function validateRequestBody(schema) {
    return (data) => {
        const result = schema.safeParse(data);
        if (!result.success) {
            const errors = result.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));
            return {
                success: false,
                errors
            };
        }
        return {
            success: true,
            data: result.data
        };
    };
}
function validateQueryParams(schema) {
    return (params) => {
        const result = schema.safeParse(params);
        if (!result.success) {
            const errors = result.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));
            return {
                success: false,
                errors
            };
        }
        return {
            success: true,
            data: result.data
        };
    };
}
// ========================================
// EXAMPLE API ENDPOINTS
// ========================================
function simulateApiEndpoints() {
    console.log("🌐 API VALIDATION EXAMPLES");
    console.log("==========================\n");
    // Example 1: User Registration
    console.log("📝 POST /api/auth/register");
    const registerValidator = validateRequestBody(RegisterRequestSchema);
    const registerAttempts = [
        {
            username: "john_doe",
            email: "john@example.com",
            password: "SecurePass123",
            confirmPassword: "SecurePass123"
        },
        {
            username: "jo", // Too short
            email: "invalid-email",
            password: "weak",
            confirmPassword: "different"
        }
    ];
    registerAttempts.forEach((attempt, index) => {
        console.log(`\n  Request ${index + 1}:`, JSON.stringify(attempt, null, 2));
        const result = registerValidator(attempt);
        if (result.success) {
            console.log(`  ✅ Status: 201 Created`);
            console.log(`  📦 Response: User created successfully`);
        }
        else {
            console.log(`  ❌ Status: 400 Bad Request`);
            console.log(`  📦 Response:`, JSON.stringify({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Request validation failed",
                    details: result.errors
                }
            }, null, 2));
        }
    });
    // Example 2: Product Search with Query Parameters
    console.log("\n\n🔍 GET /api/products");
    const queryValidator = validateQueryParams(ProductSearchQuerySchema);
    const searchQueries = [
        {
            category: "electronics",
            minPrice: "10",
            maxPrice: "100",
            page: "1",
            limit: "20"
        },
        {
            category: "invalid_category", // Invalid enum value
            minPrice: "100",
            maxPrice: "50", // minPrice > maxPrice
            page: "0" // Invalid page number
        }
    ];
    searchQueries.forEach((query, index) => {
        console.log(`\n  Query ${index + 1}:`, JSON.stringify(query, null, 2));
        const result = queryValidator(query);
        if (result.success) {
            console.log(`  ✅ Status: 200 OK`);
            console.log(`  📦 Parsed Query:`, JSON.stringify(result.data, null, 2));
            // Simulate response
            const mockResponse = {
                data: [
                    {
                        id: 1,
                        name: "Wireless Headphones",
                        description: "High-quality wireless headphones",
                        price: 99.99,
                        category: "electronics",
                        tags: ["wireless", "audio"],
                        inStock: true,
                        createdAt: "2024-01-15T10:30:00Z",
                        updatedAt: "2024-01-20T14:22:00Z"
                    }
                ],
                pagination: {
                    page: result.data.page,
                    limit: result.data.limit,
                    total: 1,
                    totalPages: 1
                }
            };
            console.log(`  📦 Response:`, JSON.stringify(mockResponse, null, 2));
        }
        else {
            console.log(`  ❌ Status: 400 Bad Request`);
            console.log(`  📦 Response:`, JSON.stringify({
                success: false,
                error: {
                    code: "INVALID_QUERY_PARAMS",
                    message: "Invalid query parameters",
                    details: result.errors
                }
            }, null, 2));
        }
    });
}
// ========================================
// TRANSFORMATION EXAMPLES
// ========================================
function demonstrateTransformations() {
    console.log("\n\n🔄 DATA TRANSFORMATIONS");
    console.log("========================\n");
    // Transform incoming data
    const CreateUserSchema = zod_1.z.object({
        email: zod_1.z.string().email().transform(email => email.toLowerCase()),
        username: zod_1.z.string().transform(username => username.trim()),
        age: zod_1.z.string().transform(str => parseInt(str, 10)).pipe(zod_1.z.number().int().positive())
    });
    const userData = {
        email: "  JOHN@EXAMPLE.COM  ",
        username: "  john_doe  ",
        age: "25"
    };
    console.log("📥 Input data:", JSON.stringify(userData, null, 2));
    try {
        const transformed = CreateUserSchema.parse(userData);
        console.log("✅ Transformed data:", JSON.stringify(transformed, null, 2));
    }
    catch (error) {
        console.log("❌ Transformation failed:", error.errors[0].message);
    }
}
// Run examples if this file is executed directly
if (require.main === module) {
    simulateApiEndpoints();
    demonstrateTransformations();
}
//# sourceMappingURL=api-validation.js.map