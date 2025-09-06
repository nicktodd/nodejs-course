// Demonstration of breaking and continuing loops

// Break in a for loop
console.log('Break in for loop:');
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        console.log('Breaking at 5');
        break;
    }
    console.log(i);
}

// Continue in a for loop
console.log('\nContinue in for loop:');
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        console.log('Skipping 2');
        continue;
    }
    console.log(i);
}

// Break in a while loop
console.log('\nBreak in while loop:');
let count = 0;
while (true) {
    console.log(count);
    count++;
    
    if (count >= 5) {
        console.log('Breaking infinite loop');
        break;
    }
}

// Continue in a while loop
console.log('\nContinue in while loop:');
let num = 0;
while (num < 5) {
    num++;
    
    if (num === 3) {
        console.log('Skipping 3');
        continue;
    }
    console.log(num);
}

// Breaking from nested loops using labels
console.log('\nBreaking from nested loops:');
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log('Breaking both loops');
            break outerLoop;
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

// Example: Finding first matching pair
console.log('\nFinding first matching pair:');
const numbers = [1, 2, 3, 4, 5];
const targets = [10, 8, 6, 4, 2];

findMatch: {
    for (const num1 of numbers) {
        for (const num2 of targets) {
            if (num1 === num2) {
                console.log(`Found matching number: ${num1}`);
                break findMatch;
            }
        }
    }
}

// Using break with switch inside a loop
console.log('\nBreak with switch in loop:');
for (let i = 0; i < 3; i++) {
    switch (i) {
        case 0:
            console.log('Starting');
            break;
        case 1:
            console.log('Middle');
            continue; // Continues the for loop
        case 2:
            console.log('Ending');
            break;
    }
    console.log(`After switch ${i}`);
}
