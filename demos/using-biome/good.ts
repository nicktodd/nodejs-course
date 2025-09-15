// This file contains code that should pass common Biome rules
// for demonstration purposes.

const usedVar = 42;
console.log('Used variable:', usedVar);

function withSemicolon(): void {
  console.log('Semicolon is present');
}
withSemicolon();

function logMessage(message: string): void {
  void message;
}
logMessage('This should not be flagged');

const modernStyle = 'const keyword';
console.log(modernStyle);

function add(a: number, b: number): number {
  return a + b;
}
console.log('Add:', add(2, 3));

function greet(name: string): void {
  console.log(`Hello, ${name}`);
}
greet('World');

const goodIndent = true;
console.log('Indentation is good:', goodIndent);
