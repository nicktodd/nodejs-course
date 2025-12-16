// solutions/generics/src/utils.ts

// Task 2.1: swap<T>
// Swaps the order of two values of the same type and returns them as a tuple.
export function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

// Task 2.2: findFirst<T>
// Returns the first element in the array that matches the predicate function, or undefined if none match.
export function findFirst<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
  for (const item of arr) {
    if (predicate(item)) {
      return item;
    }
  }
  return undefined;
}


// Task 2.3: groupBy<T, K>
/**
 * Groups items in an array by a key returned from the key function.
 *
 * @param arr - The array of items to group
 * @param keyFn - A function that takes an item and returns its grouping key
 * @returns A Map where each key is a group and the value is an array of items in that group
 *
 * Example:
 *   groupBy([1,2,3,4], x => x % 2 === 0 ? 'even' : 'odd')
 *   // Map { 'odd' => [1, 3], 'even' => [2, 4] }
 */
export function groupBy<T, K>(arr: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>(); // Create a new Map to hold the groups
  for (const item of arr) {
    const key = keyFn(item); // Get the key for this item
    if (!map.has(key)) {
      map.set(key, []); // If the key doesn't exist, create a new array for it
    }
    map.get(key)!.push(item); // Add the item to the correct group
  }
  return map;
}

// --- Example invocations and outputs ---
// Swap example
console.log('swap(1, 2):', swap(1, 2)); // [2, 1]
console.log("swap('a', 'b'):", swap('a', 'b')); // ['b', 'a']

// findFirst example
console.log('findFirst([1, 3, 4, 6], x => x % 2 === 0):', findFirst([1, 3, 4, 6], x => x % 2 === 0)); // 4
console.log('findFirst([1, 3, 5], x => x % 2 === 0):', findFirst([1, 3, 5], x => x % 2 === 0)); // undefined

// groupBy example
const numbers = [1, 2, 3, 4, 5];
const groupedNumbers = groupBy(numbers, x => x % 2 === 0 ? 'even' : 'odd');
console.log('groupBy([1,2,3,4,5], even/odd):', Object.fromEntries(Array.from(groupedNumbers.entries())));

const objects = [
  { id: 1, type: 'a' },
  { id: 2, type: 'b' },
  { id: 3, type: 'a' }
];
const groupedObjects = groupBy(objects, x => x.type);
console.log('groupBy([{id:1,type:"a"},...], by type):', Object.fromEntries(Array.from(groupedObjects.entries())));
