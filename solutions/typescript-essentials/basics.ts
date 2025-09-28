// TypeScript Essentials - Exercise 1 Solution: Basics
const name: string = "John Doe";
const age: number = 25;
const isStudent: boolean = true;
const courses: string[] = ["TypeScript", "JavaScript", "Node.js"];
const grades: number[] = [85, 90, 95];

function addNumbers(a: number, b: number): number {
    return a + b;
}

console.log(`${name} is ${age} years old`);
console.log(`Is student: ${isStudent}`);
console.log(`Courses: ${courses.join(", ")}`);
console.log(`Average grade: ${grades.reduce((a, b) => a + b, 0) / grades.length}`);
console.log(`Sum of 5 and 10: ${addNumbers(5, 10)}`);
