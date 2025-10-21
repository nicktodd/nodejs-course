// --- Inheritance in TypeScript ---

class Animal {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak(): void {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  speak(): void {
    console.log(`${this.name} barks.`);
  }
}

// Abstract class example
abstract class Shape {
  abstract area(): number;
  describe(): void {
    console.log(`This is a shape.`);
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// instanceof and type-casting
const a: Animal = new Dog("Rex");
a.speak();
if (a instanceof Dog) {
  console.log('It is indeed a Dog.');
}

const s: Shape = new Circle(5);
s.describe();
console.log(`Area: ${s.area()}`);
