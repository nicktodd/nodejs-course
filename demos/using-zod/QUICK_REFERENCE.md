# Zod Quick Reference

A handy cheat sheet for common Zod patterns and usage.

## Basic Setup
```typescript
import { z } from 'zod';
```

## Primitive Types
```typescript
z.string()          // string
z.number()          // number  
z.boolean()         // boolean
z.date()            // Date object
z.undefined()       // undefined
z.null()            // null
z.any()             // any type
z.unknown()         // unknown type
z.void()            // void
z.never()           // never
```

## String Validations
```typescript
z.string().min(5)                    // min length
z.string().max(100)                  // max length  
z.string().length(10)                // exact length
z.string().email()                   // email format
z.string().url()                     // URL format
z.string().uuid()                    // UUID format
z.string().regex(/pattern/)          // custom regex
z.string().startsWith("prefix")      // starts with
z.string().endsWith("suffix")        // ends with
z.string().trim()                    // trim whitespace
z.string().toLowerCase()             // convert to lowercase
z.string().toUpperCase()             // convert to uppercase
```

## Number Validations
```typescript
z.number().min(0)                    // minimum value
z.number().max(100)                  // maximum value
z.number().int()                     // integer only
z.number().positive()                // > 0
z.number().nonnegative()             // >= 0
z.number().negative()                // < 0
z.number().nonpositive()             // <= 0
z.number().multipleOf(5)             // multiple of 5
z.number().finite()                  // not Infinity/-Infinity
z.number().safe()                    // within safe integer range
```

## Arrays
```typescript
z.array(z.string())                  // array of strings
z.array(z.number()).min(1)           // non-empty array
z.array(z.string()).max(10)          // max 10 items
z.array(z.string()).length(5)        // exactly 5 items
z.array(z.string()).nonempty()       // at least 1 item
```

## Objects
```typescript
z.object({
  name: z.string(),
  age: z.number()
})

// Optional fields
z.object({
  name: z.string(),
  nickname: z.string().optional()
})

// Default values
z.object({
  name: z.string(),
  active: z.boolean().default(true)
})

// Additional properties
z.object({
  name: z.string()
}).strict()                          // no extra properties
```

## Enums
```typescript
z.enum(['red', 'green', 'blue'])     // literal union
z.nativeEnum(MyEnum)                 // TypeScript enum
z.literal('value')                   // single literal value
```

## Optional and Nullable
```typescript
z.string().optional()                // string | undefined
z.string().nullable()                // string | null
z.string().nullish()                 // string | null | undefined
```

## Unions and Intersections
```typescript
z.union([z.string(), z.number()])    // string | number
z.intersection(
  z.object({ name: z.string() }),
  z.object({ age: z.number() })
)                                    // { name: string } & { age: number }
```

## Validation Methods
```typescript
// Throws on error
schema.parse(data)

// Returns success/error object
const result = schema.safeParse(data)
if (result.success) {
  console.log(result.data)
} else {
  console.log(result.error.errors)
}

// Type guard
schema.check(data)                   // boolean
```

## Type Inference
```typescript
const UserSchema = z.object({
  name: z.string(),
  age: z.number()
})

type User = z.infer<typeof UserSchema>
// User = { name: string; age: number }
```

## Object Utilities
```typescript
const schema = z.object({
  name: z.string(),
  email: z.string(),
  age: z.number()
})

// All optional
schema.partial()

// Specific fields only
schema.pick({ name: true, email: true })

// Exclude specific fields  
schema.omit({ age: true })

// Deep partial
schema.deepPartial()

// Required (opposite of partial)
schema.required()

// Extend with new fields
schema.extend({ id: z.number() })

// Merge with another schema
schema.merge(otherSchema)
```

## Custom Validation
```typescript
z.string().refine(
  (val) => val.length > 5,
  { message: "Must be longer than 5 characters" }
)

// Multiple refinements
z.string()
  .refine((val) => val.includes('@'), "Must contain @")
  .refine((val) => val.endsWith('.com'), "Must end with .com")
```

## Transformations
```typescript
z.string().transform(s => s.toLowerCase())
z.string().transform(s => parseInt(s)).pipe(z.number())

// Coercion (automatic transformation)
z.coerce.number()                    // converts string to number
z.coerce.boolean()                   // converts to boolean
z.coerce.date()                      // converts to Date
```

## Error Handling
```typescript
try {
  schema.parse(data)
} catch (error) {
  if (error instanceof z.ZodError) {
    error.errors.forEach(err => {
      console.log(`${err.path.join('.')}: ${err.message}`)
    })
  }
}
```

## Common Patterns

### API Request Validation
```typescript
const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive()
})

function createUser(req: Request) {
  const userData = CreateUserSchema.parse(req.body)
  // userData is now typed and validated
}
```

### Form Validation
```typescript
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})
```

### Environment Variables
```typescript
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url()
})

const env = EnvSchema.parse(process.env)
```

### Discriminated Unions
```typescript
const AnimalSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('dog'), breed: z.string() }),
  z.object({ type: z.literal('cat'), indoor: z.boolean() })
])
```

### Recursive Types
```typescript
type Category = {
  name: string
  subcategories: Category[]
}

const CategorySchema: z.ZodType<Category> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(CategorySchema)
  })
)
```

## Performance Tips

1. Reuse schema objects (don't recreate them)
2. Use `.safeParse()` instead of try/catch with `.parse()`
3. Use `.strip()` to remove unknown properties efficiently
4. Consider using `.passthrough()` for less strict validation
5. Cache compiled schemas for repeated use

## Debugging

```typescript
// Enable debug mode
const schema = z.string().debug()

// Custom error messages
const schema = z.string().min(5, {
  message: "String must be at least 5 characters long"
})

// Error formatting
function formatZodError(error: z.ZodError) {
  return error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    received: err.received
  }))
}
```
