// This file intentionally contains code that will fail common Biome rules
// for demonstration purposes.

const unusedVar = 42;

function noSemicolon() {
  console.log('Missing semicolon')
}

console.log('This should be flagged by no-console rule');

var oldStyle = 'var keyword';

function add(a, b) {
  return a + b;
}

function greet(name, unusedArg) {
  console.log('Hello, ' + name);
}

    const badIndent = true;

const doubleQuotes = "Should use single quotes";

const trailingSpaces = 'trailing';    

function takesAny(arg: any) {
  return arg;
}
