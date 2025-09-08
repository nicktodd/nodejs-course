// Advanced function concepts and patterns

// Callback pattern
console.log('Callback Pattern:');

function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'Example' };
        callback(data);
    }, 1000);
}

fetchData(data => console.log('Data received:', data));

// Function currying
// Transforming a function with multiple arguments into a sequence of functions each taking a single argument
// No, curry is not a JavaScript keyword. It's a user-defined function name commonly used to describe a function that implements currying.
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}
console.log('\nCurrying:');
// Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. 
// Instead of calling fn(a, b, c), you call fn(a)(b)(c).
const multiply = (a, b) => a * b;
const curriedMultiply = curry(multiply);

const double = curriedMultiply(2); // Fixes 'a' as 2
console.log(double(5)); // Outputs 10

// Memoization pattern
console.log('\nMemoization:');
// Memoization is an optimization technique used to speed up function calls by caching the results of expensive computations.
// When the function is called with the same arguments again, the cached result is returned instead of recomputing it.
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Fetching from cache');
            return cache.get(key);
        }
        console.log('Calculating result');
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveOperation = memoize((n) => {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
});

console.log(expensiveOperation(5));  // Calculates
console.log(expensiveOperation(5));  // Uses cache

// Generator functions
console.log('\nGenerator Functions:');

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

// Infinite sequence generator
function* fibonacci() {
    let prev = 0, curr = 1;
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci();
console.log('\nFibonacci Sequence:');
for (let i = 0; i < 5; i++) {
    console.log(fib.next().value);
}

// Function decorator pattern
console.log('\nDecorator Pattern:');

function logExecutionTime(fn) {
    return function(...args) {
        const start = Date.now();
        const result = fn.apply(this, args);
        const end = Date.now();
        console.log(`Execution time: ${end - start}ms`);
        return result;
    };
}

const slowFunction = logExecutionTime(function(n) {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
});

console.log(slowFunction(1000000));

// Function composition with reduce
console.log('\nFunction Composition with Reduce:');

const compose2 = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const addTwo = x => x + 2;
const multiplyByThree = x => x * 3;
const subtractOne = x => x - 1;

const composedFunction = compose2(subtractOne, multiplyByThree, addTwo);
const pipedFunction = pipe(addTwo, multiplyByThree, subtractOne);

console.log(composedFunction(5));  // ((5 + 2) * 3) - 1
console.log(pipedFunction(5));     // ((5 + 2) * 3) - 1
