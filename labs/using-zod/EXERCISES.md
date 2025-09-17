# Zod Practice Exercises

Complete these exercises to practice your Zod skills. Solutions are provided at the bottom.

## Exercise 1: Basic User Validation

Create a Zod schema for a user with the following requirements:
- `id`: positive integer
- `username`: string, 3-20 characters, alphanumeric only
- `email`: valid email format
- `age`: integer between 13 and 120
- `isVerified`: boolean, defaults to false

```typescript
// Your solution here:
const UserSchema = 
```

## Exercise 2: Product Schema

Create a schema for an e-commerce product:
- `sku`: string, must start with "PROD-" followed by 6 digits
- `name`: string, 1-200 characters
- `price`: positive number with max 2 decimal places
- `category`: one of ['electronics', 'clothing', 'books', 'home']
- `tags`: array of strings, maximum 5 tags
- `dimensions`: optional object with `width`, `height`, `depth` (all positive numbers)
- `inStock`: boolean

```typescript
// Your solution here:
const ProductSchema = 
```

## Exercise 3: API Request Validation

Create validation for a blog post creation API:
- `title`: string, 1-100 characters
- `content`: string, minimum 10 characters
- `authorId`: positive integer
- `tags`: optional array of strings (max 10 tags)
- `publishedAt`: optional ISO datetime string
- `status`: 'draft', 'published', or 'archived'

Add a custom validation that ensures published posts must have a `publishedAt` date.

```typescript
// Your solution here:
const CreatePostSchema = 
```

## Exercise 4: Form Validation with Custom Rules

Create a user registration form schema:
- `firstName`: string, 1-50 characters
- `lastName`: string, 1-50 characters  
- `email`: valid email
- `password`: minimum 8 characters, must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (!@#$%^&*)
- `confirmPassword`: must match password
- `dateOfBirth`: date string, user must be at least 18 years old
- `agreeToTerms`: must be true

```typescript
// Your solution here:
const RegistrationSchema = 
```

## Exercise 5: Nested Object Validation

Create a schema for a customer order:
- `orderId`: string UUID format
- `customer`: object with:
  - `id`: positive integer
  - `email`: valid email
  - `name`: string, 1-100 characters
- `items`: array (minimum 1 item) of objects with:
  - `productId`: string
  - `name`: string
  - `quantity`: positive integer
  - `price`: positive number
- `shipping`: object with:
  - `address`: string, minimum 10 characters
  - `city`: string
  - `postalCode`: string, 5 digits
  - `country`: string, 2 character country code (uppercase)
- `total`: positive number that equals sum of (item.price * item.quantity) for all items

```typescript
// Your solution here:
const OrderSchema = 
```

## Exercise 6: Environment Variables

Create a schema for validating environment variables:
- `NODE_ENV`: 'development', 'production', or 'test'
- `PORT`: number, defaults to 3000
- `DATABASE_URL`: valid URL
- `JWT_SECRET`: string, minimum 32 characters
- `LOG_LEVEL`: optional, one of ['debug', 'info', 'warn', 'error'], defaults to 'info'
- `MAX_UPLOAD_SIZE`: string that represents bytes (e.g., "10MB"), convert to number

```typescript
// Your solution here:
const EnvSchema = 
```

## Exercise 7: Discriminated Union

Create a schema for different types of notifications:
- All notifications have: `id` (string), `timestamp` (ISO datetime), `read` (boolean)
- Email notification adds: `type: 'email'`, `subject` (string), `body` (string)
- Push notification adds: `type: 'push'`, `title` (string), `message` (string)
- SMS notification adds: `type: 'sms'`, `phoneNumber` (string), `message` (string)

```typescript
// Your solution here:
const NotificationSchema = 
```

---

## Solutions

<details>
<summary>Click to reveal solutions</summary>

### Exercise 1 Solution:
```typescript
const UserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().min(13, "Must be at least 13 years old").max(120, "Age cannot exceed 120"),
  isVerified: z.boolean().default(false)
});
```

### Exercise 2 Solution:
```typescript
const ProductSchema = z.object({
  sku: z.string().regex(/^PROD-\d{6}$/, "SKU must be in format PROD-123456"),
  name: z.string().min(1).max(200),
  price: z.number().positive().refine(
    (price) => Number((price * 100).toFixed(0)) / 100 === price,
    "Price can have maximum 2 decimal places"
  ),
  category: z.enum(['electronics', 'clothing', 'books', 'home']),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    depth: z.number().positive()
  }).optional(),
  inStock: z.boolean()
});
```

### Exercise 3 Solution:
```typescript
const CreatePostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10, "Content must be at least 10 characters"),
  authorId: z.number().int().positive(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'published', 'archived'])
}).refine(
  (data) => {
    if (data.status === 'published') {
      return data.publishedAt !== undefined;
    }
    return true;
  },
  {
    message: "Published posts must have a publishedAt date",
    path: ["publishedAt"]
  }
);
```

### Exercise 4 Solution:
```typescript
const RegistrationSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => /[A-Z]/.test(password), "Must contain uppercase letter")
    .refine((password) => /[a-z]/.test(password), "Must contain lowercase letter")
    .refine((password) => /[0-9]/.test(password), "Must contain number")
    .refine((password) => /[!@#$%^&*]/.test(password), "Must contain special character"),
  confirmPassword: z.string(),
  dateOfBirth: z.string().datetime().refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    },
    "Must be at least 18 years old"
  ),
  agreeToTerms: z.boolean().refine((val) => val === true, "Must agree to terms")
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
);
```

### Exercise 5 Solution:
```typescript
const OrderSchema = z.object({
  orderId: z.string().uuid(),
  customer: z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    name: z.string().min(1).max(100)
  }),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })).min(1, "Order must have at least one item"),
  shipping: z.object({
    address: z.string().min(10),
    city: z.string(),
    postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits"),
    country: z.string().length(2).regex(/^[A-Z]{2}$/, "Country code must be 2 uppercase letters")
  }),
  total: z.number().positive()
}).refine(
  (data) => {
    const calculatedTotal = data.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    return Math.abs(calculatedTotal - data.total) < 0.01; // Allow for small floating point errors
  },
  {
    message: "Total must equal sum of item prices",
    path: ["total"]
  }
);
```

### Exercise 6 Solution:
```typescript
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info').optional(),
  MAX_UPLOAD_SIZE: z.string()
    .regex(/^\d+[KMGT]?B$/, "Must be in format like '10MB', '1GB', etc.")
    .transform((size) => {
      const match = size.match(/^(\d+)([KMGT]?)B$/);
      if (!match) return 0;
      
      const [, num, unit] = match;
      const multipliers = { '': 1, K: 1024, M: 1024**2, G: 1024**3, T: 1024**4 };
      return parseInt(num) * multipliers[unit as keyof typeof multipliers];
    })
});
```

### Exercise 7 Solution:
```typescript
const NotificationSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('email'),
    id: z.string(),
    timestamp: z.string().datetime(),
    read: z.boolean(),
    subject: z.string(),
    body: z.string()
  }),
  z.object({
    type: z.literal('push'),
    id: z.string(),
    timestamp: z.string().datetime(),
    read: z.boolean(),
    title: z.string(),
    message: z.string()
  }),
  z.object({
    type: z.literal('sms'),
    id: z.string(),
    timestamp: z.string().datetime(),
    read: z.boolean(),
    phoneNumber: z.string(),
    message: z.string()
  })
]);
```

</details>

## Additional Challenges

1. **Performance Test**: Create a schema that validates 1000 user objects efficiently
2. **Error Customization**: Create custom error messages for all validation rules
3. **Integration**: Use these schemas in an Express.js API with proper error handling
4. **TypeScript Integration**: Use the inferred types throughout a small application
5. **Real-world Data**: Find real JSON data online and create schemas to validate it

Remember: The best way to learn Zod is by practicing with real data from your projects!
