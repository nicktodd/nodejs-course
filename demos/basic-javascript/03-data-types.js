// JavaScript data types demonstration

// Number
const integer = 42;
const float = 3.14;
const scientific = 2.998e8;
console.log('\nNumbers:');
console.log('Integer:', integer);
console.log('Float:', float);
console.log('Scientific notation:', scientific);

// String
const singleQuotes = 'Hello';
const doubleQuotes = "World";
const templateLiteral = `${singleQuotes} ${doubleQuotes}!`;
console.log('\nStrings:');
console.log('Template literal:', templateLiteral);

// Boolean
const isTrue = true;
const isFalse = false;
console.log('\nBooleans:');
console.log('True:', isTrue);
console.log('False:', isFalse);

// Object
const person = {
    name: 'John',
    age: 30,
    isStudent: false
};
console.log('\nObject:', person);

// Array (special type of object)
const fruits = ['apple', 'banana', 'orange'];
console.log('\nArray:', fruits);

// Undefined
let notDefined;
console.log('\nUndefined:', notDefined);

// Null
const nullValue = null;
console.log('Null:', nullValue);

// Symbol (ES6+)
const symbol = Symbol('description');
console.log('\nSymbol:', symbol.toString());

// Type checking
console.log('\nType checking:');
console.log('typeof number:', typeof integer);
console.log('typeof string:', typeof singleQuotes);
console.log('typeof object:', typeof person);
console.log('typeof array:', typeof fruits);
console.log('typeof undefined:', typeof notDefined);
console.log('typeof null:', typeof nullValue);  // Note: this returns 'object' (a known JavaScript quirk)
console.log('typeof symbol:', typeof symbol);
