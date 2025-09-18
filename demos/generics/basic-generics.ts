// Basic Generics Demonstration

console.log("=== Basic Generics Demo ===\n");

// 1. Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const numberResult = identity<number>(42);
const stringResult = identity<string>("Hello");
const booleanResult = identity(true); // Type inference

console.log("Generic Identity Function:");
console.log(`Number: ${numberResult}`);
console.log(`String: ${stringResult}`);
console.log(`Boolean: ${booleanResult}\n`);

// 2. Generic Array Function
function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

const numbers = [1, 2, 3, 4, 5];
const names = ["Alice", "Bob", "Charlie"];
const firstNumber = getFirstElement(numbers);
const firstName = getFirstElement(names);

console.log("Generic Array Function:");
console.log(`First number: ${firstNumber}`);
console.log(`First name: ${firstName}\n`);

// 3. Generic Classes
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberContainer = new Container<number>(100);
const stringContainer = new Container<string>("TypeScript");

console.log("Generic Container Class:");
console.log(`Number container: ${numberContainer.getValue()}`);
console.log(`String container: ${stringContainer.getValue()}\n`);

// 4. Generic Interfaces
interface Pair<T, U> {
  first: T;
  second: U;
}

const numberStringPair: Pair<number, string> = {
  first: 1,
  second: "one"
};

const booleanArrayPair: Pair<boolean, number[]> = {
  first: true,
  second: [1, 2, 3]
};

console.log("Generic Interface:");
console.log(`Number-String pair: ${numberStringPair.first} -> ${numberStringPair.second}`);
console.log(`Boolean-Array pair: ${booleanArrayPair.first} -> [${booleanArrayPair.second.join(", ")}]\n`);

// 5. Multiple Type Parameters
function swap<T, U>(pair: Pair<T, U>): Pair<U, T> {
  return {
    first: pair.second,
    second: pair.first
  };
}

const swapped = swap(numberStringPair);
console.log("Swapped Pair:");
console.log(`Original: ${numberStringPair.first} -> ${numberStringPair.second}`);
console.log(`Swapped: ${swapped.first} -> ${swapped.second}\n`);

// 6. Generic Array Methods
class GenericArray<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  length(): number {
    return this.items.length;
  }
}

const stringArray = new GenericArray<string>();
stringArray.add("apple");
stringArray.add("banana");
stringArray.add("cherry");

console.log("Generic Array Class:");
console.log(`All fruits: ${stringArray.getAll().join(", ")}`);
console.log(`Found fruit starting with 'b': ${stringArray.find(fruit => fruit.startsWith('b'))}`);
console.log(`Array length: ${stringArray.length()}\n`);