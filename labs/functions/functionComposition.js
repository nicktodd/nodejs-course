// Function Composition Framework

// Basic composition functions
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Pipeline inspection decorator
const inspect = (tag) => (fn) => (data) => {
    console.log(`[${tag}] Input:`, data);
    const result = fn(data);
    console.log(`[${tag}] Output:`, result);
    return result;
};

// Basic transformers
const map = (fn) => (arr) => arr.map(fn);
const filter = (predicate) => (arr) => arr.filter(predicate);
const reduce = (fn, initial) => (arr) => arr.reduce(fn, initial);

// Async versions
const asyncCompose = (...fns) => x => 
    fns.reduceRight(async (acc, fn) => fn(await acc), x);

const asyncPipe = (...fns) => x => 
    fns.reduce(async (acc, fn) => fn(await acc), x);

// Error handling wrapper
const safely = (fn) => (...args) => {
    try {
        return fn(...args);
    } catch (error) {
        console.error(`Error in function ${fn.name}:`, error);
        throw error;
    }
};

// Debug mode
let debugMode = false;

const setDebugMode = (enabled) => {
    debugMode = enabled;
};

const debug = (fn) => (...args) => {
    if (debugMode) {
        console.log(`Calling function ${fn.name || 'anonymous'} with args:`, args);
    }
    const result = fn(...args);
    if (debugMode) {
        console.log(`Function ${fn.name || 'anonymous'} returned:`, result);
    }
    return result;
};

// Parallel execution
const parallel = (fns) => async (data) => {
    const results = await Promise.all(fns.map(fn => fn(data)));
    return results;
};

// Pipeline creation and execution
class Pipeline {
    constructor() {
        this.steps = [];
    }

    add(transform) {
        // Add transformation step
    }

    execute(data) {
        // Execute pipeline
    }

    inspect() {
        // Inspect pipeline state
    }
}

// Example transformers
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (acc, curr) => acc + curr;

// Demo implementation
async function runDemo() {
    console.log('Function Composition Demo\n-----------------------');
    
    const data = [1, 2, 3, 4, 5];
    console.log('Original data:', data);

    // Pipeline 1: Double and filter even
    console.log('\nPipeline 1: Double and filter even');
    const doubleAndFilterEven = pipe(
        (data) => {
            console.log('Input:', data);
            return data;
        },
        (data) => data.map(double),
        (data) => {
            console.log('After double:', data);
            return data;
        },
        (data) => data.filter(isEven),
        (data) => {
            console.log('After filter:', data);
            return data;
        }
    );

    doubleAndFilterEven(data);    // Pipeline 2: Sum of doubled odd numbers
    console.log('\nPipeline 2: Sum of doubled odd numbers');
    const sumDoubledOddNumbers = pipe(
        (data) => {
            console.log('Input:', data);
            return data;
        },
        (data) => data.filter(x => !isEven(x)),
        (data) => {
            console.log('After filter odd:', data);
            return data;
        },
        (data) => data.map(double),
        (data) => {
            console.log('After double:', data);
            return data;
        },
        (data) => data.reduce(sum, 0),
        (result) => {
            console.log('Sum:', result);
            return result;
        }
    );

    sumDoubledOddNumbers(data);    // Async pipeline example
    console.log('\nAsync Pipeline Example');
    const asyncDouble = async x => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
        return x * 2;
    };

    const asyncPipeline = asyncPipe(
        (data) => {
            console.log('Start:', data);
            return data;
        },
        async (data) => {
            const results = await Promise.all(data.map(x => asyncDouble(x)));
            return results;
        },
        (data) => {
            console.log('After parallel async double:', data);
            return data;
        },
        (data) => data.filter(isEven),
        (data) => {
            console.log('Final result:', data);
            return data;
        }
    );

    await asyncPipeline(data);

    // Debug mode example
    console.log('\nDebug Mode Example');
    setDebugMode(true);
    const debugPipeline = pipe(
        debug(map(double)),
        debug(filter(isEven))
    );
    debugPipeline([1, 2, 3]);
    setDebugMode(false);
}

// Run the demo if this module is executed directly
if (require.main === module) {
    runDemo().catch(console.error);
}

// Export functions for use in other modules
module.exports = {
    compose,
    pipe,
    map,
    filter,
    reduce,
    inspect,
    asyncCompose,
    asyncPipe,
    parallel,
    safely,
    debug,
    setDebugMode
};
