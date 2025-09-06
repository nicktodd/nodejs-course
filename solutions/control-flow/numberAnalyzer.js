// Number Analyzer Solution

function analyzeNumber(number) {
    // Input validation
    if (typeof number !== 'number' || isNaN(number)) {
        console.log('Please provide a valid number');
        return;
    }

    // Check if positive, negative, or zero
    let type;
    if (number > 0) {
        type = 'Positive';
    } else if (number < 0) {
        type = 'Negative';
    } else {
        type = 'Zero';
    }
    console.log('Type:', type);

    // Check if even or odd
    const evenOdd = Math.abs(number) % 2 === 0 ? 'Even' : 'Odd';
    console.log('Even/Odd:', evenOdd);

    // Check if prime (only for positive integers)
    if (number > 0 && Number.isInteger(number)) {
        console.log('Prime:', isPrime(number) ? 'Yes' : 'No');
    } else {
        console.log('Prime: N/A');
    }
}

function isPrime(number) {
    // 1 is not prime
    if (number === 1) return false;
    
    // Check for divisibility up to square root of number
    const sqrt = Math.sqrt(number);
    for (let i = 2; i <= sqrt; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

// Test cases
console.log('\nNumber Analysis: 7');
console.log('-------------------');
analyzeNumber(7);

console.log('\nNumber Analysis: -4');
console.log('-------------------');
analyzeNumber(-4);

console.log('\nNumber Analysis: 0');
console.log('-------------------');
analyzeNumber(0);

console.log('\nNumber Analysis: 13');
console.log('-------------------');
analyzeNumber(13);

console.log('\nNumber Analysis: "invalid"');
console.log('-------------------');
analyzeNumber('invalid');
