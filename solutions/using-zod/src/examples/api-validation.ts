import { z } from 'zod';

/**
 * This file demonstrates real-world API validation scenarios
 * Shows how to use Zod in Express.js-like applications
 */

// ========================================
// API REQUEST/RESPONSE SCHEMAS
// ========================================

// User registration request
const RegisterRequestSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// User login request
const LoginRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

// Product creation request
const CreateProductRequestSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200),
  description: z.string().max(1000).optional(),
  price: z.number().positive("Price must be positive"),
  category: z.enum(['electronics', 'clothing', 'books', 'home', 'sports']),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  inStock: z.boolean().default(true)
});

// Query parameters for product search
const ProductSearchQuerySchema = z.object({
  q: z.string().optional(), // Search query
  category: z.enum(['electronics', 'clothing', 'books', 'home', 'sports']).optional(),
  minPrice: z.coerce.number().positive().optional(), // coerce string to number
  maxPrice: z.coerce.number().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(['name', 'price', 'date']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
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

const UserResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  createdAt: z.string().datetime(),
  isActive: z.boolean()
});

const ProductResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  inStock: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
  data: z.array(itemSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number()
  })
});

// ========================================
// ERROR RESPONSE SCHEMA
// ========================================

const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(z.object({
      field: z.string(),
      message: z.string()
    })).optional()
  })
});

// ========================================
// TYPE INFERENCE
// ========================================

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;
export type ProductSearchQuery = z.infer<typeof ProductSearchQuerySchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// ========================================
// MIDDLEWARE SIMULATION
// ========================================

function validateRequestBody<T extends z.ZodTypeAny>(schema: T) {
  return (data: unknown) => {
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

function validateQueryParams<T extends z.ZodTypeAny>(schema: T) {
  return (params: Record<string, string | undefined>) => {
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

export function simulateApiEndpoints() {
  console.log(" API VALIDATION EXAMPLES");
  console.log("==========================\n");

  // Example 1: User Registration
  console.log(" POST /api/auth/register");
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
      console.log(`  Status: 201 Created`);
      console.log(`  Response: User created successfully`);
    } else {
      console.log(`  Status: 400 Bad Request`);
      console.log(`  Response:`, JSON.stringify({
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
  console.log("\n\n GET /api/products");
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
      console.log(`  Status: 200 OK`);
      console.log(`  Parsed Query:`, JSON.stringify(result.data, null, 2));
      
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
      console.log(`  Response:`, JSON.stringify(mockResponse, null, 2));
    } else {
      console.log(`  Status: 400 Bad Request`);
      console.log(`  Response:`, JSON.stringify({
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

export function demonstrateTransformations() {
  console.log("\n\n DATA TRANSFORMATIONS");
  console.log("========================\n");

  // Transform incoming data
  const CreateUserSchema = z.object({
    email: z.string().email().transform(email => email.toLowerCase()),
    username: z.string().transform(username => username.trim()),
    age: z.string().transform(str => parseInt(str, 10)).pipe(z.number().int().positive())
  });

  const userData = {
    email: "  JOHN@EXAMPLE.COM  ",
    username: "  john_doe  ",
    age: "25"
  };

  console.log(" Input data:", JSON.stringify(userData, null, 2));
  
  try {
    const transformed = CreateUserSchema.parse(userData);
    console.log("Transformed data:", JSON.stringify(transformed, null, 2));
  } catch (error: any) {
    console.log("Transformation failed:", error.errors[0].message);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  simulateApiEndpoints();
  demonstrateTransformations();
}
