"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runObjectExamples = runObjectExamples;
exports.runAdvancedObjectExamples = runAdvancedObjectExamples;
const zod_1 = require("zod");
/**
 * This file demonstrates how to work with complex objects using Zod
 * Shows nested objects, optional fields, and real-world scenarios
 */
// ========================================
// SIMPLE OBJECT SCHEMA
// ========================================
const PersonSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    age: zod_1.z.number().int().min(0).max(150),
    email: zod_1.z.string().email()
});
// ========================================
// OBJECT WITH OPTIONAL FIELDS
// ========================================
const UserProfileSchema = zod_1.z.object({
    // Required fields
    username: zod_1.z.string().min(3).max(30),
    email: zod_1.z.string().email(),
    // Optional fields
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    bio: zod_1.z.string().max(500).optional(),
    // Optional with default value
    isPublic: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.string().datetime().default(() => new Date().toISOString())
});
// ========================================
// NESTED OBJECT SCHEMA
// ========================================
const AddressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(2).max(2), // State abbreviation
    zipCode: zod_1.z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
    country: zod_1.z.string().default("US")
});
const CustomerSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    personalInfo: PersonSchema,
    address: AddressSchema,
    preferences: zod_1.z.object({
        newsletter: zod_1.z.boolean().default(true),
        theme: zod_1.z.enum(['light', 'dark']).default('light'),
        language: zod_1.z.string().default('en')
    })
});
// ========================================
// ARRAY OF OBJECTS
// ========================================
const OrderItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    productName: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    price: zod_1.z.number().positive()
});
const OrderSchema = zod_1.z.object({
    orderId: zod_1.z.string(),
    customerId: zod_1.z.number().int().positive(),
    items: zod_1.z.array(OrderItemSchema).min(1, "Order must have at least one item"),
    totalAmount: zod_1.z.number().positive(),
    status: zod_1.z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    orderDate: zod_1.z.string().datetime()
});
// ========================================
// EXAMPLE USAGE
// ========================================
function runObjectExamples() {
    console.log("🏗️  OBJECT VALIDATION EXAMPLES");
    console.log("==============================\n");
    // Example 1: Simple Person
    console.log("👤 Simple Person Validation:");
    const personData = {
        firstName: "Alice",
        lastName: "Johnson",
        age: 28,
        email: "alice@example.com"
    };
    try {
        const person = PersonSchema.parse(personData);
        console.log("  ✅ Person validated:", JSON.stringify(person, null, 2));
    }
    catch (error) {
        console.log("  ❌ Person validation failed:", error.errors[0].message);
    }
    // Example 2: User Profile with optional fields
    console.log("\n👥 User Profile Validation:");
    const profileData = {
        username: "alice_dev",
        email: "alice@dev.com",
        firstName: "Alice"
        // lastName, bio are optional and omitted
        // isPublic and createdAt will use defaults
    };
    try {
        const profile = UserProfileSchema.parse(profileData);
        console.log("  ✅ Profile validated:", JSON.stringify(profile, null, 2));
    }
    catch (error) {
        console.log("  ❌ Profile validation failed:", error.errors[0].message);
    }
    // Example 3: Nested Customer object
    console.log("\n🏪 Customer Validation:");
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
            theme: "dark"
            // language will default to "en"
        }
    };
    try {
        const customer = CustomerSchema.parse(customerData);
        console.log("  ✅ Customer validated:", JSON.stringify(customer, null, 2));
    }
    catch (error) {
        console.log("  ❌ Customer validation failed:", error.errors[0].message);
    }
    // Example 4: Order with array of items
    console.log("\n🛒 Order Validation:");
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
        status: "pending",
        orderDate: "2024-01-15T10:30:00Z"
    };
    try {
        const order = OrderSchema.parse(orderData);
        console.log("  ✅ Order validated:", JSON.stringify(order, null, 2));
    }
    catch (error) {
        console.log("  ❌ Order validation failed:", error.errors[0].message);
    }
}
// ========================================
// PARTIAL AND PICK EXAMPLES
// ========================================
function runAdvancedObjectExamples() {
    console.log("\n🔧 ADVANCED OBJECT OPERATIONS");
    console.log("===============================\n");
    // Partial schema - all fields optional
    const PartialPersonSchema = PersonSchema.partial();
    console.log("🔄 Partial Person (all fields optional):");
    const partialData = { firstName: "Charlie" }; // Only first name
    try {
        const partialPerson = PartialPersonSchema.parse(partialData);
        console.log("  ✅ Partial person validated:", JSON.stringify(partialPerson, null, 2));
    }
    catch (error) {
        console.log("  ❌ Partial validation failed:", error.errors[0].message);
    }
    // Pick specific fields
    const PersonNameSchema = PersonSchema.pick({ firstName: true, lastName: true });
    console.log("\n📝 Pick Name Fields Only:");
    const nameData = { firstName: "Diana", lastName: "Prince", extraField: "ignored" };
    try {
        const personName = PersonNameSchema.parse(nameData);
        console.log("  ✅ Name fields validated:", JSON.stringify(personName, null, 2));
    }
    catch (error) {
        console.log("  ❌ Name validation failed:", error.errors[0].message);
    }
    // Omit specific fields
    const PersonWithoutEmailSchema = PersonSchema.omit({ email: true });
    console.log("\n🚫 Omit Email Field:");
    const dataWithoutEmail = { firstName: "Clark", lastName: "Kent", age: 32 };
    try {
        const personWithoutEmail = PersonWithoutEmailSchema.parse(dataWithoutEmail);
        console.log("  ✅ Person without email validated:", JSON.stringify(personWithoutEmail, null, 2));
    }
    catch (error) {
        console.log("  ❌ Validation failed:", error.errors[0].message);
    }
}
// Run examples if this file is executed directly
if (require.main === module) {
    runObjectExamples();
    runAdvancedObjectExamples();
}
//# sourceMappingURL=object-validation.js.map