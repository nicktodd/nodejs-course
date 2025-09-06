// Pattern Generator Solution

function generatePattern1(size) {
    if (!validateInput(size)) return;

    for (let i = 1; i <= size; i++) {
        console.log('*'.repeat(i));
    }
}

function generatePattern2(size) {
    if (!validateInput(size)) return;

    for (let i = 1; i <= size; i++) {
        const spaces = ' '.repeat(size - i);
        const stars = '*'.repeat(i);
        console.log(spaces + stars);
    }
}

function generatePattern3(size) {
    if (!validateInput(size)) return;

    for (let i = 0; i < size; i++) {
        const spaces = ' '.repeat(size - i - 1);
        const stars = '*'.repeat(2 * i + 1);
        console.log(spaces + stars);
    }
}

function validateInput(size) {
    if (!Number.isInteger(size) || size <= 0) {
        console.log('Please provide a positive integer for the pattern size');
        return false;
    }
    return true;
}

// Test patterns
console.log('Pattern 1 (size 4):');
generatePattern1(4);

console.log('\nPattern 2 (size 4):');
generatePattern2(4);

console.log('\nPattern 3 (size 4):');
generatePattern3(4);

// Test invalid input
console.log('\nTesting invalid input:');
generatePattern1(-1);
generatePattern1('invalid');
