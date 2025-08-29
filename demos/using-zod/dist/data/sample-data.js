"use strict";
/**
 * Sample data for testing Zod schemas
 * This file contains various test cases including valid and invalid data
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeCases = exports.apiRequests = exports.registrationFormData = exports.validProducts = exports.invalidUsers = exports.validUsers = void 0;
// ========================================
// VALID USER DATA
// ========================================
exports.validUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        age: 28,
        isActive: true
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@company.com",
        age: 35,
        isActive: false
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@school.edu",
        age: 22,
        isActive: true
    }
];
// ========================================
// INVALID USER DATA
// ========================================
exports.invalidUsers = [
    {
        description: "Negative ID",
        data: {
            id: -1,
            name: "Invalid User",
            email: "invalid@example.com",
            age: 25,
            isActive: true
        }
    },
    {
        description: "Empty name",
        data: {
            id: 4,
            name: "",
            email: "empty@example.com",
            age: 30,
            isActive: true
        }
    },
    {
        description: "Invalid email format",
        data: {
            id: 5,
            name: "Bad Email User",
            email: "not-an-email",
            age: 25,
            isActive: true
        }
    },
    {
        description: "Negative age",
        data: {
            id: 6,
            name: "Young User",
            email: "young@example.com",
            age: -5,
            isActive: true
        }
    },
    {
        description: "Non-boolean isActive",
        data: {
            id: 7,
            name: "Type Error User",
            email: "type@example.com",
            age: 40,
            isActive: "yes" // Should be boolean
        }
    },
    {
        description: "Missing required fields",
        data: {
            id: 8,
            name: "Incomplete User"
            // Missing email, age, isActive
        }
    }
];
// ========================================
// VALID PRODUCT DATA
// ========================================
exports.validProducts = [
    {
        id: "PROD-001",
        name: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        tags: ["wireless", "bluetooth", "audio"],
        inStock: true,
        metadata: {
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-20T14:22:00Z",
            createdBy: "admin@store.com"
        }
    },
    {
        id: 42,
        name: "Programming Book",
        price: 49.99,
        category: "books",
        tags: ["programming", "typescript", "education"],
        inStock: true
    },
    {
        id: "CLOTHING-100",
        name: "Cotton T-Shirt",
        price: 19.99,
        category: "clothing",
        tags: ["cotton", "casual", "comfortable"],
        inStock: false,
        metadata: {
            createdAt: "2024-02-01T09:15:00Z",
            updatedAt: "2024-02-01T09:15:00Z",
            createdBy: "inventory@store.com"
        }
    }
];
// ========================================
// FORM SUBMISSION DATA
// ========================================
exports.registrationFormData = [
    {
        description: "Valid registration",
        data: {
            username: "johndoe123",
            email: "john@example.com",
            password: "SecurePass123",
            confirmPassword: "SecurePass123",
            agreedToTerms: true
        }
    },
    {
        description: "Password mismatch",
        data: {
            username: "janedoe456",
            email: "jane@example.com",
            password: "SecurePass123",
            confirmPassword: "DifferentPass456",
            agreedToTerms: true
        }
    },
    {
        description: "Weak password",
        data: {
            username: "weakuser",
            email: "weak@example.com",
            password: "password", // No uppercase, no numbers
            confirmPassword: "password",
            agreedToTerms: true
        }
    },
    {
        description: "Terms not agreed",
        data: {
            username: "rebellious",
            email: "rebel@example.com",
            password: "StrongPass123",
            confirmPassword: "StrongPass123",
            agreedToTerms: false
        }
    }
];
// ========================================
// API REQUEST EXAMPLES
// ========================================
exports.apiRequests = {
    // POST /api/users
    createUser: [
        {
            description: "Valid user creation",
            data: {
                name: "New User",
                email: "newuser@example.com",
                age: 25
            }
        },
        {
            description: "Missing required field",
            data: {
                name: "Incomplete User",
                email: "incomplete@example.com"
                // Missing age
            }
        }
    ],
    // GET /api/products?category=electronics&page=1
    searchProducts: [
        {
            description: "Valid search query",
            query: {
                category: "electronics",
                minPrice: "10",
                maxPrice: "100",
                page: "1",
                limit: "20",
                sortBy: "price",
                sortOrder: "asc"
            }
        },
        {
            description: "Invalid price range",
            query: {
                category: "books",
                minPrice: "100",
                maxPrice: "50", // minPrice > maxPrice
                page: "1"
            }
        },
        {
            description: "Invalid category",
            query: {
                category: "invalid_category",
                page: "1"
            }
        }
    ]
};
// ========================================
// EDGE CASES
// ========================================
exports.edgeCases = [
    {
        description: "Null values",
        data: {
            id: null,
            name: null,
            email: null,
            age: null,
            isActive: null
        }
    },
    {
        description: "Undefined values",
        data: {
            id: undefined,
            name: undefined,
            email: undefined,
            age: undefined,
            isActive: undefined
        }
    },
    {
        description: "Wrong types",
        data: {
            id: "string-instead-of-number",
            name: 123,
            email: ["array", "instead", "of", "string"],
            age: "twenty-five",
            isActive: "maybe"
        }
    },
    {
        description: "Extra fields",
        data: {
            id: 99,
            name: "Extra Fields User",
            email: "extra@example.com",
            age: 30,
            isActive: true,
            extraField1: "This should be ignored",
            extraField2: { nested: "object" },
            extraField3: [1, 2, 3]
        }
    }
];
//# sourceMappingURL=sample-data.js.map