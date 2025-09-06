# JavaScript Functions Lab

## Objectives
- Practice creating and using different types of functions
- Implement function parameters and return values
- Work with function scope and closures
- Create higher-order functions
- Use functions as first-class citizens

## Exercise 1: Calculator Library
Create a flexible calculator library using various function types and patterns.

### Requirements:
1. Implement basic operations using different function types:
   - Function declaration for addition
   - Function expression for subtraction
   - Arrow function for multiplication
   - Method shorthand for division
2. Implement advanced operations:
   - Power function using recursion
   - Factorial using recursion
   - Average using rest parameters
3. Create a function factory for custom operations
4. Implement error handling and input validation
5. Add memory functions (store, recall, clear)

### Expected Output:
```
Calculator Operations
-------------------
Basic Operations:
5 + 3 = 8
10 - 4 = 6
6 * 7 = 42
15 / 3 = 5

Advanced Operations:
2^3 = 8
5! = 120
Average(1,2,3,4,5) = 3

Custom Operations:
Double(5) = 10
Triple(5) = 15

Memory Operations:
Stored: 42
Recalled: 42
Memory Cleared
```

## Exercise 2: Event System
Create a simple event system using functions as first-class citizens.

### Requirements:
1. Create an EventEmitter class with methods:
   - on(eventName, callback)
   - off(eventName, callback)
   - emit(eventName, data)
2. Support multiple listeners per event
3. Allow listener removal
4. Implement once() for one-time listeners
5. Add error handling for invalid inputs

### Expected Output:
```
Event System Demo
---------------
Adding listeners...
Event 'userLogin' emitted: { user: 'John' }
Listener 1 received: { user: 'John' }
Listener 2 received: { user: 'John' }

Removing listener 1...
Event 'userLogin' emitted: { user: 'Jane' }
Listener 2 received: { user: 'Jane' }

One-time event emitted: { message: 'Hello' }
One-time event emitted again (should not trigger)
```

## Exercise 3: Function Composition Framework
Create a framework for composing functions and creating processing pipelines.

### Requirements:
1. Implement compose() and pipe() functions
2. Create a collection of basic transformers:
   - map(fn)
   - filter(predicate)
   - reduce(fn, initial)
3. Add error handling and debugging
4. Support async functions
5. Implement a way to inspect the pipeline

### Expected Output:
```
Function Composition Demo
-----------------------
Original data: [1, 2, 3, 4, 5]

Pipeline 1: Double and filter even
Input: [1, 2, 3, 4, 5]
After double: [2, 4, 6, 8, 10]
After filter: [2, 4, 6, 8, 10]

Pipeline 2: Sum of doubled odd numbers
Input: [1, 2, 3, 4, 5]
After filter odd: [1, 3, 5]
After double: [2, 6, 10]
Sum: 18
```

## Bonus Challenge
Add support for:
- Async operations in the calculator
- Priority levels in the event system
- Parallel execution in the composition framework

## Tips
- Use different function types appropriately
- Consider edge cases and error conditions
- Use meaningful names for functions and parameters
- Document your code with comments
- Write clean, maintainable code

## Getting Started
1. Create calculator.js for Exercise 1
2. Create eventSystem.js for Exercise 2
3. Create functionComposition.js for Exercise 3
4. Run your code using Node.js: `node filename.js`
