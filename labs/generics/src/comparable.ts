// Exercise 3: Generic Constraints
// Create constrained generics and the Comparable interface

console.log("Exercise 3: Generic Constraints");

// TODO: Create the Comparable<T> interface
// TODO: Create the generic sort<T> function with constraints
// TODO: Create the Score class that implements Comparable<Score>

// Uncomment and implement the code below:

/*
// Comparable interface
interface Comparable<T> {
  compareTo(other: T): number;
}

// Generic sort function with constraint
function sort<T extends Comparable<T>>(array: T[]): T[] {
  // TODO: Use the compareTo method to sort the array
  // Hint: Use array.slice().sort() to create a new sorted array
}

// Score class implementing Comparable
class Score implements Comparable<Score> {
  constructor(public value: number, public playerName: string) {}

  compareTo(other: Score): number {
    // TODO: Compare by score value (higher scores should come first)
    // Return negative number if this < other
    // Return positive number if this > other  
    // Return 0 if this == other
  }

  toString(): string {
    return `${this.playerName}: ${this.value}`;
  }
}

// Test your implementation
const scores = [
  new Score(100, "Alice"),
  new Score(250, "Bob"), 
  new Score(175, "Charlie"),
  new Score(300, "Diana")
];

console.log("Original scores:", scores.map(s => s.toString()));
console.log("Sorted scores:", sort(scores).map(s => s.toString()));

// Test with strings (they already implement comparable-like functionality)
const words = ["banana", "apple", "cherry"];
// Note: strings don't implement our Comparable interface, but you can create a wrapper
*/