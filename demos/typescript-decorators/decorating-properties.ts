// Property Decorator  
// Decorators that modify or enhance class properties

console.log("=== Decorator 7: Property Decorator ===\n");

// Simple property decorator that logs access
function logProperty(target: any, propertyKey: string) {
  console.log(`Property decorator applied to: ${target.constructor.name}.${propertyKey}`);
  
  let value: any;
  
  const getter = function() {
    console.log(`[PROP] Getting value of ${propertyKey}:`, value);
    return value;
  };
  
  const setter = function(newValue: any) {
    console.log(`[PROP] Setting value of ${propertyKey} from`, value, 'to', newValue);
    value = newValue;
  };
  
  // Replace the property with getter/setter
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

// Property decorator with validation
function validateProperty(validationFn: (value: any) => boolean, errorMessage: string = 'Invalid value') {
  return function(target: any, propertyKey: string) {
    let value: any;
    
    const getter = function() {
      return value;
    };
    
    const setter = function(newValue: any) {
      if (!validationFn(newValue)) {
        console.log(`[VALIDATE] Validation failed for ${propertyKey}: ${errorMessage}`);
        throw new Error(`Validation failed for ${propertyKey}: ${errorMessage}`);
      }
      console.log(`[VALIDATE] Validation passed for ${propertyKey}, setting value:`, newValue);
      value = newValue;
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

// Property decorator for automatic formatting
function format(formatter: (value: any) => any) {
  return function(target: any, propertyKey: string) {
    let value: any;
    
    const getter = function() {
      return value;
    };
    
    const setter = function(newValue: any) {
      const formatted = formatter(newValue);
      console.log(`[FORMAT] Formatted ${propertyKey} from`, newValue, 'to', formatted);
      value = formatted;
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

// Property decorator for read-only properties
function readonly(target: any, propertyKey: string) {
  let value: any;
  let isInitialized = false;
  
  const getter = function() {
    return value;
  };
  
  const setter = function(newValue: any) {
    if (isInitialized) {
      console.log(`[READONLY] Attempt to modify readonly property ${propertyKey} blocked`);
      throw new Error(`Cannot modify readonly property ${propertyKey}`);
    }
    console.log(`[READONLY] Initializing readonly property ${propertyKey}:`, newValue);
    value = newValue;
    isInitialized = true;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

// Property decorator for computed properties
function computed(dependencies: string[]) {
  return function(target: any, propertyKey: string) {
    console.log(`Computed property ${propertyKey} depends on:`, dependencies);
    
    // Store the original getter (method)
    const originalGetter = target[propertyKey];
    
    // Cache for computed value
    let cachedValue: any;
    let isDirty = true;
    
    // Track dependency changes
    dependencies.forEach(dep => {
      const originalDescriptor = Object.getOwnPropertyDescriptor(target, dep) ||
                                Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), dep);
      
      if (originalDescriptor && originalDescriptor.set) {
        const originalSetter = originalDescriptor.set;
        
        const newSetter = function(this: any, value: any) {
          originalSetter.call(this, value);
          isDirty = true;
          console.log(`[COMPUTED] Dependency ${dep} changed, invalidating ${propertyKey} cache`);
        };
        
        Object.defineProperty(target, dep, {
          ...originalDescriptor,
          set: newSetter
        });
      }
    });
    
    // Replace with computed property
    Object.defineProperty(target, propertyKey, {
      get: function() {
        if (isDirty) {
          console.log(`[COMPUTED] Recalculating ${propertyKey}`);
          cachedValue = originalGetter.call(this);
          isDirty = false;
        } else {
          console.log(`[COMPUTED] Returning cached value for ${propertyKey}`);
        }
        return cachedValue;
      },
      enumerable: true,
      configurable: true
    });
  };
}

// Property decorator for tracking changes
function trackChanges(target: any, propertyKey: string) {
  let value: any;
  const changeHistory: Array<{ oldValue: any; newValue: any; timestamp: Date }> = [];
  
  const getter = function() {
    return value;
  };
  
  const setter = function(newValue: any) {
    const oldValue = value;
    changeHistory.push({
      oldValue: oldValue,
      newValue: newValue,
      timestamp: new Date()
    });
    
    console.log(`[TRACK] Property ${propertyKey} changed from`, oldValue, 'to', newValue);
    value = newValue;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
  
  // Add method to get change history
  (target as any)[`get${propertyKey}History`] = function() {
    return [...changeHistory];
  };
}

// Test classes with property decorators
class UserProfile {
  @logProperty
  name: string;
  
  @validateProperty(
    (value) => typeof value === 'string' && value.includes('@'),
    'Email must be a valid email address'
  )
  email: string;
  
  @format((value) => typeof value === 'string' ? value.toLowerCase().trim() : value)
  username: string;
  
  @readonly
  userId: string;
  
  @trackChanges
  status: string;
  
  constructor(name: string, email: string, username: string, userId: string) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.userId = userId;
    this.status = 'active';
  }
  
  getProfile(): object {
    return {
      name: this.name,
      email: this.email,
      username: this.username,
      userId: this.userId,
      status: this.status
    };
  }
}

class MathCalculator {
  @trackChanges
  private _operand1: number = 0;
  
  @trackChanges
  private _operand2: number = 0;
  
  set operand1(value: number) {
    this._operand1 = value;
  }
  
  get operand1(): number {
    return this._operand1;
  }
  
  set operand2(value: number) {
    this._operand2 = value;
  }
  
  get operand2(): number {
    return this._operand2;
  }
  
  @computed(['_operand1', '_operand2'])
  get sum(): number {
    console.log(`Computing sum of ${this._operand1} + ${this._operand2}`);
    return this._operand1 + this._operand2;
  }
  
  @computed(['_operand1', '_operand2'])
  get product(): number {
    console.log(`Computing product of ${this._operand1} * ${this._operand2}`);
    return this._operand1 * this._operand2;
  }
}

// Test the property decorators
console.log("\n--- Testing Property Decorators ---");

console.log("\n1. Testing UserProfile:");
const profile = new UserProfile("John Doe", "john@example.com", "  JOHN_DOE  ", "user123");

console.log("\nProfile created, testing property access:");
console.log("Name:", profile.name);
console.log("Username (formatted):", profile.username);
console.log("User ID:", profile.userId);

console.log("\n2. Testing property modifications:");
profile.name = "Jane Doe";
profile.status = "inactive";
profile.status = "pending";

console.log("\n3. Testing change tracking:");
console.log("Status history:", (profile as any).getstatusHistory());

console.log("\n4. Testing validation:");
try {
  profile.email = "invalid-email";
} catch (error) {
  console.error("Expected validation error:", (error as Error).message);
}

try {
  profile.email = "jane@example.com";
  console.log("Valid email set successfully");
} catch (error) {
  console.error("Unexpected error:", (error as Error).message);
}

console.log("\n5. Testing readonly property:");
try {
  (profile as any).userId = "newUserId"; // Should fail
} catch (error) {
  console.error("Expected readonly error:", (error as Error).message);
}

console.log("\n6. Testing computed properties:");
const mathCalc = new MathCalculator();
console.log("Initial sum:", mathCalc.sum);
console.log("Initial product:", mathCalc.product);

console.log("\nChanging operand1 to 5:");
mathCalc.operand1 = 5;
console.log("Sum after change:", mathCalc.sum);

console.log("\nChanging operand2 to 3:");
mathCalc.operand2 = 3;
console.log("Sum after second change:", mathCalc.sum);
console.log("Product after changes:", mathCalc.product);

console.log("\nAccessing computed properties again (should use cache):");
console.log("Sum (cached):", mathCalc.sum);
console.log("Product (cached):", mathCalc.product);

console.log("\n--- Final Profile State ---");
console.log(profile.getProfile());