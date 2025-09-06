// Demonstration of loops in JavaScript

// For loop
console.log('\nBasic for loop:');
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// For loop with array
console.log('\nFor loop with array:');
const fruits = ['apple', 'banana', 'orange', 'grape'];
for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit ${i + 1}: ${fruits[i]}`);
}

// For...of loop (ES6+)
console.log('\nFor...of loop:');
for (const fruit of fruits) {
    console.log(`Fruit: ${fruit}`);
}

// For...in loop (for object properties)
console.log('\nFor...in loop:');
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};
for (const property in person) {
    console.log(`${property}: ${person[property]}`);
}

// While loop
console.log('\nWhile loop:');
let count = 0;
while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}

// Do...while loop (executes at least once)
console.log('\nDo...while loop:');
let num = 1;
do {
    console.log(`Number: ${num}`);
    num *= 2;
} while (num < 10);

// Nested loops
console.log('\nNested loops:');
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`i: ${i}, j: ${j}`);
    }
}

// Array methods as alternatives to loops
console.log('\nArray methods:');
const numbers = [1, 2, 3, 4, 5];

console.log('forEach:');
numbers.forEach(num => console.log(num));

console.log('\nmap:');
const doubled = numbers.map(num => num * 2);
console.log('Doubled numbers:', doubled);

console.log('\nfilter:');
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Infinite loop with break
console.log('\nLoop with break:');
let i = 0;
while (true) {
    console.log(i);
    i++;
    if (i > 3) break;
}
