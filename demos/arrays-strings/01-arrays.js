// Array creation and manipulation demonstration

// Creating arrays
console.log('Creating Arrays:');
const numbers = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, 'hello', true, { name: 'John' }, [1, 2]];
const empty = [];
const arrayConstructor = new Array(3); // Creates array with length 3

console.log('Numbers array:', numbers);
console.log('Fruits array:', fruits);
console.log('Mixed array:', mixed);
console.log('Empty array:', empty);
console.log('Array constructor:', arrayConstructor);

// Accessing elements
console.log('\nAccessing Elements:');
console.log('First fruit:', fruits[0]);
console.log('Last fruit:', fruits[fruits.length - 1]);
console.log('Out of bounds:', fruits[10]); // undefined

// Modifying arrays
console.log('\nModifying Arrays:');
fruits[1] = 'grape';
console.log('After modification:', fruits);

// Array methods - Adding and removing elements
console.log('\nArray Methods - Adding/Removing:');
fruits.push('mango');           // Add to end
console.log('After push:', fruits);

const lastFruit = fruits.pop(); // Remove from end
console.log('Popped value:', lastFruit);
console.log('After pop:', fruits);

fruits.unshift('pear');         // Add to start
console.log('After unshift:', fruits);

const firstFruit = fruits.shift(); // Remove from start
console.log('Shifted value:', firstFruit);
console.log('After shift:', fruits);

// Slicing and splicing
console.log('\nSlicing and Splicing:');
const nums = [1, 2, 3, 4, 5];
console.log('Original array:', nums);

const sliced = nums.slice(1, 3);
console.log('Sliced (1,3):', sliced);
console.log('Original after slice:', nums); // Original unchanged

nums.splice(1, 2, 6, 7);
console.log('After splice:', nums); // Original modified

// Array methods - Searching and checking
console.log('\nSearching and Checking:');
const fruits2 = ['apple', 'banana', 'orange', 'apple'];
console.log('indexOf apple:', fruits2.indexOf('apple'));
console.log('lastIndexOf apple:', fruits2.lastIndexOf('apple'));
console.log('includes banana:', fruits2.includes('banana'));

// Array methods - Transformation
console.log('\nArray Transformation:');
const numbers2 = [1, 2, 3, 4, 5];

const doubled = numbers2.map(num => num * 2);
console.log('Mapped (doubled):', doubled);

const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log('Filtered (even):', evenNumbers);

const sum = numbers2.reduce((acc, curr) => acc + curr, 0);
console.log('Reduced (sum):', sum);

// Sorting arrays
console.log('\nSorting Arrays:');
const unsorted = [3, 1, 4, 1, 5, 9];
console.log('Unsorted:', unsorted);
console.log('Sorted:', [...unsorted].sort());
console.log('Sorted (numeric):', [...unsorted].sort((a, b) => a - b));

// Multi-dimensional arrays
console.log('\nMulti-dimensional Arrays:');
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log('Matrix:', matrix);
console.log('Matrix element [1][1]:', matrix[1][1]);

// Array destructuring
console.log('\nArray Destructuring:');
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log('Destructured:', { first, second, rest });
