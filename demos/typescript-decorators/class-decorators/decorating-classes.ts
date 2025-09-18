// Class Decorator - Simple
// A basic class decorator that adds functionality to a class

console.log("=== Decorator 1: Simple Class Decorator ===\n");

// Simple class decorator function
function logClass(constructor: Function) {
  console.log(`Class decorator applied to: ${constructor.name}`);
  
  // Add a static method to the class
  (constructor as any).getClassName = function() {
    return constructor.name;
  };
  
  // Add timestamp when class was decorated
  (constructor as any).decoratedAt = new Date().toISOString();
  
  console.log(`Decorator added static methods to ${constructor.name}`);
}

// Apply the decorator to a class
@logClass
class User {
  constructor(public name: string, public email: string) {
    console.log(`Creating User: ${name}`);
  }
  
  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

// Test the decorated class
console.log("\n--- Testing Decorated Class ---");

// Create instances
const user1 = new User("Alice", "alice@example.com");
const user2 = new User("Bob", "bob@example.com");

console.log("User 1:", user1.getInfo());
console.log("User 2:", user2.getInfo());

// Access the added static methods
console.log("\n--- Testing Added Static Methods ---");
console.log("Class name:", (User as any).getClassName());
console.log("Decorated at:", (User as any).decoratedAt);

// Another example with a different class
@logClass
class Item {
  constructor(public name: string, public price: number) {
    console.log(`Creating Item: ${name} ($${price})`);
  }
  
  getDescription(): string {
    return `${this.name} costs $${this.price}`;
  }
}

console.log("\n--- Testing Second Decorated Class ---");

const item = new Item("Laptop", 999);
console.log("Item:", item.getDescription());
console.log("Item class name:", (Item as any).getClassName());
console.log("Item decorated at:", (Item as any).decoratedAt);

// Demonstrate that the decorator doesn't affect the original functionality
console.log("\n--- Original Functionality Preserved ---");
console.log("User instance methods still work:", user1.getInfo());
console.log("Item instance methods still work:", item.getDescription());
console.log("User constructor properties:", { name: user1.name, email: user1.email });
console.log("Item constructor properties:", { name: item.name, price: item.price });