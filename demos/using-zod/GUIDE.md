# Getting Started with Zod - A Beginner's Guide

Welcome to the Zod tutorial! This guide will walk you through everything you need to know about using Zod for type validation in TypeScript.

## What is Zod?

Zod is a TypeScript-first schema validation library that helps you:
- ✅ Validate data at runtime (not just compile time)
- 🔒 Ensure your application receives the correct data types
- 🚀 Automatically generate TypeScript types from your validation schemas
- 🛡️ Provide detailed error messages when validation fails

## Why Use Zod?

### Before Zod (Manual Validation)
```typescript
function processUser(data: any) {
  // Manual validation - error-prone and verbose
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Name is required and must be a string');
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    throw new Error('Valid email is required');
  }
  if (typeof data.age !== 'number' || data.age < 0) {
    throw new Error('Age must be a positive number');
  }
  // ... more validation code
}
```

### With Zod (Clean and Declarative)
```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive()
});

function processUser(data: unknown) {
  const user = UserSchema.parse(data); // Validates and returns typed data
  // user is now guaranteed to have the correct structure
}
```

## Installation

```bash
npm install zod
```

## Core Concepts

### 1. Schema Definition
A schema describes what your data should look like:

```typescript
import { z } from 'zod';

// Simple schemas
const nameSchema = z.string();
const ageSchema = z.number();
const isActiveSchema = z.boolean();

// Object schema
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  isActive: z.boolean()
});
```

### 2. Validation Methods

#### `.parse()` - Throws on Error
```typescript
try {
  const user = userSchema.parse(someData);
  // user is valid and typed
} catch (error) {
  // Handle validation error
}
```

#### `.safeParse()` - Returns Result Object
```typescript
const result = userSchema.safeParse(someData);

if (result.success) {
  // result.data contains valid, typed data
  console.log(result.data);
} else {
  // result.error contains validation errors
  console.log(result.error.errors);
}
```

### 3. Type Inference
Zod automatically creates TypeScript types:

```typescript
const UserSchema = z.object({
  name: z.string(),
  age: z.number()
});

// This type is automatically inferred!
type User = z.infer<typeof UserSchema>;
// User = { name: string; age: number }
```

## Common Schema Types

### Primitives
```typescript
z.string()          // string
z.number()          // number
z.boolean()         // boolean
z.date()            // Date object
z.undefined()       // undefined
z.null()            // null
z.any()             // any type
```

### String Validations
```typescript
z.string().min(5)                    // Minimum length
z.string().max(100)                  // Maximum length
z.string().email()                   // Email format
z.string().url()                     // URL format
z.string().regex(/^[A-Z]+$/)         // Custom regex
z.string().startsWith("prefix")      // Must start with
z.string().endsWith("suffix")        // Must end with
```

### Number Validations
```typescript
z.number().min(0)                    // Minimum value
z.number().max(100)                  // Maximum value
z.number().int()                     // Must be integer
z.number().positive()                // Must be positive
z.number().negative()                // Must be negative
z.number().multipleOf(5)             // Must be multiple of 5
```

### Objects
```typescript
z.object({
  required: z.string(),
  optional: z.string().optional(),
  withDefault: z.boolean().default(true)
})
```

### Arrays
```typescript
z.array(z.string())                  // Array of strings
z.array(z.number()).min(1)           // Non-empty array
z.array(z.object({ id: z.number() })) // Array of objects
```

### Enums
```typescript
z.enum(['red', 'green', 'blue'])     // Literal values
z.nativeEnum(MyEnum)                 // TypeScript enum
```

## Practical Examples

### 1. API Request Validation
```typescript
const CreateUserRequest = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(18).max(120)
});

// In your API handler
app.post('/users', (req, res) => {
  const result = CreateUserRequest.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.errors
    });
  }
  
  // result.data is now typed and validated
  const user = createUser(result.data);
  res.json(user);
});
```

### 2. Form Validation
```typescript
const RegistrationForm = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8),
  confirmPassword: z.string(),
  email: z.string().email()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
```

### 3. Environment Variables
```typescript
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32)
});

const env = EnvSchema.parse(process.env);
// env is now typed and validated
```

## Advanced Features

### Custom Validation
```typescript
const passwordSchema = z.string()
  .min(8)
  .refine((password) => /[A-Z]/.test(password), {
    message: "Must contain uppercase letter"
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Must contain number"
  });
```

### Transformations
```typescript
const schema = z.object({
  email: z.string().email().transform(email => email.toLowerCase()),
  age: z.string().transform(str => parseInt(str)).pipe(z.number())
});
```

### Conditional Logic
```typescript
const schema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('user'), userId: z.number() }),
  z.object({ type: z.literal('guest'), sessionId: z.string() })
]);
```

## Best Practices

1. **Start Simple**: Begin with basic validation and add complexity as needed
2. **Use Type Inference**: Let Zod generate your TypeScript types
3. **Handle Errors Gracefully**: Always use `safeParse()` in production code
4. **Validate at Boundaries**: Validate data when it enters your application (APIs, forms, etc.)
5. **Create Reusable Schemas**: Define common schemas once and reuse them
6. **Document Your Schemas**: Add clear error messages for better user experience

## Common Patterns

### Schema Composition
```typescript
const BaseUser = z.object({
  name: z.string(),
  email: z.string().email()
});

const AdminUser = BaseUser.extend({
  role: z.literal('admin'),
  permissions: z.array(z.string())
});
```

### Optional Fields
```typescript
// Making all fields optional
const PartialUser = UserSchema.partial();

// Making specific fields optional
const UserUpdate = UserSchema.pick({ name: true, email: true }).partial();
```

### Error Handling
```typescript
function validateUser(data: unknown) {
  const result = UserSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    throw new ValidationError('User validation failed', errors);
  }
  
  return result.data;
}
```

## Next Steps

1. **Run the Examples**: Execute the example files in this project
2. **Modify Test Data**: Change the sample data to see different validation behaviors
3. **Create Your Own Schemas**: Start with simple schemas for your own projects
4. **Explore Documentation**: Check out the official Zod documentation for advanced features
5. **Practice**: The best way to learn is by doing!

## Resources

- [Official Zod Documentation](https://zod.dev/)
- [Zod GitHub Repository](https://github.com/colinhacks/zod)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

Happy validating! 🎉
