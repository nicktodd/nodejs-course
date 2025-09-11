// This file intentionally contains code that will fail common ESLint rules
// for demonstration purposes.

// 1. Unused variable
const unusedVar = 42;

// 2. No semicolon
function noSemicolon() {
  console.log('Missing semicolon')
}

// 3. Console statement (often flagged)
console.log('This should be flagged by no-console rule');

// 4. Use of var instead of let/const
var oldStyle = 'var keyword';

// 5. Function with no return type (if using TypeScript strict rules)
function add(a, b) {
  return a + b;
}

// 6. Unused function argument
function greet(name, unusedArg) {
  console.log('Hello, ' + name);
}

// 7. Extra spaces (indentation issue)
    const badIndent = true;

// 8. Double quotes instead of single quotes (if single quotes enforced)
const doubleQuotes = "Should use single quotes";

// 9. Trailing spaces    
const trailingSpaces = 'trailing';    

// 10. No explicit any
function takesAny(arg: any) {
  return arg;
}
