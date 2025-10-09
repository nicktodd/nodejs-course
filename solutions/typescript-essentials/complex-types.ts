// TypeScript Essentials - Exercise 2 Solution: Complex Types
enum DaysOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

// Define Person tuple type
type Person = [string, number, boolean]; // [name, age, isEmployed]

// Create array of people
const people: Person[] = [
    ["Alice", 25, true],
    ["Bob", 30, false],
    ["Charlie", 35, true],
    ["Diana", 28, true]
];

// Function to filter employed people
function findEmployed(people: Person[]): Person[] {
    return people.filter(person => person[2] === true);
}

// Function to calculate average age
function calculateAverageAge(people: Person[]): number {
    const totalAge = people.reduce((sum, person) => sum + person[1], 0);
    return totalAge / people.length;
}

// Function to check if a day is a weekday
function isWeekday(day: DaysOfWeek): boolean {
    return day >= DaysOfWeek.Monday && day <= DaysOfWeek.Friday;
}

// Display results
const employed = findEmployed(people);
console.log("Employed people:", employed.length);
console.log("Employed people details:", employed);
console.log("Average age:", calculateAverageAge(people));
console.log("Is Monday a weekday?", isWeekday(DaysOfWeek.Monday));
console.log("Is Saturday a weekday?", isWeekday(DaysOfWeek.Saturday));
