# Arrays and Strings Lab

## Objectives
- Practice working with arrays and array methods
- Implement string manipulation techniques
- Use array and string methods together to solve problems
- Handle edge cases and input validation

## Exercise 1: Contact List Manager
Create a program that manages a list of contacts using arrays and strings.

### Requirements:
1. Create functions to:
   - Add a new contact (name, email, phone)
   - Remove a contact by email
   - Search contacts by name
   - Format contact display
   - Sort contacts by name
2. Validate inputs (proper email format, phone number format)
3. Prevent duplicate emails
4. Case-insensitive search
5. Pretty print the contact list

### Expected Output:
```
Contact List Manager
-------------------
Added: John Doe (john@email.com, 123-456-7890)
Added: Jane Smith (jane@email.com, 098-765-4321)

Contacts (sorted by name):
1. Jane Smith
   Email: jane@email.com
   Phone: 098-765-4321

2. John Doe
   Email: john@email.com
   Phone: 123-456-7890

Search results for "jo":
- John Doe (john@email.com)

Removed contact: john@email.com
```

## Exercise 2: Text Analyzer
Create a program that analyzes text and provides various statistics.

### Requirements:
1. Count total characters, words, and sentences
2. Find the most common word
3. Find the longest word
4. Calculate average word length
5. Create a word frequency map
6. Identify palindromes
7. Handle punctuation properly

### Expected Output:
```
Text Analysis Results
--------------------
Text: "The quick brown fox jumps over the lazy dog. The dog sleeps."

Statistics:
- Characters: 54
- Words: 11
- Sentences: 2
- Most common word: "the" (2 times)
- Longest word: "quick" (5 letters)
- Average word length: 3.45
- Palindromes found: 0

Word Frequency:
- the: 2
- quick: 1
- brown: 1
...
```

## Exercise 3: String Transformer
Create a program that performs various string transformations.

### Requirements:
1. Convert between camelCase, snake_case, and kebab-case
2. Create custom string templates
3. Generate acronyms from phrases
4. Reverse words but maintain punctuation
5. Encode/decode text (simple substitution cipher)

### Expected Output:
```
String Transformations
---------------------
Original: "hello world example"

Transformations:
- Camel Case: "helloWorldExample"
- Snake Case: "hello_world_example"
- Kebab Case: "hello-world-example"
- Acronym: "HWE"
- Reversed Words: "olleh dlrow elpmaxe"
- Encoded: "ifmmp xpsme fybnqmf"
```

## Bonus Challenge
Add error handling and input validation to all exercises. Create a menu system to allow users to choose which operation to perform.

## Tips
- Break down complex operations into smaller functions
- Test with various inputs including edge cases
- Use modern JavaScript array and string methods
- Comment your code to explain complex logic
- Consider performance for large inputs

## Getting Started
1. Create contactManager.js for Exercise 1
2. Create textAnalyzer.js for Exercise 2
3. Create stringTransformer.js for Exercise 3
4. Run your code using Node.js: `node filename.js`
