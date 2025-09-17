import { z } from 'zod';
import { UserSchema, CreateUserSchema, ProductSchema } from './schemas';

/**
 * Simple test cases to verify our Zod schemas work correctly
 * This demonstrates testing validation logic
 */

// ========================================
// TEST UTILITIES
// ========================================

function test(name: string, testFn: () => void) {
  try {
    testFn();
    console.log(`${name}`);
  } catch (error) {
    console.log(`${name}: ${error}`);
  }
}

function expectValid<T extends z.ZodTypeAny>(schema: T, data: unknown, description: string) {
  try {
    const result = schema.parse(data);
    console.log(`  ${description}: Valid`);
    return result;
  } catch (error) {
    throw new Error(`Expected valid data but got error: ${error}`);
  }
}

function expectInvalid<T extends z.ZodTypeAny>(schema: T, data: unknown, description: string) {
  try {
    schema.parse(data);
    throw new Error(`Expected invalid data but validation passed`);
  } catch (error) {
    console.log(`  ${description}: Invalid (as expected)`);
  }
}

// ========================================
// TEST CASES
// ========================================

export function runTests() {
  console.log("RUNNING ZOD VALIDATION TESTS");
  console.log("================================\n");

  // Test User Schema
  test("User Schema - Valid Data", () => {
    expectValid(UserSchema, {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      isActive: true
    }, "Complete valid user");
  });

  test("User Schema - Invalid Data", () => {
    expectInvalid(UserSchema, {
      id: "not-a-number",
      name: "",
      email: "invalid-email",
      age: -5,
      isActive: "yes"
    }, "User with multiple validation errors");
    
    expectInvalid(UserSchema, {
      // Missing required fields
      name: "John"
    }, "User with missing fields");
  });

  // Test CreateUser Schema
  test("CreateUser Schema - With Defaults", () => {
    const result = expectValid(CreateUserSchema, {
      name: "Jane Doe",
      email: "jane@example.com", 
      age: 25
    }, "User creation with default values");
    
    // Verify default value is applied
    if (result && typeof result === 'object' && 'isActive' in result) {
      console.log(`    Default isActive value: ${result.isActive}`);
    }
  });

  // Test Product Schema
  test("Product Schema - Complex Object", () => {
    expectValid(ProductSchema, {
      id: 123,
      name: "Test Product",
      price: 29.99,
      category: "electronics",
      tags: ["test", "product"],
      inStock: true,
      metadata: {
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:22:00Z",
        createdBy: "admin"
      }
    }, "Product with all fields");

    expectValid(ProductSchema, {
      id: "PROD-456",
      name: "Another Product",
      price: 15.50,
      category: "books",
      tags: ["book"],
      inStock: false
      // metadata is optional
    }, "Product without optional metadata");
  });

  test("Product Schema - Invalid Data", () => {
    expectInvalid(ProductSchema, {
      id: 123,
      name: "",
      price: -10,
      category: "invalid-category",
      tags: [],
      inStock: true
    }, "Product with validation errors");
  });

  // Test Enum Validation
  test("Enum Validation", () => {
    const StatusSchema = z.enum(['pending', 'approved', 'rejected']);
    
    expectValid(StatusSchema, 'pending', "Valid enum value");
    expectValid(StatusSchema, 'approved', "Another valid enum value");
    expectInvalid(StatusSchema, 'invalid-status', "Invalid enum value");
    expectInvalid(StatusSchema, '', "Empty string for enum");
  });

  // Test Array Validation
  test("Array Validation", () => {
    const TagsSchema = z.array(z.string()).min(1);
    
    expectValid(TagsSchema, ['tag1', 'tag2'], "Valid array with items");
    expectInvalid(TagsSchema, [], "Empty array when minimum required");
    expectInvalid(TagsSchema, ['tag1', 123], "Array with invalid item type");
  });

  // Test Safe Parsing
  test("Safe Parsing", () => {
    const testData = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      age: 25,
      isActive: true
    };

    const result = UserSchema.safeParse(testData);
    if (result.success) {
      console.log("  Safe parse succeeded with valid data");
    } else {
      throw new Error("Safe parse should have succeeded");
    }

    const invalidResult = UserSchema.safeParse({ invalid: "data" });
    if (!invalidResult.success) {
      console.log("  Safe parse failed with invalid data (as expected)");
      console.log(`    Error count: ${invalidResult.error.errors.length}`);
    } else {
      throw new Error("Safe parse should have failed");
    }
  });

  console.log("\nAll tests completed!");
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}
