// Property Decorators - ECMAScript 2022+ Syntax// Property Decorators - ECMAScript 2022+ Syntax// Property Decorators - ECMAScript 2022+ Syntax

// Decorators that modify or enhance class properties

// Decorators that modify or enhance class properties// Decorators that modify or enhance class properties

console.log("=== Property Decorators Demo ===\n");

// These use the new standardized decorator proposal for property decoration

/**

 * Property Logger - Logs property access using modern syntaxconsole.log("=== Property Decorators Demo ===\n");

 */

function logProperty(value: undefined, context: ClassFieldDecoratorContext) {console.log("=== Property Decorators Demo ===\n");

  console.log(`Property decorator applied to: ${String(context.name)}`);

  /**

  return function(this: any, initialValue: any) {

    const privateKey = Symbol(`_${String(context.name)}`);/** * Simple property decorator that logs access - Modern Syntax

    this[privateKey] = initialValue;

     * Simple Property Logger - Logs property access and modification * 

    Object.defineProperty(this, context.name, {

      get() { *  * Uses the new (value, context) signature for property decorators

        console.log(`[PROP] Getting ${String(context.name)}:`, this[privateKey]);

        return this[privateKey]; * In ECMAScript property decorators: * Returns an initializer function that sets up logging behavior

      },

      set(newValue: any) { * - 'value' is undefined for properties (they don't have initial values in decorator context) */

        console.log(`[PROP] Setting ${String(context.name)} from ${this[privateKey]} to ${newValue}`);

        this[privateKey] = newValue; * - 'context' contains metadata about the property (name, kind, access, etc.)function logProperty(value: undefined, context: ClassFieldDecoratorContext) {

      },

      enumerable: true, * - Can return an initializer function to set initial value  console.log(`Property decorator applied to: ${String(context.name)}`);

      configurable: true

    }); * - Can modify property behavior through context.access  

    

    return initialValue; */  // Return initializer function that runs when the property is created

  };

}function logProperty(value: undefined, context: ClassFieldDecoratorContext) {  return function(this: any, initialValue: any) {



/**  console.log(`Property decorator applied to: ${String(context.name)}`);    console.log(`[PROP] Initializing property ${String(context.name)} with:`, initialValue);

 * Validation Decorator Factory

 */      

function validate(validator: (value: any) => boolean, errorMessage: string = 'Invalid value') {

  return function(value: undefined, context: ClassFieldDecoratorContext) {  // Return an initializer function that sets up logging    // Create private storage for the actual value

    console.log(`Validation decorator applied to: ${String(context.name)}`);

      return function(this: any, initialValue: any) {    const privateKey = Symbol(`_${String(context.name)}`);

    return function(this: any, initialValue: any) {

      if (initialValue !== undefined && !validator(initialValue)) {    console.log(`[PROP] Initializing property ${String(context.name)} with value:`, initialValue);    this[privateKey] = initialValue;

        throw new Error(`${errorMessage} for ${String(context.name)}: ${initialValue}`);

      }        

      

      const privateKey = Symbol(`_${String(context.name)}`);    // Create a private property to store the actual value    // Replace the property with getter/setter

      this[privateKey] = initialValue;

          const privateKey = Symbol(`_${String(context.name)}`);    Object.defineProperty(this, context.name, {

      Object.defineProperty(this, context.name, {

        get() {    this[privateKey] = initialValue;      get() {

          return this[privateKey];

        },            console.log(`[PROP] Getting ${String(context.name)}:`, this[privateKey]);

        set(newValue: any) {

          if (!validator(newValue)) {    // Add getter and setter to the instance        return this[privateKey];

            throw new Error(`${errorMessage} for ${String(context.name)}: ${newValue}`);

          }    Object.defineProperty(this, context.name, {      },

          console.log(`[VALIDATION] Valid value set for ${String(context.name)}:`, newValue);

          this[privateKey] = newValue;      get() {      set(newValue: any) {

        },

        enumerable: true,        console.log(`[PROP] Getting ${String(context.name)}:`, this[privateKey]);        console.log(`[PROP] Setting ${String(context.name)} from ${this[privateKey]} to ${newValue}`);

        configurable: true

      });        return this[privateKey];        this[privateKey] = newValue;

      

      return initialValue;      },      },

    };

  };      set(newValue: any) {      enumerable: true,

}

        console.log(`[PROP] Setting ${String(context.name)} from ${this[privateKey]} to ${newValue}`);      configurable: true

/**

 * Format Decorator Factory        this[privateKey] = newValue;    });

 */

function format(formatter: (value: any) => any) {      },    

  return function(value: undefined, context: ClassFieldDecoratorContext) {

    console.log(`Format decorator applied to: ${String(context.name)}`);      enumerable: true,    return initialValue;

    

    return function(this: any, initialValue: any) {      configurable: true  };

      const privateKey = Symbol(`_${String(context.name)}`);

      this[privateKey] = initialValue ? formatter(initialValue) : initialValue;    });}

      

      Object.defineProperty(this, context.name, {    

        get() {

          return this[privateKey];    return initialValue;// Property decorator with validation

        },

        set(newValue: any) {  };function validateProperty(validationFn: (value: any) => boolean, errorMessage: string = 'Invalid value') {

          const formatted = formatter(newValue);

          console.log(`[FORMAT] ${String(context.name)}: ${newValue} -> ${formatted}`);}  return function(target: any, propertyKey: string) {

          this[privateKey] = formatted;

        },    let value: any;

        enumerable: true,

        configurable: true/**    

      });

       * Validation Property Decorator - Validates property values on assignment    const getter = function() {

      return this[privateKey];

    }; *       return value;

  };

} * @param validator Function that returns true if value is valid    };



// Demo class with property decorators * @returns Property decorator that validates values    

class User {

  @logProperty */    const setter = function(newValue: any) {

  id: number = 0;

  function validate(validator: (value: any) => boolean, errorMessage?: string) {      if (!validationFn(newValue)) {

  @validate((value) => typeof value === 'string' && value.length > 0, 'Name must be non-empty')

  name: string = '';  return function(value: undefined, context: ClassFieldDecoratorContext) {        console.log(`[VALIDATE] Validation failed for ${propertyKey}: ${errorMessage}`);

  

  @format((value: string) => value.toLowerCase().trim())    console.log(`Validation decorator applied to: ${String(context.name)}`);        throw new Error(`Validation failed for ${propertyKey}: ${errorMessage}`);

  @validate((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Invalid email')

  email: string = '';          }

  

  @validate((value) => typeof value === 'number' && value >= 0, 'Age must be positive')    return function(this: any, initialValue: any) {      console.log(`[VALIDATE] Validation passed for ${propertyKey}, setting value:`, newValue);

  age: number = 0;

        // Validate initial value      value = newValue;

  constructor(id: number, name: string, email: string, age: number) {

    console.log(`Creating user: ${id}, ${name}, ${email}, ${age}`);      if (initialValue !== undefined && !validator(initialValue)) {    };

    this.id = id;

    this.name = name;        throw new Error(errorMessage || `Invalid initial value for ${String(context.name)}: ${initialValue}`);    

    this.email = email;

    this.age = age;      }    Object.defineProperty(target, propertyKey, {

  }

              get: getter,

  getInfo(): string {

    return `User ${this.id}: ${this.name} (${this.email}), age ${this.age}`;      const privateKey = Symbol(`_${String(context.name)}`);      set: setter,

  }

}      this[privateKey] = initialValue;      enumerable: true,



// Demo class with formatted properties            configurable: true

class Product {

  @format((name: string) => name.split(' ').map(word =>       Object.defineProperty(this, context.name, {    });

    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

  ).join(' '))        get() {  };

  name: string = '';

            return this[privateKey];}

  @format((price: number) => Number(price.toFixed(2)))

  @validate((value) => typeof value === 'number' && value > 0, 'Price must be positive')        },

  price: number = 0;

          set(newValue: any) {// Property decorator for automatic formatting

  @format((sku: string) => sku.toUpperCase().trim())

  sku: string = '';          if (!validator(newValue)) {function format(formatter: (value: any) => any) {

  

  constructor(name: string, price: number, sku: string) {            throw new Error(errorMessage || `Invalid value for ${String(context.name)}: ${newValue}`);  return function(target: any, propertyKey: string) {

    console.log(`Creating product: ${name}, $${price}, ${sku}`);

    this.name = name;          }    let value: any;

    this.price = price;

    this.sku = sku;          console.log(`[VALIDATION] Valid value set for ${String(context.name)}:`, newValue);    

  }

            this[privateKey] = newValue;    const getter = function() {

  getDetails(): string {

    return `${this.name} (${this.sku}): $${this.price}`;        },      return value;

  }

}        enumerable: true,    };



// Test the decorators        configurable: true    

console.log("--- Testing Property Decorators ---");

      });    const setter = function(newValue: any) {

console.log("\n1. Creating User with valid data:");

const user = new User(1, "Alice Johnson", "ALICE@EXAMPLE.COM", 25);            const formatted = formatter(newValue);

console.log("User info:", user.getInfo());

      return initialValue;      console.log(`[FORMAT] Formatted ${propertyKey} from`, newValue, 'to', formatted);

console.log("\n2. Testing property access:");

console.log("ID:", user.id);    };      value = formatted;

console.log("Name:", user.name);

console.log("Email (formatted):", user.email);  };    };



console.log("\n3. Testing property updates:");}    

user.name = "Alice Smith";

user.email = "ALICE.SMITH@COMPANY.COM";    Object.defineProperty(target, propertyKey, {

user.age = 26;

console.log("Updated info:", user.getInfo());/**      get: getter,



console.log("\n4. Testing validation:"); * Format Property Decorator - Automatically formats property values      set: setter,

try {

  user.age = -5; *       enumerable: true,

} catch (error) {

  console.log("✓ Age validation works:", (error as Error).message); * @param formatter Function that formats the input value      configurable: true

}

 * @returns Property decorator that applies formatting    });

try {

  user.email = "invalid-email"; */  };

} catch (error) {

  console.log("✓ Email validation works:", (error as Error).message);function format(formatter: (value: any) => any) {}

}

  return function(value: undefined, context: ClassFieldDecoratorContext) {

console.log("\n5. Creating Product with formatting:");

const product = new Product("macbook pro", 2499.999, "  mbp-2024  ");    console.log(`Format decorator applied to: ${String(context.name)}`);// Property decorator for read-only properties

console.log("Product details:", product.getDetails());

    function readonly(target: any, propertyKey: string) {

console.log("\n6. Testing product price validation:");

try {    return function(this: any, initialValue: any) {  let value: any;

  product.price = -100;

} catch (error) {      const privateKey = Symbol(`_${String(context.name)}`);  let isInitialized = false;

  console.log("✓ Price validation works:", (error as Error).message);

}      this[privateKey] = initialValue ? formatter(initialValue) : initialValue;  



console.log(`        const getter = function() {

=== Property Decorator Concepts ===

      Object.defineProperty(this, context.name, {    return value;

1. Modern Syntax: (value, context) => initializer function

2. Use Symbol keys for private storage        get() {  };

3. Create getters/setters for custom behavior

4. Stack decorators for combined functionality          return this[privateKey];  

5. Validate inputs and format outputs

6. Provide clear error messages        },  const setter = function(newValue: any) {



Property decorators are perfect for:        set(newValue: any) {    if (isInitialized) {

- Input validation and sanitization

- Automatic formatting and transformation          const formattedValue = formatter(newValue);      console.log(`[READONLY] Attempt to modify readonly property ${propertyKey} blocked`);

- Logging property access and changes

- Implementing computed properties          console.log(`[FORMAT] Formatting ${String(context.name)}: ${newValue} -> ${formattedValue}`);      throw new Error(`Cannot modify readonly property ${propertyKey}`);

- Adding metadata to properties

`);          this[privateKey] = formattedValue;    }

        },    console.log(`[READONLY] Initializing readonly property ${propertyKey}:`, newValue);

        enumerable: true,    value = newValue;

        configurable: true    isInitialized = true;

      });  };

        

      return this[privateKey];  Object.defineProperty(target, propertyKey, {

    };    get: getter,

  };    set: setter,

}    enumerable: true,

    configurable: true

/**  });

 * Readonly Property Decorator - Makes property read-only after initialization}

 */

function readonly(value: undefined, context: ClassFieldDecoratorContext) {// Property decorator for computed properties

  console.log(`Readonly decorator applied to: ${String(context.name)}`);function computed(dependencies: string[]) {

    return function(target: any, propertyKey: string) {

  return function(this: any, initialValue: any) {    console.log(`Computed property ${propertyKey} depends on:`, dependencies);

    console.log(`[READONLY] Initializing readonly property ${String(context.name)}:`, initialValue);    

        // Store the original getter (method)

    const privateKey = Symbol(`_${String(context.name)}`);    const originalGetter = target[propertyKey];

    this[privateKey] = initialValue;    

    let isInitialized = false;    // Cache for computed value

        let cachedValue: any;

    Object.defineProperty(this, context.name, {    let isDirty = true;

      get() {    

        return this[privateKey];    // Track dependency changes

      },    dependencies.forEach(dep => {

      set(newValue: any) {      const originalDescriptor = Object.getOwnPropertyDescriptor(target, dep) ||

        if (isInitialized) {                                Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), dep);

          throw new Error(`Cannot modify readonly property ${String(context.name)}`);      

        }      if (originalDescriptor && originalDescriptor.set) {

        console.log(`[READONLY] Setting initial value for ${String(context.name)}:`, newValue);        const originalSetter = originalDescriptor.set;

        this[privateKey] = newValue;        

        isInitialized = true;        const newSetter = function(this: any, value: any) {

      },          originalSetter.call(this, value);

      enumerable: true,          isDirty = true;

      configurable: true          console.log(`[COMPUTED] Dependency ${dep} changed, invalidating ${propertyKey} cache`);

    });        };

            

    // Mark as initialized if we have an initial value        Object.defineProperty(target, dep, {

    if (initialValue !== undefined) {          ...originalDescriptor,

      isInitialized = true;          set: newSetter

    }        });

          }

    return initialValue;    });

  };    

}    // Replace with computed property

    Object.defineProperty(target, propertyKey, {

// =====================================================      get: function() {

// DEMO CLASSES - Show property decorators in action        if (isDirty) {

// =====================================================          console.log(`[COMPUTED] Recalculating ${propertyKey}`);

          cachedValue = originalGetter.call(this);

/**          isDirty = false;

 * User class demonstrating various property decorators        } else {

 */          console.log(`[COMPUTED] Returning cached value for ${propertyKey}`);

class User {        }

  /**        return cachedValue;

   * ID property with logging decorator      },

   * @logProperty - Logs all access and modifications      enumerable: true,

   */      configurable: true

  @logProperty    });

  id: number = 0;  };

  }

  /**

   * Name property with validation decorator// Property decorator for tracking changes

   * @validate - Ensures name is a non-empty stringfunction trackChanges(target: any, propertyKey: string) {

   */  let value: any;

  @validate((value) => typeof value === 'string' && value.length > 0, 'Name must be a non-empty string')  const changeHistory: Array<{ oldValue: any; newValue: any; timestamp: Date }> = [];

  name: string = '';  

    const getter = function() {

  /**    return value;

   * Email property with format and validation decorators  };

   * @format - Converts to lowercase  

   * @validate - Ensures valid email format  const setter = function(newValue: any) {

   */    const oldValue = value;

  @format((value: string) => value.toLowerCase().trim())    changeHistory.push({

  @validate((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Invalid email format')      oldValue: oldValue,

  email: string = '';      newValue: newValue,

        timestamp: new Date()

  /**    });

   * Created timestamp - readonly after initialization    

   * @readonly - Cannot be modified once set    console.log(`[TRACK] Property ${propertyKey} changed from`, oldValue, 'to', newValue);

   */    value = newValue;

  @readonly  };

  createdAt: Date = new Date();  

    Object.defineProperty(target, propertyKey, {

  /**    get: getter,

   * Age property with validation    set: setter,

   * @validate - Must be positive number    enumerable: true,

   */    configurable: true

  @validate((value) => typeof value === 'number' && value >= 0 && value <= 150, 'Age must be between 0 and 150')  });

  age: number = 0;  

    // Add method to get change history

  constructor(id: number, name: string, email: string, age: number) {  (target as any)[`get${propertyKey}History`] = function() {

    console.log(`\nInitializing User with id: ${id}, name: ${name}, email: ${email}, age: ${age}`);    return [...changeHistory];

    this.id = id;  };

    this.name = name;}

    this.email = email;

    this.age = age;// Test classes with property decorators

  }class UserProfile {

    @logProperty

  /**  name: string;

   * Update user information  

   */  @validateProperty(

  updateProfile(name: string, email: string, age: number): void {    (value) => typeof value === 'string' && value.includes('@'),

    console.log(`\nUpdating profile for user ${this.id}:`);    'Email must be a valid email address'

    this.name = name;  )

    this.email = email;  email: string;

    this.age = age;  

  }  @format((value) => typeof value === 'string' ? value.toLowerCase().trim() : value)

    username: string;

  /**  

   * Get user summary  @readonly

   */  userId: string;

  getSummary(): string {  

    return `User ${this.id}: ${this.name} (${this.email}), Age: ${this.age}, Created: ${this.createdAt.toISOString()}`;  @trackChanges

  }  status: string;

}  

  constructor(name: string, email: string, username: string, userId: string) {

/**    this.name = name;

 * Product class demonstrating formatted properties    this.email = email;

 */    this.username = username;

class Product {    this.userId = userId;

  /**    this.status = 'active';

   * Product name with formatting  }

   * @format - Converts to title case  

   */  getProfile(): object {

  @format((value: string) => value.split(' ').map(word =>     return {

    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()      name: this.name,

  ).join(' '))      email: this.email,

  name: string = '';      username: this.username,

        userId: this.userId,

  /**      status: this.status

   * Price with validation and formatting    };

   * @format - Rounds to 2 decimal places  }

   * @validate - Must be positive number}

   */

  @format((value: number) => Number(value.toFixed(2)))class MathCalculator {

  @validate((value) => typeof value === 'number' && value > 0, 'Price must be positive')  @trackChanges

  price: number = 0;  private _operand1: number = 0;

    

  /**  @trackChanges

   * SKU with formatting  private _operand2: number = 0;

   * @format - Converts to uppercase  

   */  set operand1(value: number) {

  @format((value: string) => value.toUpperCase().trim())    this._operand1 = value;

  sku: string = '';  }

    

  /**  get operand1(): number {

   * Creation date - readonly    return this._operand1;

   * @readonly - Cannot be modified after initialization  }

   */  

  @readonly  set operand2(value: number) {

  createdAt: Date = new Date();    this._operand2 = value;

    }

  constructor(name: string, price: number, sku: string) {  

    console.log(`\nInitializing Product: ${name}, $${price}, SKU: ${sku}`);  get operand2(): number {

    this.name = name;    return this._operand2;

    this.price = price;  }

    this.sku = sku;  

  }  @computed(['_operand1', '_operand2'])

    get sum(): number {

  /**    console.log(`Computing sum of ${this._operand1} + ${this._operand2}`);

   * Update product details    return this._operand1 + this._operand2;

   */  }

  updateDetails(name: string, price: number): void {  

    console.log(`\nUpdating product ${this.sku}:`);  @computed(['_operand1', '_operand2'])

    this.name = name;  get product(): number {

    this.price = price;    console.log(`Computing product of ${this._operand1} * ${this._operand2}`);

  }    return this._operand1 * this._operand2;

    }

  /**}

   * Get product info

   */// Test the property decorators

  getInfo(): string {console.log("\n--- Testing Property Decorators ---");

    return `${this.name} (${this.sku}): $${this.price}`;

  }console.log("\n1. Testing UserProfile:");

}const profile = new UserProfile("John Doe", "john@example.com", "  JOHN_DOE  ", "user123");



// =====================================================console.log("\nProfile created, testing property access:");

// DEMO EXECUTION - Test all property decorator functionalityconsole.log("Name:", profile.name);

// =====================================================console.log("Username (formatted):", profile.username);

console.log("User ID:", profile.userId);

console.log("\n--- Testing Property Decorators ---");

console.log("\n2. Testing property modifications:");

console.log("\n1. Creating and testing User with property decorators:");profile.name = "Jane Doe";

try {profile.status = "inactive";

  const user = new User(1, "alice johnson", "ALICE.JOHNSON@EXAMPLE.COM", 28);profile.status = "pending";

  

  console.log("\n   Initial user summary:", user.getSummary());console.log("\n3. Testing change tracking:");

  console.log("Status history:", (profile as any).getstatusHistory());

  console.log("\n2. Testing property access:");

  console.log("   Accessing user ID:", user.id);console.log("\n4. Testing validation:");

  console.log("   Accessing user name:", user.name);try {

  console.log("   Accessing user email (should be formatted):", user.email);  profile.email = "invalid-email";

  } catch (error) {

  console.log("\n3. Testing property updates:");  console.error("Expected validation error:", (error as Error).message);

  user.updateProfile("alice smith", "alice.smith@NEWCOMPANY.COM", 29);}

  console.log("   Updated user summary:", user.getSummary());

  try {

  console.log("\n4. Testing readonly property:");  profile.email = "jane@example.com";

  console.log("   Created at:", user.createdAt);  console.log("Valid email set successfully");

  try {} catch (error) {

    user.createdAt = new Date();  console.error("Unexpected error:", (error as Error).message);

  } catch (error) {}

    console.log("   ✓ Readonly property protection works:", (error as Error).message);

  }console.log("\n5. Testing readonly property:");

  try {

} catch (error) {  (profile as any).userId = "newUserId"; // Should fail

  console.log("   Error:", (error as Error).message);} catch (error) {

}  console.error("Expected readonly error:", (error as Error).message);

}

console.log("\n--- Testing Validation Decorators ---");

console.log("\n6. Testing computed properties:");

console.log("\n5. Testing validation failures:");const mathCalc = new MathCalculator();

try {console.log("Initial sum:", mathCalc.sum);

  console.log("   Attempting invalid email...");console.log("Initial product:", mathCalc.product);

  const user2 = new User(2, "Bob Smith", "invalid-email", 25);

} catch (error) {console.log("\nChanging operand1 to 5:");

  console.log("   ✓ Email validation works:", (error as Error).message);mathCalc.operand1 = 5;

}console.log("Sum after change:", mathCalc.sum);



try {console.log("\nChanging operand2 to 3:");

  console.log("   Attempting invalid age...");mathCalc.operand2 = 3;

  const user3 = new User(3, "Carol Davis", "carol@example.com", -5);console.log("Sum after second change:", mathCalc.sum);

} catch (error) {console.log("Product after changes:", mathCalc.product);

  console.log("   ✓ Age validation works:", (error as Error).message);

}console.log("\nAccessing computed properties again (should use cache):");

console.log("Sum (cached):", mathCalc.sum);

try {console.log("Product (cached):", mathCalc.product);

  console.log("   Attempting empty name...");

  const user4 = new User(4, "", "david@example.com", 30);console.log("\n--- Final Profile State ---");

} catch (error) {console.log(profile.getProfile());
  console.log("   ✓ Name validation works:", (error as Error).message);
}

console.log("\n--- Testing Format Decorators ---");

console.log("\n6. Creating and testing Product with format decorators:");
const product = new Product("macbook pro", 2499.999, "  mbp-2024  ");

console.log("   Product info (should show formatted values):", product.getInfo());

console.log("\n7. Testing additional formatting:");
product.updateDetails("iphone 15 pro max", 1199.9876);
console.log("   Updated product info:", product.getInfo());

console.log("\n8. Testing readonly on product:");
try {
  product.createdAt = new Date();
} catch (error) {
  console.log("   ✓ Product creation date is readonly:", (error as Error).message);
}

console.log("\n9. Testing product price validation:");
try {
  product.price = -100;
} catch (error) {
  console.log("   ✓ Price validation works:", (error as Error).message);
}

// =====================================================
// PROPERTY DECORATOR CONCEPTS SUMMARY
// =====================================================

console.log(`
========================================
PROPERTY DECORATOR CONCEPTS SUMMARY:
========================================

1. PROPERTY DECORATOR SYNTAX:
   @decoratorName
   propertyName: Type = initialValue;

2. DECORATOR FUNCTION SIGNATURE:
   function decorator(value: undefined, context: ClassFieldDecoratorContext) {
     // value is always undefined for properties
     // context contains property metadata
     return initializer function or undefined
   }

3. WHEN PROPERTY DECORATORS EXECUTE:
   - At class definition time for each decorated property
   - Initializer function runs during instance creation
   - Can modify property behavior through getters/setters

4. WHAT PROPERTY DECORATORS CAN DO:
   - Add validation logic
   - Log property access and changes
   - Format property values automatically
   - Make properties readonly
   - Add metadata to properties
   - Transform values on assignment
   - Implement change notifications

5. COMMON PATTERNS:
   - Validation: Check values before assignment
   - Formatting: Transform values on assignment
   - Logging: Track property access and changes
   - Readonly: Prevent modification after initialization
   - Observable: Notify when properties change
   - Computed: Calculate values based on other properties

6. REAL-WORLD USE CASES:
   - Form validation (@Required, @Email, @MinLength)
   - ORM field mapping (@Column, @PrimaryKey, @Index)
   - Data binding (@Bindable, @Observable)
   - Serialization control (@Exclude, @Transform)
   - API field validation (@IsNumber, @IsString)
   - UI property binding (@Input, @Output in Angular)

7. BEST PRACTICES:
   - Use Symbol keys for private storage
   - Preserve property enumeration and configuration
   - Handle undefined/null values appropriately
   - Consider performance for frequently accessed properties
   - Provide clear error messages for validation
   - Document decorator behavior thoroughly

8. MODERN vs LEGACY DECORATORS:
   - Modern: (value, context) with initializer return
   - Legacy: (target, propertyKey) with direct modification
   - Modern provides better encapsulation and type safety
   - Context object provides rich metadata about the property
   - Initializer pattern allows per-instance customization
`);