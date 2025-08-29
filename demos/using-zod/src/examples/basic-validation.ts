import { z } from 'zod';

/**
 * This file demonstrates basic Zod schema creation and validation
 * Perfect for beginners to understand the fundamentals
 */

// ========================================
// PRIMITIVE TYPE VALIDATION
// ========================================

// String validation with constraints
const nameSchema = z.string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");

// Number validation with constraints
const ageSchema = z.number()
  .int("Age must be a whole number")
  .positive("Age must be positive")
  .max(120, "Age seems unrealistic");

// Boolean validation
const isActiveSchema = z.boolean();

// Email validation using built-in email validator
const emailSchema = z.string().email("Please provide a valid email address");

// URL validation
const websiteSchema = z.string().url("Please provide a valid URL");

// Date string validation
const dateSchema = z.string().datetime("Please provide a valid ISO datetime");

// ========================================
// EXAMPLE USAGE
// ========================================

export function runBasicExamples() {
  console.log("🔤 BASIC SCHEMA VALIDATION EXAMPLES");
  console.log("=====================================\n");

  // Test cases for each schema
  const testCases = [
    {
      name: "String Validation",
      schema: nameSchema,
      validData: "John Doe",
      invalidData: "A" // Too short
    },
    {
      name: "Number Validation", 
      schema: ageSchema,
      validData: 25,
      invalidData: -5 // Negative
    },
    {
      name: "Boolean Validation",
      schema: isActiveSchema,
      validData: true,
      invalidData: "yes" // Not a boolean
    },
    {
      name: "Email Validation",
      schema: emailSchema,
      validData: "user@example.com",
      invalidData: "not-an-email"
    },
    {
      name: "URL Validation",
      schema: websiteSchema,
      validData: "https://example.com",
      invalidData: "not-a-url"
    },
    {
      name: "Date Validation",
      schema: dateSchema,
      validData: "2024-01-15T10:30:00Z",
      invalidData: "not-a-date"
    }
  ];

  testCases.forEach(({ name, schema, validData, invalidData }) => {
    console.log(`📋 ${name}:`);
    
    // Test valid data
    try {
      const result = schema.parse(validData);
      console.log(`  ✅ Valid: ${JSON.stringify(validData)} → ${JSON.stringify(result)}`);
    } catch (error) {
      console.log(`  ❌ Unexpected error with valid data: ${error}`);
    }
    
    // Test invalid data
    try {
      schema.parse(invalidData);
      console.log(`  ❌ Invalid data passed unexpectedly: ${JSON.stringify(invalidData)}`);
    } catch (error: any) {
      console.log(`  ✅ Invalid data caught: ${JSON.stringify(invalidData)} → ${error.errors[0].message}`);
    }
    
    console.log("");
  });
}

// ========================================
// SAFE PARSING DEMONSTRATION
// ========================================

export function demonstrateSafeParsing() {
  console.log("🛡️  SAFE PARSING (NO EXCEPTIONS)");
  console.log("=================================\n");

  const testData = ["valid@email.com", "invalid-email", "", null];

  testData.forEach((email, index) => {
    console.log(`Test ${index + 1}: ${JSON.stringify(email)}`);
    
    const result = emailSchema.safeParse(email);
    
    if (result.success) {
      console.log(`  ✅ Success: ${result.data}`);
    } else {
      console.log(`  ❌ Error: ${result.error.errors[0].message}`);
    }
    console.log("");
  });
}

// Run examples if this file is executed directly
if (require.main === module) {
  runBasicExamples();
  demonstrateSafeParsing();
}
