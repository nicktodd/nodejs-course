// Generic Constraints Demonstration

console.log("=== Generic Constraints Demo ===\n");

// 1. Constraint with extends
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length is: ${arg.length}`);
  return arg;
}

// These work because they have a length property
logLength("Hello World");
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10, value: "test" });

// This would not work: logLength(123); // Number doesn't have length

console.log("");

// 2. Constraint using keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "John",
  age: 30,
  city: "New York"
};

const personName = getProperty(person, "name");
const personAge = getProperty(person, "age");

console.log("Property Access with Constraints:");
console.log(`Name: ${personName}`);
console.log(`Age: ${personAge}\n`);

// 3. Multiple Constraints
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

function greetPerson<T extends Named & Aged>(person: T): string {
  return `Hello ${person.name}, you are ${person.age} years old!`;
}

const employee = { name: "Alice", age: 25, department: "IT" };
console.log("Multiple Constraints:");
console.log(greetPerson(employee));
console.log("");

// 4. Class Constraints
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

class Cat extends Animal {
  indoor: boolean;
  constructor(name: string, indoor: boolean) {
    super(name);
    this.indoor = indoor;
  }
}

function petInfo<T extends Animal>(pet: T): string {
  return `Pet name: ${pet.name}`;
}

const dog = new Dog("Rex", "Labrador");
const cat = new Cat("Whiskers", true);

console.log("Class Constraints:");
console.log(petInfo(dog));
console.log(petInfo(cat));
console.log("");

// 5. Generic Repository with Constraints
interface Identifiable {
  id: number;
}

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, updates: Partial<T>): boolean {
    const item = this.findById(id);
    if (item) {
      Object.assign(item, updates);
      return true;
    }
    return false;
  }
}

interface User extends Identifiable {
  name: string;
  email: string;
}

interface Product extends Identifiable {
  title: string;
  price: number;
}

const userRepo = new Repository<User>();
const productRepo = new Repository<Product>();

userRepo.add({ id: 1, name: "John", email: "john@example.com" });
userRepo.add({ id: 2, name: "Jane", email: "jane@example.com" });

productRepo.add({ id: 101, title: "Laptop", price: 999.99 });
productRepo.add({ id: 102, title: "Mouse", price: 29.99 });

console.log("Generic Repository:");
console.log("Users:", userRepo.getAll());
console.log("Products:", productRepo.getAll());
console.log("User with ID 1:", userRepo.findById(1));
console.log("");