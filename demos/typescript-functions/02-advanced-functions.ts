// Advanced Function Patterns

// Function overloading with generics
interface Pair<T, U> {
    first: T;
    second: U;
}

function createPair<T, U>(first: T, second: U): Pair<T, U>;
function createPair<T>(both: T): Pair<T, T>;
function createPair<T, U>(first: T, second?: U): Pair<T, T | U> {
    return {
        first,
        second: second ?? first
    };
}

const numberPair = createPair(1, 2);
const stringPair = createPair('hello');
console.log('Number pair:', numberPair);
console.log('String pair:', stringPair);

// Function composition
type UnaryFunction<T, U> = (arg: T) => U;

function compose<T, U, V>(
    f: UnaryFunction<U, V>,
    g: UnaryFunction<T, U>
): UnaryFunction<T, V> {
    return (x: T) => f(g(x));
}

const addOne = (x: number): number => x + 1;
const toString = (x: number): string => x.toString();
const addOneAndStringify = compose(toString, addOne);

console.log('Composed function:', addOneAndStringify(5));

// Currying
function curry<T, U, V>(fn: (a: T, b: U) => V): (a: T) => (b: U) => V {
    return (a: T) => (b: U) => fn(a, b);
}

const curriedAdd = curry((x: number, y: number) => x + y);
console.log('Curried add:', curriedAdd(5)(3));

// Method decorators
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };

    return descriptor;
}

class MathOperations {
    @log
    multiply(x: number, y: number): number {
        return x * y;
    }
}

const math = new MathOperations();
math.multiply(4, 5);

// Function overloading with union types
interface StringContainer {
    value: string;
    format: 'string';
}

interface NumberContainer {
    value: number;
    format: 'number';
}

type Container = StringContainer | NumberContainer;

function processContainer(container: StringContainer): string;
function processContainer(container: NumberContainer): number;
function processContainer(container: Container): string | number {
    switch (container.format) {
        case 'string':
            return container.value.toUpperCase();
        case 'number':
            return container.value * 2;
    }
}

console.log(processContainer({ value: 'hello', format: 'string' }));
console.log(processContainer({ value: 5, format: 'number' }));

// Async function composition
async function asyncCompose<T, U, V>(
    f: (x: U) => Promise<V> | V,
    g: (x: T) => Promise<U> | U
): Promise<(x: T) => Promise<V>> {
    return async (x: T) => f(await g(x));
}

const fetchUser = async (id: number): Promise<string> => 
    `User ${id}`;

const fetchUserPosts = async (user: string): Promise<string[]> => 
    [`${user}'s post 1`, `${user}'s post 2`];

const getUserPosts = await asyncCompose(fetchUserPosts, fetchUser);

console.log('User posts:', await getUserPosts(1));

// Parameter destructuring with types
interface Config {
    host: string;
    port: number;
    ssl?: boolean;
}

function createServer({ host, port, ssl = false }: Config): string {
    return `Server created at ${host}:${port} (SSL: ${ssl})`;
}

console.log(createServer({ host: 'localhost', port: 8080 }));

// Function type guards
interface Bird {
    type: 'bird';
    fly(): void;
}

interface Fish {
    type: 'fish';
    swim(): void;
}

type Animal = Bird | Fish;

function isBird(animal: Animal): animal is Bird {
    return animal.type === 'bird';
}

function makeAnimalMove(animal: Animal) {
    if (isBird(animal)) {
        animal.fly();  // TypeScript knows this is safe
    } else {
        animal.swim(); // TypeScript knows this is safe
    }
}
