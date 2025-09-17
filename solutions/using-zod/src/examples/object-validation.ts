import { z } from 'zod';

/**
 * This file demonstrates how to work with complex objects using Zod
 * Shows nested objects, optional fields, and real-world scenarios
 */

// ========================================
// SIMPLE OBJECT SCHEMA
// ========================================

const PersonSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().int().min(0).max(150),
  email: z.string().email()
});

// ========================================
// OBJECT WITH OPTIONAL FIELDS
// ========================================

const UserProfileSchema = z.object({
  // Required fields
  username: z.string().min(3).max(30),
  email: z.string().email(),
  
  // Optional fields
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().max(500).optional(),
  
  // Optional with default value
  isPublic: z.boolean().default(false),
  createdAt: z.string().datetime().default(() => new Date().toISOString())
});

// ========================================
// NESTED OBJECT SCHEMA
// ========================================

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2).max(2), // State abbreviation
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  country: z.string().default("US")
});

const CustomerSchema = z.object({
  id: z.number().int().positive(),
  personalInfo: PersonSchema,
  address: AddressSchema,
  preferences: z.object({
    newsletter: z.boolean().default(true),
    theme: z.enum(['light', 'dark']).default('light'),
    language: z.string().default('en')
  })
});

// ========================================
// ARRAY OF OBJECTS
// ========================================

const OrderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive()
});

const OrderSchema = z.object({
  orderId: z.string(),
  customerId: z.number().int().positive(),
  items: z.array(OrderItemSchema).min(1, "Order must have at least one item"),
  totalAmount: z.number().positive(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  orderDate: z.string().datetime()
});

// ========================================
// TYPE INFERENCE
// ========================================

// TypeScript types automatically generated from schemas
export type Person = z.infer<typeof PersonSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;

// ========================================
// EXAMPLE USAGE
// ========================================

export function runObjectExamples() {
  console.log("  OBJECT VALIDATION EXAMPLES");
  console.log("==============================\n");

  // Example 1: Simple Person
  console.log(" Simple Person Validation:");
  const personData = {
    firstName: "Alice",
    lastName: "Johnson",
    age: 28,
    email: "alice@example.com"
  };

  try {
    const person: Person = PersonSchema.parse(personData);
    console.log("  Person validated:", JSON.stringify(person, null, 2));
  } catch (error: any) {
    console.log("  Person validation failed:", error.errors[0].message);
  }

  // Example 2: User Profile with optional fields
  console.log("\n User Profile Validation:");
  const profileData = {
    username: "alice_dev",
    email: "alice@dev.com",
    firstName: "Alice"
    // lastName, bio are optional and omitted
    // isPublic and createdAt will use defaults
  };

  try {
    const profile: UserProfile = UserProfileSchema.parse(profileData);
    console.log("  Profile validated:", JSON.stringify(profile, null, 2));
  } catch (error: any) {
    console.log("  Profile validation failed:", error.errors[0].message);
  }

  // Example 3: Nested Customer object
  console.log("\n Customer Validation:");
  const customerData = {
    id: 12345,
    personalInfo: {
      firstName: "Bob",
      lastName: "Smith", 
      age: 35,
      email: "bob@example.com"
    },
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345"
      // country will default to "US"
    },
    preferences: {
      newsletter: false,
      theme: "dark" as const
      // language will default to "en"
    }
  };

  try {
    const customer: Customer = CustomerSchema.parse(customerData);
    console.log("  Customer validated:", JSON.stringify(customer, null, 2));
  } catch (error: any) {
    console.log("  Customer validation failed:", error.errors[0].message);
  }

  // Example 4: Order with array of items
  console.log("\n Order Validation:");
  const orderData = {
    orderId: "ORD-2024-001",
    customerId: 12345,
    items: [
      {
        productId: "PROD-001",
        productName: "Wireless Headphones",
        quantity: 1,
        price: 99.99
      },
      {
        productId: "PROD-002", 
        productName: "USB Cable",
        quantity: 2,
        price: 12.99
      }
    ],
    totalAmount: 125.97,
    status: "pending" as const,
    orderDate: "2024-01-15T10:30:00Z"
  };

  try {
    const order: Order = OrderSchema.parse(orderData);
    console.log("  Order validated:", JSON.stringify(order, null, 2));
  } catch (error: any) {
    console.log("  Order validation failed:", error.errors[0].message);
  }
}

// ========================================
// PARTIAL AND PICK EXAMPLES
// ========================================

export function runAdvancedObjectExamples() {
  console.log("\n ADVANCED OBJECT OPERATIONS");
  console.log("===============================\n");

  // Partial schema - all fields optional
  const PartialPersonSchema = PersonSchema.partial();
  
  console.log(" Partial Person (all fields optional):");
  const partialData = { firstName: "Charlie" }; // Only first name
  
  try {
    const partialPerson = PartialPersonSchema.parse(partialData);
    console.log("  Partial person validated:", JSON.stringify(partialPerson, null, 2));
  } catch (error: any) {
    console.log("  Partial validation failed:", error.errors[0].message);
  }

  // Pick specific fields
  const PersonNameSchema = PersonSchema.pick({ firstName: true, lastName: true });
  
  console.log("\n Pick Name Fields Only:");
  const nameData = { firstName: "Diana", lastName: "Prince", extraField: "ignored" };
  
  try {
    const personName = PersonNameSchema.parse(nameData);
    console.log("  Name fields validated:", JSON.stringify(personName, null, 2));
  } catch (error: any) {
    console.log("  Name validation failed:", error.errors[0].message);
  }

  // Omit specific fields
  const PersonWithoutEmailSchema = PersonSchema.omit({ email: true });
  
  console.log("\n Omit Email Field:");
  const dataWithoutEmail = { firstName: "Clark", lastName: "Kent", age: 32 };
  
  try {
    const personWithoutEmail = PersonWithoutEmailSchema.parse(dataWithoutEmail);
    console.log("  Person without email validated:", JSON.stringify(personWithoutEmail, null, 2));
  } catch (error: any) {
    console.log("  Validation failed:", error.errors[0].message);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  runObjectExamples();
  runAdvancedObjectExamples();
}
