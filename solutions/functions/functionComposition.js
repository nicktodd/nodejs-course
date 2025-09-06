// Function Composition Framework Solution

// Basic composition functions
function compose(...fns) {
    return fns.reduceRight((f, g) => async (...args) => f(await g(...args)));
}

function pipe(...fns) {
    return fns.reduce((f, g) => async (...args) => g(await f(...args)));
}

// Basic transformers
function map(fn) {
    return async (data) => {
        if (!Array.isArray(data)) {
            throw new Error('Map requires an array input');
        }
        return Promise.all(data.map(fn));
    };
}

function filter(predicate) {
    return async (data) => {
        if (!Array.isArray(data)) {
            throw new Error('Filter requires an array input');
        }
        const results = await Promise.all(data.map(async item => ({
            item,
            keep: await predicate(item)
        })));
        return results.filter(r => r.keep).map(r => r.item);
    };
}

function reduce(fn, initial) {
    return async (data) => {
        if (!Array.isArray(data)) {
            throw new Error('Reduce requires an array input');
        }
        return data.reduce(async (acc, curr) => {
            const resolvedAcc = await acc;
            return fn(resolvedAcc, curr);
        }, Promise.resolve(initial));
    };
}

// Pipeline creation and execution
class Pipeline {
    constructor() {
        this.steps = [];
        this.debug = false;
    }

    add(transform, name = '') {
        this.steps.push({
            transform,
            name: name || `Step ${this.steps.length + 1}`
        });
        return this;
    }

    enableDebug() {
        this.debug = true;
        return this;
    }

    async execute(data) {
        let current = data;
        
        if (this.debug) {
            console.log('Initial data:', current);
        }

        for (const step of this.steps) {
            try {
                current = await step.transform(current);
                if (this.debug) {
                    console.log(`After ${step.name}:`, current);
                }
            } catch (error) {
                throw new Error(`Error in ${step.name}: ${error.message}`);
            }
        }

        return current;
    }

    inspect() {
        return this.steps.map(step => step.name);
    }
}

// Test the composition framework
console.log('Function Composition Demo');
console.log('-----------------------');

async function runDemo() {
    const data = [1, 2, 3, 4, 5];
    console.log('Original data:', data);

    // Pipeline 1: Double and filter even
    console.log('\nPipeline 1: Double and filter even');
    const pipeline1 = new Pipeline()
        .enableDebug()
        .add(map(x => x * 2), 'double')
        .add(filter(x => x % 2 === 0), 'filter even');

    console.log('Pipeline steps:', pipeline1.inspect());
    await pipeline1.execute(data);

    // Pipeline 2: Sum of doubled odd numbers
    console.log('\nPipeline 2: Sum of doubled odd numbers');
    const pipeline2 = new Pipeline()
        .enableDebug()
        .add(filter(x => x % 2 === 1), 'filter odd')
        .add(map(x => x * 2), 'double')
        .add(reduce((acc, curr) => acc + curr, 0), 'sum');

    console.log('Pipeline steps:', pipeline2.inspect());
    const result = await pipeline2.execute(data);
    console.log('Final result:', result);

    // Test error handling
    console.log('\nTesting error handling:');
    try {
        await pipeline1.execute('not an array');
    } catch (error) {
        console.log('Caught error:', error.message);
    }
}

// Run the demo
runDemo().catch(console.error);
