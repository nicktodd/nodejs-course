# TypeScript Essentials Lab

## Objectives
- Practice using TypeScript types and type annotations
- Work with arrays, tuples, and enums
- Implement interfaces and type aliases
- Handle null, undefined, and unknown types
- Use union types effectively

## Exercise 1: Library Catalog System
Create a TypeScript-based library catalog system that manages books and their metadata.

### Requirements:
1. Define appropriate types for:
   - Book (title, author, ISBN, published date, categories)
   - Author (name, birthYear, nationality)
   - Category (enum)
   - Library Member
2. Implement functions for:
   - Adding books to catalog
   - Searching books by various criteria
   - Checking out/returning books
3. Use proper type safety and null checking
4. Implement proper error handling

### Expected Output:
```typescript
// Example usage
const book: Book = {
    title: "TypeScript Essentials",
    author: {
        name: "John Doe",
        birthYear: 1980,
        nationality: "American"
    },
    ISBN: "123-456-789",
    publishedDate: new Date(2023, 0, 1),
    categories: [Category.Programming, Category.Education]
};

// Adding book
catalog.addBook(book);

// Searching
const results = catalog.searchByAuthor("John Doe");
const available = catalog.checkAvailability("123-456-789");
```

## Exercise 2: Type-Safe Shopping Cart
Create a shopping cart system with strong typing.

### Requirements:
1. Define types for:
   - Product (id, name, price, category)
   - CartItem (product, quantity)
   - Cart (items, total)
2. Implement methods for:
   - Adding/removing items
   - Updating quantities
   - Calculating totals
3. Use union types for different product categories
4. Implement proper type guards
5. Handle edge cases (out of stock, invalid quantities)

### Expected Output:
```typescript
const cart = new ShoppingCart();

cart.addItem({
    id: "123",
    name: "TypeScript Book",
    price: 29.99,
    category: ProductCategory.Books
}, 2);

console.log(cart.getTotal()); // 59.98
console.log(cart.getItemCount()); // 2
```

## Exercise 3: Form Validator
Create a type-safe form validation system.

### Requirements:
1. Define types for:
   - Form fields (text, number, email, date)
   - Validation rules
   - Validation results
2. Implement validators for:
   - Required fields
   - Email format
   - Number ranges
   - Date validity
3. Use generics for flexible field types
4. Implement proper error messages
5. Handle custom validation rules

### Expected Output:
```typescript
const validator = new FormValidator<UserForm>();

validator.addRule('email', {
    type: 'email',
    required: true
});

validator.addRule('age', {
    type: 'number',
    min: 18,
    max: 100
});

const results = validator.validate({
    email: 'invalid-email',
    age: 15
});

console.log(results.isValid); // false
console.log(results.errors); // { email: 'Invalid email format', age: 'Age must be at least 18' }
```

## Bonus Challenge
Add unit tests for all implementations using TypeScript-compatible testing framework (Jest with ts-jest).

## Tips
- Use strict type checking
- Implement proper error handling
- Use type guards where appropriate
- Document your code with TSDoc comments
- Consider edge cases
- Use TypeScript's utility types where appropriate

## Getting Started
1. Create librarySystem.ts for Exercise 1
2. Create shoppingCart.ts for Exercise 2
3. Create formValidator.ts for Exercise 3
4. Install required dependencies:
   ```bash
   npm install typescript @types/node
   ```
5. Compile and run:
   ```bash
   tsc filename.ts
   node filename.js
   ```
