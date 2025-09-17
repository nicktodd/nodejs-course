# Zod Demonstration Code

This directory contains demonstration code showing how to use Zod for runtime type validation in TypeScript. These are working examples to illustrate Zod concepts during lectures and presentations.

**Note:** For hands-on exercises and lab work, see the `labs/using-zod/` directory. Solutions are available in `solutions/using-zod/`.

## What is Zod?

Zod is a TypeScript-first schema validation library that allows you to:
- Define schemas for your data structures
- Validate data at runtime (not just compile time)  
- Automatically infer TypeScript types from schemas
- Provide detailed, customizable error messages for invalid data
- Ensure type safety throughout your application

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Basic knowledge of TypeScript
- Familiarity with JavaScript objects and arrays

### Installation
1. Clone or download this example
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the main example:
   ```bash
   npm run dev
   ```
   
4. Or build and run the compiled version:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── index.ts              # Main demo application
├── schemas.ts            # Core Zod schema definitions
├── test.ts              # Test suite for validation
├── examples/            
│   ├── basic-validation.ts    # Simple validation examples
│   ├── object-validation.ts   # Complex object validation
│   └── api-validation.ts      # Real-world API scenarios
└── data/
    └── sample-data.ts         # Test data for examples
```

## What You'll Learn

### 1. **Basic Schema Validation** (`src/examples/basic-validation.ts`)
- String, number, and boolean validation
- Built-in validators (email, URL, etc.)
- Custom constraints (min/max length, regex patterns)
- Safe parsing vs throwing validation

### 2. **Object Validation** (`src/examples/object-validation.ts`)  
- Complex nested objects
- Optional and required fields
- Default values
- Array validation
- Schema composition and reuse

### 3. **API Validation** (`src/examples/api-validation.ts`)
- Request body validation
- Query parameter validation
- Response schema validation
- Error handling middleware
- Data transformation

### 4. **Advanced Features** (`src/schemas.ts`)
- Custom validation rules with `.refine()`
- Discriminated unions
- Type inference with `z.infer<>`
- Schema transformations
- Conditional validation

## Running the Examples

### Main Application
```bash
npm start
# Shows comprehensive examples with colored output
```

### Individual Examples
```bash
# Basic validation concepts
node dist/examples/basic-validation.js

# Object and nested validation
node dist/examples/object-validation.js

# API validation scenarios  
node dist/examples/api-validation.js

# Test suite
node dist/test.js
```

### Development Mode
```bash
npm run dev
# Runs TypeScript directly without compilation
```

## Learning Path

1. **Run Examples**: Execute the example files to see Zod in action
2. **Experiment**: Modify the sample data and schemas to test different scenarios
3. **For Learning**: See `../../labs/using-zod/` for guided exercises
4. **For Reference**: Check `../../labs/using-zod/QUICK_REFERENCE.md` for syntax help

## Key Concepts Demonstrated

### Schema Definition
```typescript
const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  isActive: z.boolean().default(true)
});
```

### Type Inference
```typescript
type User = z.infer<typeof UserSchema>;
// Automatically creates: { id: number; name: string; email: string; age: number; isActive: boolean }
```

### Validation Methods
```typescript
// Throws on error
const user = UserSchema.parse(userData);

// Safe parsing (recommended)
const result = UserSchema.safeParse(userData);
if (result.success) {
  console.log(result.data); // Validated data
} else {
  console.log(result.error.errors); // Validation errors
}
```

### Custom Validation
```typescript
const PasswordSchema = z.string()
  .min(8)
  .refine(pwd => /[A-Z]/.test(pwd), "Must contain uppercase")
  .refine(pwd => /[0-9]/.test(pwd), "Must contain number");
```

## Real-World Usage Examples

### Express.js API Validation
```typescript
app.post('/users', (req, res) => {
  const result = CreateUserSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.errors
    });
  }
  
  // result.data is now typed and validated
  const user = await createUser(result.data);
  res.json(user);
});
```

### Form Validation
```typescript
const registrationResult = RegistrationSchema.safeParse(formData);
if (!registrationResult.success) {
  // Show validation errors to user
  setFormErrors(registrationResult.error.errors);
} else {
  // Submit valid form data
  await submitRegistration(registrationResult.data);
}
```

### Environment Configuration
```typescript
const config = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url()
}).parse(process.env);
```

## Best Practices Demonstrated

1. **Type Safety**: All schemas automatically generate TypeScript types
2. **Error Handling**: Comprehensive error handling with detailed messages
3. **Validation at Boundaries**: Validate data when it enters your application
4. **Schema Reuse**: Create composable, reusable validation schemas  
5. **Performance**: Efficient validation suitable for production use
6. **Developer Experience**: Clear error messages and good debugging tools

## Common Use Cases

- **API Development**: Validate request/response data in REST or GraphQL APIs
- **Form Validation**: Client and server-side form validation
- **Configuration**: Validate environment variables and config files
- **Data Import**: Validate external data before processing
- **Database Models**: Ensure data integrity before database operations
- **Microservices**: Validate data at service boundaries

## Troubleshooting

### Common Issues

**TypeScript Errors**: Make sure you have the latest TypeScript version
```bash
npm install typescript@latest
```

**Module Not Found**: Ensure all dependencies are installed
```bash
npm install
```

**Validation Failing**: Check the sample data in `src/data/sample-data.ts` for examples

### Debug Mode
Enable detailed error messages:
```typescript
const schema = z.string().debug(); // Adds debugging info
```

## Additional Resources

- **[Official Zod Documentation](https://zod.dev/)** - Complete API reference
- **[Zod GitHub Repository](https://github.com/colinhacks/zod)** - Source code and issues
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript fundamentals
- **`../../labs/using-zod/GUIDE.md`** - Comprehensive beginner's guide
- **`../../labs/using-zod/QUICK_REFERENCE.md`** - Handy cheat sheet
- **`../../labs/using-zod/EXERCISES.md`** - Practice problems with solutions

## Next Steps

After mastering this example:

1. **Integrate with your projects**: Use Zod in your own TypeScript applications
2. **Explore advanced features**: Discriminated unions, recursive types, custom transforms
3. **Framework integration**: Use with Express.js, Next.js, tRPC, or other frameworks
4. **Testing**: Write comprehensive tests for your validation schemas
5. **Performance optimization**: Learn about schema caching and optimization techniques
