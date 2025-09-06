// Function Composition in TypeScript

// Generic compose function type
type Func<T extends any[], R> = (...args: T) => R;

// Compose two functions
function compose<A extends any[], B, C>(
    f: Func<[B], C>,
    g: Func<A, B>
): Func<A, C> {
    return (...args) => f(g(...args));
}

// Compose multiple functions
function composeMany<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
    return functions.reduce((f, g) => (x) => f(g(x)));
}

// Example: Data transformation pipeline
interface UserData {
    name: string;
    email: string;
    age: number;
}

// Validation functions with type predicates
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAge(age: number): boolean {
    return age >= 0 && age <= 120;
}

// Transform functions
const normalizeEmail = (user: UserData): UserData => ({
    ...user,
    email: user.email.toLowerCase().trim()
});

const validateUser = (user: UserData): UserData => {
    if (!isValidEmail(user.email)) {
        throw new Error(`Invalid email: ${user.email}`);
    }
    if (!isValidAge(user.age)) {
        throw new Error(`Invalid age: ${user.age}`);
    }
    return user;
};

const enrichUser = (user: UserData): UserData & { id: string } => ({
    ...user,
    id: Math.random().toString(36).substr(2, 9)
});

// Curried function example
function curry<T, U, V>(fn: (x: T, y: U) => V): (x: T) => (y: U) => V {
    return (x: T) => (y: U) => fn(x, y);
}

// Partial application example
function partial<T, U, V>(fn: (x: T, y: U) => V, x: T): (y: U) => V {
    return (y: U) => fn(x, y);
}

// Demo implementation
async function functionCompositionDemo() {
    // Create a processing pipeline
    const processUser = composeMany(
        normalizeEmail,
        validateUser,
        enrichUser
    );

    // Test data
    const users: UserData[] = [
        { name: "John Doe", email: "JOHN@example.com", age: 30 },
        { name: "Jane Smith", email: " jane@example.com ", age: 25 },
        { name: "Invalid", email: "not-an-email", age: 150 }
    ];

    // Process users
    users.forEach(user => {
        try {
            const processed = processUser(user);
            console.log("Processed user:", processed);
        } catch (error) {
            console.error(`Error processing user ${user.name}:`, error.message);
        }
    });

    // Currying example
    const multiply = (x: number, y: number) => x * y;
    const curriedMultiply = curry(multiply);
    const multiplyByTwo = curriedMultiply(2);
    
    console.log("\nCurrying example:");
    console.log("multiply(2, 3) =", multiply(2, 3));
    console.log("multiplyByTwo(3) =", multiplyByTwo(3));

    // Partial application example
    const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
    const sayHello = partial(greet, "Hello");
    
    console.log("\nPartial application example:");
    console.log(sayHello("World")); // "Hello, World!"
}

functionCompositionDemo().catch(console.error);
