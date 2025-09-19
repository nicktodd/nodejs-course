// Class Decorators - ECMAScript 2022+ Syntax
// Decorators that modify or extend class behavior at the class level
// These use the new standardized decorator proposal

console.log("=== Simple Class Decorators Demo ===\n");

/**
 * Simple Class Decorator - Adds static methods and metadata to classes
 * 
 * In ECMAScript class decorators:
 * - 'value' is the class constructor function
 * - 'context' contains metadata about the class (name, kind, etc.)
 * - Can return a new class or modify the existing one
 * - Executes when the class is defined, not when instantiated
 */
function logClass<T extends new (...args: any[]) => any>(
  value: T, 
  context: ClassDecoratorContext
): T {
  console.log(`Class decorator applied to: ${context.name as string}`);
  
  // Create extended class with additional static methods
  class DecoratedClass extends value {
    static getClassName(): string {
      return context.name as string;
    }
    
    static decoratedAt = new Date().toISOString();
    
    static getDecorationInfo(): object {
      return {
        className: this.getClassName(),
        decoratedAt: this.decoratedAt,
        originalConstructor: value.name
      };
    }
    
    constructor(...args: any[]) {
      console.log(`Creating decorated instance of ${context.name as string}`);
      super(...args);
    }
  }
  
  // Preserve original class name
  Object.defineProperty(DecoratedClass, 'name', { 
    value: context.name || value.name,
    configurable: true
  });
  
  console.log(`Decorator added static methods to ${context.name as string}`);
  return DecoratedClass as T;
}

/**
 * Metadata Class Decorator - Adds comprehensive metadata tracking
 * 
 * Features:
 * - Tracks creation count
 * - Records instance creation timestamps
 * - Adds utility methods for debugging
 * - Preserves original class functionality
 */
function trackMetadata<T extends new (...args: any[]) => any>(
  value: T, 
  context: ClassDecoratorContext
): T {
  console.log(`Metadata tracker applied to: ${context.name as string}`);
  
  // Create extended class with tracking functionality
  class TrackedClass extends value {
    static creationCount = 0;
    static instances: any[] = [];
    static creationTimes: Date[] = [];
    
    static getStats(): object {
      return {
        className: context.name as string,
        totalInstances: this.creationCount,
        firstCreated: this.creationTimes[0]?.toISOString() || 'None',
        lastCreated: this.creationTimes[this.creationTimes.length - 1]?.toISOString() || 'None'
      };
    }
    
    static getAllInstances(): any[] {
      return [...this.instances];
    }
    
    constructor(...args: any[]) {
      super(...args);
      
      // Track this instance
      (this.constructor as typeof TrackedClass).creationCount++;
      (this.constructor as typeof TrackedClass).instances.push(this);
      (this.constructor as typeof TrackedClass).creationTimes.push(new Date());
      
      console.log(`[TRACKER] Created instance #${(this.constructor as typeof TrackedClass).creationCount} of ${context.name as string}`);
    }
  }
  
  // Preserve original class name
  Object.defineProperty(TrackedClass, 'name', { 
    value: context.name || value.name,
    configurable: true
  });
  
  return TrackedClass as T;
}

// =====================================================
// DEMO CLASSES - Show class decorators in action
// =====================================================

/**
 * User class with simple class decorator
 * @logClass - Adds static methods and decoration metadata
 */
@logClass
class User {
  constructor(public name: string, public email: string) {
    console.log(`Initializing User: ${name} (${email})`);
  }
  
  /**
   * Get user information as formatted string
   */
  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
  
  /**
   * Update user email
   */
  updateEmail(newEmail: string): void {
    console.log(`Updating ${this.name}'s email from ${this.email} to ${newEmail}`);
    this.email = newEmail;
  }
}

/**
 * Product class with metadata tracking decorator
 * @trackMetadata - Tracks instance creation and provides statistics
 */
@trackMetadata
class Product {
  constructor(
    public name: string, 
    public price: number, 
    public category: string = 'General'
  ) {
    console.log(`Initializing Product: ${name} in ${category} category ($${price})`);
  }
  
  /**
   * Get product description
   */
  getDescription(): string {
    return `${this.name} (${this.category}) - $${this.price}`;
  }
  
  /**
   * Apply discount to product
   */
  applyDiscount(percentage: number): number {
    const discountAmount = this.price * (percentage / 100);
    const newPrice = this.price - discountAmount;
    console.log(`Applied ${percentage}% discount to ${this.name}: $${this.price} -> $${newPrice}`);
    return newPrice;
  }
}

// =====================================================
// DEMO EXECUTION - Test all class decorator functionality
// =====================================================

console.log("\n--- Testing Simple Class Decorator (@logClass) ---");

// Test User class with @logClass decorator
console.log("\n1. Creating User instances:");
const user1 = new User("Alice Johnson", "alice@example.com");
const user2 = new User("Bob Smith", "bob@example.com");

console.log("\n2. Testing instance methods:");
console.log("   User 1 info:", user1.getInfo());
console.log("   User 2 info:", user2.getInfo());

// Test added static methods from decorator
console.log("\n3. Testing decorator-added static methods:");
console.log("   Class name:", (User as any).getClassName());
console.log("   Decorated at:", (User as any).decoratedAt);
console.log("   Decoration info:", (User as any).getDecorationInfo());

console.log("\n4. Testing instance method functionality:");
user1.updateEmail("alice.johnson@newcompany.com");
console.log("   Updated user info:", user1.getInfo());

console.log("\n--- Testing Metadata Tracking Decorator (@trackMetadata) ---");

// Test Product class with @trackMetadata decorator
console.log("\n5. Creating Product instances:");
const laptop = new Product("MacBook Pro", 2499, "Electronics");
const book = new Product("TypeScript Handbook", 39.99, "Books");
const headphones = new Product("AirPods Pro", 249, "Electronics");

console.log("\n6. Testing product functionality:");
console.log("   Laptop:", laptop.getDescription());
console.log("   Book:", book.getDescription());
console.log("   Headphones:", headphones.getDescription());

console.log("\n7. Testing discount functionality:");
const discountedLaptop = laptop.applyDiscount(10);
console.log("   Discounted laptop price:", discountedLaptop);

console.log("\n8. Testing metadata tracking:");
const stats = (Product as any).getStats();
console.log("   Product creation statistics:", stats);

console.log("\n9. Testing instance tracking:");
const allProducts = (Product as any).getAllInstances();
console.log("   Total tracked products:", allProducts.length);
allProducts.forEach((product: any, index: number) => {
  console.log(`   Product ${index + 1}: ${product.getDescription()}`);
});

// =====================================================
// CLASS DECORATOR CONCEPTS SUMMARY
// =====================================================

console.log(`
========================================
CLASS DECORATOR CONCEPTS SUMMARY:
========================================

1. CLASS DECORATOR SYNTAX:
   @decoratorName
   class MyClass { ... }

2. DECORATOR FUNCTION SIGNATURE:
   function myDecorator(value, context) {
     // value = class constructor
     // context = class metadata
     // Can modify the class or return a new one
   }

3. WHEN CLASS DECORATORS EXECUTE:
   - At class definition time (not instantiation)
   - Before any instances are created
   - Can modify the class constructor

4. WHAT CLASS DECORATORS CAN DO:
   - Add static methods and properties
   - Wrap the constructor
   - Add metadata and tracking
   - Modify class behavior
   - Register classes with frameworks

5. COMMON USE CASES:
   - Dependency injection registration
   - ORM entity configuration
   - Logging and monitoring setup
   - Metadata annotation
   - Framework integration (Angular, NestJS)
   - Serialization configuration

6. BEST PRACTICES:
   - Keep decorators side-effect free when possible
   - Document what the decorator adds to the class
   - Preserve original class functionality
   - Use TypeScript for better type safety
   - Consider performance implications
   - Test both decorated and undecorated behavior

7. MODERN vs LEGACY DECORATORS:
   - Modern: (value, context) => modified class
   - Legacy: (constructor) => void | new constructor
   - Modern decorators are more flexible and type-safe
   - Context provides rich metadata about the decoration target
`);