// Advanced Type Inference and Conditional Types

// Define basic types for our domain
type Primitive = string | number | boolean;
type JSONValue = Primitive | JSONObject | JSONArray;
interface JSONObject { [key: string]: JSONValue }
interface JSONArray extends Array<JSONValue> {}

// Conditional type for extracting return type of a function
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

// Type for function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Type for checking if a type is a Promise
type IsPromise<T> = T extends Promise<any> ? true : false;

// Remove Promise wrapper from a type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Type-safe function decorator type
type Decorator<T extends Function> = (
    target: T
) => T extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never;

// Example validator function
interface ValidationRule<T> {
    validate: (value: T) => boolean;
    message: string;
}

type Validator<T> = {
    [K in keyof T]: ValidationRule<T[K]>[];
};

// Example: Create a type-safe validation decorator
function validate<T extends object>(rules: Validator<T>): Decorator<(data: T) => T> {
    return (target: (data: T) => T) => {
        return (data: T): T => {
            // Validate each field
            for (const key in rules) {
                const fieldRules = rules[key];
                const value = data[key];

                for (const rule of fieldRules) {
                    if (!rule.validate(value)) {
                        throw new Error(`Validation failed for ${String(key)}: ${rule.message}`);
                    }
                }
            }

            return target(data);
        };
    };
}

// Example usage
interface User {
    name: string;
    age: number;
    email: string;
}

const userValidationRules: Validator<User> = {
    name: [
        {
            validate: (name) => name.length >= 2,
            message: "Name must be at least 2 characters"
        }
    ],
    age: [
        {
            validate: (age) => age >= 0 && age <= 120,
            message: "Age must be between 0 and 120"
        }
    ],
    email: [
        {
            validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: "Invalid email format"
        }
    ]
};

// Function to process user data with validation
function processUser(data: User): User {
    // Process the validated data
    return {
        ...data,
        name: data.name.trim(),
        email: data.email.toLowerCase()
    };
}

// Apply validation decorator
const processUserWithValidation = validate(userValidationRules)(processUser);

// Type inference examples
type UserFunction = typeof processUser;
type UserFunctionParams = Parameters<UserFunction>;
type UserFunctionReturn = ReturnTypeOf<UserFunction>;

// Async function example with Promise unwrapping
async function fetchUserData(): Promise<User> {
    // Simulate API call
    return {
        name: "John Doe",
        age: 30,
        email: "john@example.com"
    };
}

type FetchUserReturn = ReturnTypeOf<typeof fetchUserData>;
type UnwrappedUserData = UnwrapPromise<FetchUserReturn>;

// Demonstration
async function runTypeInferenceDemo() {
    console.log('Type Inference and Conditional Types Demo\n');

    // Test valid data
    try {
        const validUser = processUserWithValidation({
            name: "Alice Smith",
            age: 25,
            email: "alice@example.com"
        });
        console.log('Valid user processed:', validUser);
    } catch (error) {
        console.error('Validation error:', error.message);
    }

    // Test invalid data
    try {
        const invalidUser = processUserWithValidation({
            name: "B",
            age: 150,
            email: "invalid-email"
        });
        console.log('This should not print:', invalidUser);
    } catch (error) {
        console.error('Expected validation error:', error.message);
    }

    // Demonstrate async function type inference
    const userData = await fetchUserData();
    console.log('\nFetched user data:', userData);

    // Type information (these would be visible in TypeScript tooling)
    type IsUserFetchPromise = IsPromise<FetchUserReturn>;  // true
    type RawUserData = UnwrapPromise<FetchUserReturn>;     // User
}

runTypeInferenceDemo().catch(console.error);
