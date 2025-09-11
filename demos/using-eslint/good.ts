// This file contains code that should pass common ESLint rules
// for demonstration purposes.

// 1. Used variable
const usedVar = 42;
console.log('Used variable:', usedVar);

// 2. Semicolon present
function withSemicolon(): void {
  console.log('Semicolon is present');
}
withSemicolon();

// 3. No console statement (if flagged, use a function instead)
function logMessage(message: string): void {
  // Replace with proper logger in real projects
  void message;
}
logMessage('This should not be flagged');

// 4. Use of let/const
const modernStyle = 'const keyword';
console.log(modernStyle);

// 5. Function with return type
function add(a: number, b: number): number {
  return a + b;
}
console.log('Add:', add(2, 3));

// 6. All function arguments used
function greet(name: string): void {
  console.log('Hello, ' + name);
}
greet('World');

// 7. Proper indentation
const goodIndent = true;
console.log('Indentation is good:', goodIndent);

// 8. Single quotes (if enforced)
const singleQuotes = 'Should use single quotes';
console.log(singleQuotes);

// 9. No trailing spaces
const noTrailingSpaces = 'no trailing';
console.log(noTrailingSpaces);

// 10. No explicit any
function takesString(arg: string): string {
  return arg;
}
console.log('Takes string:', takesString('test'));
