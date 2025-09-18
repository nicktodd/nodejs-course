// Solution: Generic Constraints  
// Using constraints to create type-safe comparable and sortable types

console.log("=== Solution: Generic Constraints ===");

// Comparable interface for objects that can be compared
interface Comparable<T> {
  compareTo(other: T): number;
}

// Generic sort function that requires comparable items
function sort<T extends Comparable<T>>(array: T[]): T[] {
  return array.slice().sort((a, b) => a.compareTo(b));
}

// Advanced sort function with custom comparator
function sortBy<T, K extends Comparable<K>>(array: T[], keyFn: (item: T) => K): T[] {
  return array.slice().sort((a, b) => keyFn(a).compareTo(keyFn(b)));
}

// Generic sort with custom compare function
function sortWith<T>(array: T[], compareFn: (a: T, b: T) => number): T[] {
  return array.slice().sort(compareFn);
}

// Score class implementing Comparable
class Score implements Comparable<Score> {
  constructor(public value: number, public playerName: string) {}

  compareTo(other: Score): number {
    // Higher scores come first (descending order)
    return other.value - this.value;
  }

  toString(): string {
    return `${this.playerName}: ${this.value}`;
  }
}

// ComparableString wrapper for string comparison
class ComparableString implements Comparable<ComparableString> {
  constructor(private value: string) {}

  compareTo(other: ComparableString): number {
    return this.value.localeCompare(other.value);
  }

  toString(): string {
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}

// Version class for version number comparison
class Version implements Comparable<Version> {
  private parts: number[];

  constructor(version: string) {
    this.parts = version.split('.').map(Number);
  }

  compareTo(other: Version): number {
    const maxLength = Math.max(this.parts.length, other.parts.length);
    
    for (let i = 0; i < maxLength; i++) {
      const thisPart = this.parts[i] || 0;
      const otherPart = other.parts[i] || 0;
      
      if (thisPart !== otherPart) {
        return thisPart - otherPart;
      }
    }
    
    return 0;
  }

  toString(): string {
    return this.parts.join('.');
  }
}

// Priority class for task priority comparison
enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4
}

class Task implements Comparable<Task> {
  constructor(
    public name: string,
    public priority: Priority,
    public dueDate: Date
  ) {}

  compareTo(other: Task): number {
    // First compare by priority (higher priority first)
    if (this.priority !== other.priority) {
      return other.priority - this.priority;
    }
    
    // Then compare by due date (earlier dates first)
    return this.dueDate.getTime() - other.dueDate.getTime();
  }

  toString(): string {
    const priorityName = Priority[this.priority];
    return `${this.name} (${priorityName}, due: ${this.dueDate.toDateString()})`;
  }
}

// Test the comparable implementations
console.log("\n--- Testing Generic Constraints ---");

// Test Score sorting
console.log("Testing Score sorting:");
const scores = [
  new Score(100, "Alice"),
  new Score(250, "Bob"),
  new Score(175, "Charlie"),
  new Score(300, "Diana"),
  new Score(50, "Eve")
];

console.log("  Original scores:", scores.map(s => s.toString()));
console.log("  Sorted scores:", sort(scores).map(s => s.toString()));

// Test String sorting
console.log("\nTesting String sorting:");
const strings = [
  new ComparableString("banana"),
  new ComparableString("apple"), 
  new ComparableString("cherry"),
  new ComparableString("date")
];

console.log("  Original strings:", strings.map(s => s.toString()));
console.log("  Sorted strings:", sort(strings).map(s => s.toString()));

// Test Version sorting
console.log("\nTesting Version sorting:");
const versions = [
  new Version("1.0.0"),
  new Version("2.1.0"),
  new Version("1.2.3"),
  new Version("2.0.0"),
  new Version("1.10.0")
];

console.log("  Original versions:", versions.map(v => v.toString()));
console.log("  Sorted versions:", sort(versions).map(v => v.toString()));

// Test Task sorting  
console.log("\nTesting Task sorting:");
const tasks = [
  new Task("Fix bug", Priority.HIGH, new Date('2024-01-15')),
  new Task("Write docs", Priority.MEDIUM, new Date('2024-01-10')),
  new Task("Refactor code", Priority.LOW, new Date('2024-01-20')),
  new Task("Security patch", Priority.CRITICAL, new Date('2024-01-12')),
  new Task("Add feature", Priority.MEDIUM, new Date('2024-01-08'))
];

console.log("  Original tasks:");
tasks.forEach(t => console.log(`    ${t.toString()}`));

console.log("  Sorted tasks (by priority then due date):");
sort(tasks).forEach(t => console.log(`    ${t.toString()}`));

// Demonstrate constraint benefits - this would cause a compile error:
// const invalidArray = [1, 2, 3];  // numbers don't implement Comparable<number>
// sort(invalidArray); // TypeScript error!

console.log("\n--- End Constraints Demo ---\n");