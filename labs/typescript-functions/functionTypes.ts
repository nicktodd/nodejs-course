// Advanced Function Types and Type Guards

// Discriminated unions for different result types
interface Success<T> {
    type: 'success';
    data: T;
    timestamp: Date;
}

interface Failure {
    type: 'failure';
    error: string;
    code: number;
    timestamp: Date;
}

type Result<T> = Success<T> | Failure;

// Type guard functions
function isSuccess<T>(result: Result<T>): result is Success<T> {
    return result.type === 'success';
}

function isFailure(result: Result<any>): result is Failure {
    return result.type === 'failure';
}

// Higher-order function type
type AsyncTransformer<T, U> = (input: T) => Promise<Result<U>>;

// Function composition with error handling
async function compose<T, U, V>(
    f: AsyncTransformer<U, V>,
    g: AsyncTransformer<T, U>
): AsyncTransformer<T, V> {
    return async (input: T): Promise<Result<V>> => {
        const firstResult = await g(input);
        
        if (isFailure(firstResult)) {
            return firstResult;
        }

        return await f(firstResult.data);
    };
}

// Example domain: Data validation and transformation
interface UserInput {
    email: string;
    password: string;
}

interface ValidatedUser {
    email: string;
    passwordHash: string;
}

interface UserProfile {
    email: string;
    passwordHash: string;
    createdAt: Date;
}

// Validation function
const validateInput: AsyncTransformer<UserInput, ValidatedUser> = async (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(input.email)) {
        return {
            type: 'failure',
            error: 'Invalid email format',
            code: 400,
            timestamp: new Date()
        };
    }

    if (input.password.length < 8) {
        return {
            type: 'failure',
            error: 'Password must be at least 8 characters',
            code: 400,
            timestamp: new Date()
        };
    }

    // Simulate password hashing
    const passwordHash = Buffer.from(input.password).toString('base64');

    return {
        type: 'success',
        data: {
            email: input.email.toLowerCase(),
            passwordHash
        },
        timestamp: new Date()
    };
};

// Profile creation function
const createProfile: AsyncTransformer<ValidatedUser, UserProfile> = async (user) => {
    // Simulate profile creation
    return {
        type: 'success',
        data: {
            ...user,
            createdAt: new Date()
        },
        timestamp: new Date()
    };
};

// Demonstration
async function runFunctionTypesDemo() {
    console.log('Function Types and Type Guards Demo\n');

    // Compose validation and profile creation
    const createUserProfile = compose(createProfile, validateInput);

    // Test cases
    const testCases: UserInput[] = [
        {
            email: 'valid@example.com',
            password: 'secure123'
        },
        {
            email: 'invalid-email',
            password: 'short'
        }
    ];

    for (const input of testCases) {
        console.log('Processing input:', input);
        const result = await createUserProfile(input);

        if (isSuccess(result)) {
            console.log('Success! Created profile:', result.data);
        } else {
            console.log('Failed:', result.error, `(Code: ${result.code})`);
        }
        console.log();
    }

    // Demonstrate type narrowing
    function processResult<T>(result: Result<T>) {
        if (isSuccess(result)) {
            // TypeScript knows result.data is of type T
            console.log('Processing successful result:', result.data);
        } else {
            // TypeScript knows result.error is of type string
            console.log('Processing error:', result.error);
        }
    }

    // Test type narrowing
    const successResult = await createUserProfile(testCases[0]);
    console.log('Type Narrowing Demo:');
    processResult(successResult);
}

runFunctionTypesDemo().catch(console.error);
