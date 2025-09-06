// Function declarations and expressions demonstration

// Function Declaration
console.log('Function Declarations:');

function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet('Alice'));

// Function hoisting demonstration
console.log(subtract(5, 3)); // Works before declaration due to hoisting
function subtract(a, b) {
    return a - b;
}

// Function Expression
console.log('\nFunction Expressions:');

const add = function(a, b) {
    return a + b;
};
console.log(add(2, 3));

// Arrow Functions
console.log('\nArrow Functions:');

const multiply = (a, b) => a * b;
console.log(multiply(4, 2));

// Arrow function with block body
const divide = (a, b) => {
    if (b === 0) return 'Cannot divide by zero';
    return a / b;
};
console.log(divide(6, 2));
console.log(divide(6, 0));

// Immediately Invoked Function Expression (IIFE)
console.log('\nIIFE:');

(function() {
    const message = 'I am an IIFE';
    console.log(message);
})();

// Function with default parameters
console.log('\nDefault Parameters:');

function createUser(name = 'Anonymous', age = 0) {
    return { name, age };
}
console.log(createUser());
console.log(createUser('Bob', 25));

// Rest parameters
console.log('\nRest Parameters:');

function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));

// Functions as parameters (Higher-order functions)
console.log('\nHigher-order Functions:');

function operate(a, b, operation) {
    return operation(a, b);
}

console.log(operate(5, 3, add));
console.log(operate(5, 3, subtract));
console.log(operate(5, 3, (x, y) => x * y));

// Function returning function (Closure)
console.log('\nClosures:');

function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Method shorthand
console.log('\nMethod Shorthand:');

const calculator = {
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; }
};

console.log(calculator.add(5, 3));
console.log(calculator.subtract(5, 3));

// Function binding
console.log('\nFunction Binding:');

const person = {
    name: 'John',
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

const greetFunction = person.greet;
const boundGreet = person.greet.bind(person);

console.log(boundGreet());

// Function composition
console.log('\nFunction Composition:');

const addOne = x => x + 1;
const double = x => x * 2;
const compose = (f, g) => x => f(g(x));

const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(3));  // (3 + 1) * 2 = 8
