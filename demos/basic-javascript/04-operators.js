// JavaScript operators demonstration

// Arithmetic Operators
console.log('\nArithmetic Operators:');
console.log('Addition:', 5 + 3);
console.log('Subtraction:', 5 - 3);
console.log('Multiplication:', 5 * 3);
console.log('Division:', 5 / 3);
console.log('Modulus:', 5 % 3);
console.log('Exponentiation:', 5 ** 3);
console.log('Increment:', (() => { let x = 5; return ++x; })());
console.log('Decrement:', (() => { let x = 5; return --x; })());

// Assignment Operators
console.log('\nAssignment Operators:');
let x = 5;
console.log('Simple assignment:', x);
x += 3;
console.log('Add and assign:', x);
x -= 2;
console.log('Subtract and assign:', x);
x *= 2;
console.log('Multiply and assign:', x);
x /= 2;
console.log('Divide and assign:', x);

// Comparison Operators
console.log('\nComparison Operators:');
console.log('Equal value:', 5 == '5');
console.log('Equal value and type:', 5 === '5');
console.log('Not equal value:', 5 != '6');
console.log('Not equal value or type:', 5 !== '5');
console.log('Greater than:', 5 > 3);
console.log('Less than:', 5 < 8);
console.log('Greater than or equal:', 5 >= 5);
console.log('Less than or equal:', 5 <= 6);

// Logical Operators
console.log('\nLogical Operators:');
console.log('AND:', true && true);
console.log('OR:', true || false);
console.log('NOT:', !true);

// String Operators
console.log('\nString Operators:');
console.log('Concatenation:', 'Hello' + ' ' + 'World');
console.log('Template literals:', `${'Hello'} ${'World'}`);

// Type Operators
console.log('\nType Operators:');
console.log('typeof:', typeof 42);
console.log('instanceof:', [] instanceof Array);

// Bitwise Operators
console.log('\nBitwise Operators:');
console.log('AND:', 5 & 3);
console.log('OR:', 5 | 3);
console.log('XOR:', 5 ^ 3);
console.log('NOT:', ~5);
console.log('Left shift:', 5 << 1);
console.log('Right shift:', 5 >> 1);

// Conditional (Ternary) Operator
console.log('\nTernary Operator:');
const age = 20;
console.log(age >= 18 ? 'Adult' : 'Minor');
