// --- Additional Interface Techniques ---

// 1. Adding members to an existing interface (declaration merging)
interface Config {
  url: string;
}
// add an optional property
interface Config {
  timeout?: number;
}
const config: Config = { url: "http://example.com", timeout: 5000 };

// 2. Extending an interface
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
const myDog: Dog = { name: "Rex", breed: "Labrador" };

// 3. Function signature in an interface
interface Comparator {
  (a: number, b: number): number;
}
const compare: Comparator = (a, b) => a - b;
console.log(compare(5, 3));

// 4. Array type in an interface
interface StringArray {
  [index: number]: string;
}
const arr: StringArray = ["a", "b", "c"];

// 5. Key-value dictionary
interface Dictionary {
  [key: string]: number;
}
const dict: Dictionary = { apples: 5, oranges: 10 };
