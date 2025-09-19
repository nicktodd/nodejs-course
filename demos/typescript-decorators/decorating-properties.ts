// Property Decorators - ECMAScript 2022+ Syntax
console.log("=== Property Decorators Demo ===\n");

// Simple property logger decorator
function logProperty(value: undefined, context: ClassFieldDecoratorContext) {
  console.log(`Property decorator applied to: ${String(context.name)}`);
  
  return function(this: any, initialValue: any) {
    const privateKey = Symbol(`_${String(context.name)}`);
    this[privateKey] = initialValue;
    
    Object.defineProperty(this, context.name, {
      get() {
        console.log(`[PROP] Getting ${String(context.name)}:`, this[privateKey]);
        return this[privateKey];
      },
      set(newValue: any) {
        console.log(`[PROP] Setting ${String(context.name)} to:`, newValue);
        this[privateKey] = newValue;
      },
      enumerable: true,
      configurable: true
    });
    
    return initialValue;
  };
}

// Property validation decorator factory
function validateProperty(validator: (value: any) => boolean, errorMessage: string = 'Invalid value') {
  return function(value: undefined, context: ClassFieldDecoratorContext) {
    console.log(`Validation decorator applied to: ${String(context.name)}`);
    
    return function(this: any, initialValue: any) {
      // Only validate non-default initial values
      if (initialValue !== undefined && typeof initialValue === 'string' && initialValue !== '' && !validator(initialValue)) {
        throw new Error(`${errorMessage}: ${initialValue}`);
      }
      if (initialValue !== undefined && typeof initialValue === 'number' && initialValue !== 0 && !validator(initialValue)) {
        throw new Error(`${errorMessage}: ${initialValue}`);
      }
      
      const privateKey = Symbol(`_${String(context.name)}`);
      this[privateKey] = initialValue;
      
      Object.defineProperty(this, context.name, {
        get() {
          return this[privateKey];
        },
        set(newValue: any) {
          // Skip validation for constructor initialization with defaults
          if (newValue !== '' && newValue !== 0 && !validator(newValue)) {
            throw new Error(`${errorMessage}: ${newValue}`);
          }
          if (newValue !== '' && newValue !== 0) {
            console.log(`[VALIDATION] Valid value for ${String(context.name)}:`, newValue);
          }
          this[privateKey] = newValue;
        },
        enumerable: true,
        configurable: true
      });
      
      return initialValue;
    };
  };
}

// Format decorator factory
function format(formatter: (value: any) => any) {
  return function(value: undefined, context: ClassFieldDecoratorContext) {
    console.log(`Format decorator applied to: ${String(context.name)}`);
    
    return function(this: any, initialValue: any) {
      const privateKey = Symbol(`_${String(context.name)}`);
      this[privateKey] = initialValue ? formatter(initialValue) : initialValue;
      
      Object.defineProperty(this, context.name, {
        get() {
          return this[privateKey];
        },
        set(newValue: any) {
          const formatted = formatter(newValue);
          console.log(`[FORMAT] ${String(context.name)}: ${newValue} -> ${formatted}`);
          this[privateKey] = formatted;
        },
        enumerable: true,
        configurable: true
      });
      
      return this[privateKey];
    };
  };
}

// Demo class
class PropertyUser {
  @logProperty
  id: number = 0;
  
  @validateProperty((value) => typeof value === 'string' && value.length > 0, 'Name must be non-empty')
  name: string = '';
  
  @format((value: string) => value.toLowerCase().trim())
  @validateProperty((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Invalid email')
  email: string = '';
  
  @validateProperty((value) => typeof value === 'number' && value >= 0, 'Age must be positive')
  age: number = 0;
  
  constructor(id: number, name: string, email: string, age: number) {
    console.log(`Creating user: ${id}, ${name}, ${email}, ${age}`);
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
  }
  
  getInfo(): string {
    return `PropertyUser ${this.id}: ${this.name} (${this.email}), age ${this.age}`;
  }
}

// Test the decorators
console.log("--- Testing Property Decorators ---");

console.log("\n1. Creating PropertyUser:");
const user = new PropertyUser(1, "Alice Johnson", "ALICE@EXAMPLE.COM", 25);
console.log("User info:", user.getInfo());

console.log("\n2. Testing property access:");
console.log("ID:", user.id);
console.log("Name:", user.name);
console.log("Email (formatted):", user.email);

console.log("\n3. Testing updates:");
user.name = "Alice Smith";
user.email = "ALICE.SMITH@COMPANY.COM";
user.age = 26;
console.log("Updated:", user.getInfo());

console.log("\n4. Testing validation:");
try {
  user.age = -5;
} catch (error) {
  console.log("Age validation works:", (error as Error).message);
}

try {
  user.email = "invalid-email";
} catch (error) {
  console.log("Email validation works:", (error as Error).message);
}

console.log("\nProperty decorator concepts:");
console.log("- Modern syntax: (value, context) => initializer");
console.log("- Use Symbol keys for private storage");
console.log("- Stack decorators for combined functionality");
console.log("- Validate inputs and format outputs");
