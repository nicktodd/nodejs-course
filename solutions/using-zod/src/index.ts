import { z } from 'zod';
import {
  UserSchema,
  CreateUserSchema,
  ProductSchema,
  RegistrationSchema,
  PasswordSchema,
  User,
  CreateUser,
  Product
} from './schemas';

// ========================================
// UTILITY FUNCTIONS FOR EXAMPLES
// ========================================

function printSeparator(title: string) {
  console.log('\n' + '='.repeat(50));
  console.log(` ${title}`);
  console.log('='.repeat(50));
}

function printSuccess(message: string) {
  console.log(`${message}`);
}

function printError(message: string) {
  console.log(`${message}`);
}

function printData(label: string, data: any) {
  console.log(`${label}:`, JSON.stringify(data, null, 2));
}

// ========================================
// EXAMPLE 1: BASIC VALIDATION
// ========================================

function basicValidationExample() {
  printSeparator("Basic Validation Examples");

  // Valid data
  try {
    const validUser = UserSchema.parse({
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      age: 28,
      isActive: true
    });
    printSuccess("User validation passed!");
    printData("Valid User", validUser);
  } catch (error) {
    printError(`Validation failed: ${error}`);
  }

  // Invalid data - this will throw an error
  try {
    const invalidUser = UserSchema.parse({
      id: "not-a-number", // Should be number
      name: "", // Empty name
      email: "invalid-email", // Invalid email format
      age: -5, // Negative age
      isActive: "yes" // Should be boolean
    });
    printSuccess("This shouldn't print");
  } catch (error: any) {
    printError("User validation failed (as expected):");
    error.errors.forEach((err: z.ZodIssue) => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
}

// ========================================
// EXAMPLE 2: SAFE PARSING
// ========================================

function safeParsingExample() {
  printSeparator("Safe Parsing (No Exceptions)");

  const testData = [
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      age: 35,
      isActive: false
    },
    {
      id: 3,
      name: "", // Invalid: empty name
      email: "charlie@example.com",
      age: 25,
      isActive: true
    }
  ];

  testData.forEach((data, index) => {
    console.log(`\nTesting user data ${index + 1}:`);
    const result = UserSchema.safeParse(data);
    
    if (result.success) {
      printSuccess("Validation passed!");
      printData("Parsed User", result.data);
    } else {
      printError("Validation failed:");
      result.error.errors.forEach((err: z.ZodIssue) => {
        console.log(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
  });
}

// ========================================
// EXAMPLE 3: TYPE INFERENCE
// ========================================

function typeInferenceExample() {
  printSeparator("TypeScript Type Inference");

  console.log(" Zod automatically creates TypeScript types from schemas!");
  
  // These types are automatically inferred from the schemas
  const user: User = {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    age: 30,
    isActive: true
  };

  const newUser: CreateUser = {
    name: "Clark Kent",
    email: "clark@example.com",
    age: 32
    // isActive is optional and will default to true
  };

  printData("Typed User", user);
  printData("New User (with defaults)", newUser);
  
  // Validate the inferred types
  const validatedUser = UserSchema.parse(user);
  const validatedNewUser = CreateUserSchema.parse(newUser);
  
  printSuccess("Both users validated successfully!");
  console.log(" Note: TypeScript caught any type mismatches at compile time!");
}

// ========================================
// EXAMPLE 4: COMPLEX OBJECT VALIDATION
// ========================================

function complexObjectExample() {
  printSeparator("Complex Object Validation");

  const productData = {
    id: "PROD-123",
    name: "Wireless Headphones",
    price: 99.99,
    category: "electronics" as const,
    tags: ["wireless", "bluetooth", "audio"],
    inStock: true,
    metadata: {
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:22:00Z",
      createdBy: "admin@store.com"
    }
  };

  try {
    const validatedProduct: Product = ProductSchema.parse(productData);
    printSuccess("Product validation passed!");
    printData("Validated Product", validatedProduct);
  } catch (error: any) {
    printError("Product validation failed:");
    error.errors.forEach((err: z.ZodIssue) => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
}

// ========================================
// EXAMPLE 5: CUSTOM VALIDATION
// ========================================

function customValidationExample() {
  printSeparator("Custom Validation Rules");

  const passwords = [
    "weak",           // Too short, no uppercase, no numbers
    "StrongPass123",  // Valid password
    "nouppercasenum1", // No uppercase
    "NOLOWERCASE123"  // No lowercase
  ];

  passwords.forEach((password, index) => {
    console.log(`\n Testing password ${index + 1}: "${password}"`);
    const result = PasswordSchema.safeParse(password);
    
    if (result.success) {
      printSuccess("Password meets all requirements!");
    } else {
      printError("Password validation failed:");
      result.error.errors.forEach((err: z.ZodIssue) => {
        console.log(`  - ${err.message}`);
      });
    }
  });
}

// ========================================
// EXAMPLE 6: FORM VALIDATION
// ========================================

function formValidationExample() {
  printSeparator("Registration Form Validation");

  const registrationAttempts = [
    {
      username: "johndoe",
      email: "john@example.com",
      password: "SecurePass123",
      confirmPassword: "SecurePass123",
      agreedToTerms: true
    },
    {
      username: "ab", // Too short
      email: "invalid-email",
      password: "weak",
      confirmPassword: "different",
      agreedToTerms: false
    }
  ];

  registrationAttempts.forEach((attempt, index) => {
    console.log(`\n Registration attempt ${index + 1}:`);
    const result = RegistrationSchema.safeParse(attempt);
    
    if (result.success) {
      printSuccess("Registration data is valid!");
      printData("Registration Data", {
        ...result.data,
        password: "[HIDDEN]",
        confirmPassword: "[HIDDEN]"
      });
    } else {
      printError("Registration validation failed:");
      result.error.errors.forEach((err: z.ZodIssue) => {
        console.log(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
  });
}

// ========================================
// EXAMPLE 7: REAL-WORLD API SCENARIO
// ========================================

function apiScenarioExample() {
  printSeparator("Real-World API Validation Scenario");

  console.log(" Simulating API endpoint that creates users...\n");

  // Simulate API requests with different payloads
  const apiRequests = [
    {
      body: {
        name: "API User 1",
        email: "api1@example.com",
        age: 25
      },
      description: "Valid request"
    },
    {
      body: {
        name: "API User 2",
        email: "api2@example.com"
        // Missing age
      },
      description: "Missing required field"
    },
    {
      body: {
        name: "API User 3",
        email: "api3@example.com",
        age: 30,
        isActive: false,
        extraField: "this will be ignored"
      },
      description: "Extra fields (will be stripped)"
    }
  ];

  apiRequests.forEach((request, index) => {
    console.log(` API Request ${index + 1}: ${request.description}`);
    printData("Request Body", request.body);
    
    const result = CreateUserSchema.safeParse(request.body);
    
    if (result.success) {
      printSuccess("✓ Request validated - User would be created");
      printData("Sanitized Data", result.data);
      console.log(" Response: 201 Created\n");
    } else {
      printError("✗ Request validation failed");
      result.error.errors.forEach((err: z.ZodIssue) => {
        console.log(`  - ${err.path.join('.')}: ${err.message}`);
      });
      console.log(" Response: 400 Bad Request\n");
    }
  });
}

// ========================================
// MAIN FUNCTION
// ========================================

function main() {
  console.log(" Welcome to the Zod Validation Example Application!");
  console.log("This demo shows how to use Zod for runtime type validation in TypeScript.\n");

  try {
    basicValidationExample();
    safeParsingExample();
    typeInferenceExample();
    complexObjectExample();
    customValidationExample();
    formValidationExample();
    apiScenarioExample();

    console.log('\n' + '='.repeat(50));
    console.log('All examples completed successfully!');
    console.log(' Check out the schemas.ts file to see how the validation rules are defined.');
    console.log(' Try modifying the test data to see how different validation errors are handled.');
    console.log('='.repeat(50));

  } catch (error) {
    console.error(' Unexpected error:', error);
  }
}

// Run the main function
if (require.main === module) {
  main();
}
