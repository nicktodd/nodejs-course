// --- Defining an Interface to Specify Properties ---

interface Person {
  name: string;
  age: number;
}

// Object literal implementing interface
const alice: Person = {
  name: "Alice",
  age: 30
};

// Class implementing interface
// Parameter properties (TypeScript will create and assign these automatically)
// This syntax may not work in all environments (e.g., some ts-node configs)
class Employee implements Person {
  constructor(public name: string, public age: number) {}
}

// Explicit property assignment (compatible everywhere)
// class Employee implements Person {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
const bob = new Employee("Bob", 40);

// Using interface in function signature
function printPerson(p: Person) {
  console.log(`${p.name} is ${p.age} years old.`);
}
printPerson(alice);
printPerson(bob);
