// TypeScript Essentials - Exercise 3 Solution: TypeScript Configuration and Strictness

interface User {
    id: number;
    name: string;
    email: string | null;
    age?: number; // Optional property
}

// Explicit type assignments
const userId: number = 1;
const userName: string = "John Doe";
const userEmail: string | null = null;

// Implicit type assignments (let TypeScript infer)
const isActive = true; // TypeScript infers boolean
const scores = [85, 90, 95]; // TypeScript infers number[]

// Function with typed parameters and return value
function calculateTotal(prices: number[]): number {
    return prices.reduce((total, price) => total + price, 0);
}

// Object with defined interface
const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
    // age is optional
};

// Using union types for null/undefined
function getDisplayName(user: User): string {
    return user.name || "Anonymous";
}

console.log("User:", user);
console.log("Display name:", getDisplayName(user));
console.log("Total score:", calculateTotal(scores));
