// String creation and manipulation demonstration

// Creating strings
console.log('Creating Strings:');
const single = 'Hello with single quotes';
const double = "Hello with double quotes";
const template = `Hello with template literals`;

console.log(single);
console.log(double);
console.log(template);

// String concatenation
console.log('\nString Concatenation:');
const firstName = 'John';
const lastName = 'Doe';

// Using + operator
console.log('Using + operator:', firstName + ' ' + lastName);

// Using template literals
console.log('Using template literals:', `${firstName} ${lastName}`);

// String methods - Length and access
console.log('\nString Length and Access:');
const text = 'Hello, World!';
console.log('Length:', text.length);
console.log('First character:', text[0]);
console.log('Last character:', text[text.length - 1]);
console.log('Character at position 7:', text.charAt(7));

// String methods - Case conversion
console.log('\nCase Conversion:');
console.log('Uppercase:', text.toUpperCase());
console.log('Lowercase:', text.toLowerCase());
console.log('Original remains unchanged:', text);

// String methods - Finding substrings
console.log('\nFinding Substrings:');
const sentence = 'The quick brown fox jumps over the lazy dog';
console.log('Index of "fox":', sentence.indexOf('fox'));
console.log('Last index of "the":', sentence.lastIndexOf('the'));
console.log('Includes "jump":', sentence.includes('jump'));
console.log('Starts with "The":', sentence.startsWith('The'));
console.log('Ends with "dog":', sentence.endsWith('dog'));

// String methods - Extracting substrings
console.log('\nExtracting Substrings:');
console.log('Substring (0,5):', sentence.substring(0, 5));
console.log('Slice (4,9):', sentence.slice(4, 9));
console.log('Slice (-8):', sentence.slice(-8)); // Last 8 characters

// String methods - Splitting and joining
console.log('\nSplitting and Joining:');
const words = sentence.split(' ');
console.log('Split into words:', words);
console.log('Joined back:', words.join(' '));

// String methods - Trimming
console.log('\nTrimming:');
const paddedText = '   Hello, World!   ';
console.log('Original:', `"${paddedText}"`);
console.log('Trimmed:', `"${paddedText.trim()}"`);
console.log('Trim start:', `"${paddedText.trimStart()}"`);
console.log('Trim end:', `"${paddedText.trimEnd()}"`);

// String methods - Replacing
console.log('\nReplacing:');
const originalText = 'Hello, World!';
console.log('Replace World:', originalText.replace('World', 'JavaScript'));
console.log('Replace all os:', 'hello hello hello'.replaceAll('o', '0'));

// Template literals - Multi-line strings
console.log('\nTemplate Literals - Multi-line:');
const multiLine = `
First line
Second line
Third line
`;
console.log(multiLine);

// Template literals - Expression interpolation
console.log('\nTemplate Literals - Expression Interpolation:');
const price = 19.99;
const quantity = 3;
console.log(`Total cost: $${price * quantity}`);

// String methods - Padding
console.log('\nPadding:');
const num = '42';
console.log('Pad start:', num.padStart(5, '0'));
console.log('Pad end:', num.padEnd(5, '*'));

// String methods - Character codes
console.log('\nCharacter Codes:');
const char = 'A';
console.log('Character code for A:', char.charCodeAt(0));
console.log('From character code 65:', String.fromCharCode(65));
