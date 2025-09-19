// Parameterized Class Decorators - ECMAScript 2022+ Syntax
// Decorator factories that create customizable class decorators with configuration options
// These demonstrate the factory pattern for creating flexible, reusable decorators

console.log("=== Parameterized Class Decorators Demo ===\n");

/**
 * Decorator factory function - Modern ECMAScript syntax
 * 
 * Creates parameterized class decorators with configurable options
 * Uses the new (value, context) signature for decorator functions
 */
interface DecoratorOptions {
  logCreation?: boolean;
  addTimestamp?: boolean;
  prefix?: string;
}

function logClassWithOptions(options: DecoratorOptions) {
  // Return the actual decorator function using modern syntax
  return function<T extends new (...args: any[]) => any>(
    value: T, 
    context: ClassDecoratorContext
  ): T {
    const prefix = options.prefix || 'Decorated';
    
    console.log(`${prefix} class decorator applied to: ${context.name as string}`);
    
    // Create enhanced class with optional features
    class EnhancedClass extends value {
      constructor(...args: any[]) {
        // Add creation logging if enabled
        if (options.logCreation) {
          console.log(`[${prefix}] Creating instance of ${context.name as string} with args:`, args);
        }
        
        // Call original constructor
        super(...args);
      }
    }
    
    // Add timestamp if enabled
    if (options.addTimestamp) {
      (EnhancedClass as any).decoratedAt = new Date().toISOString();
      console.log(`Timestamp added to ${context.name as string}`);
    }
    
    // Preserve original class name
    Object.defineProperty(EnhancedClass, 'name', { 
      value: context.name || value.name,
      configurable: true
    });
    
    return EnhancedClass as T;
  };
}

// =====================================================
// DECORATOR CONFIGURATIONS - Pre-configured decorators
// =====================================================

/**
 * Basic logger configuration - Only logs instance creation
 * Shows minimal decorator configuration with single option
 */
const basicLogger = logClassWithOptions({ 
  logCreation: true 
});

/**
 * Timestamp logger configuration - Adds creation timestamp to class
 * Demonstrates static property addition without constructor wrapping
 */
const timestampLogger = logClassWithOptions({ 
  addTimestamp: true,
  prefix: 'TIMESTAMP'
});

/**
 * Full logger configuration - Combines multiple features
 * Shows how decorator options can be combined for comprehensive functionality
 */
const fullLogger = logClassWithOptions({ 
  logCreation: true,
  addTimestamp: true,
  prefix: 'FULL'
});

// =====================================================
// DEMO CLASSES - Different decorator configurations
// =====================================================

/**
 * Customer class with basic logging decorator
 * @basicLogger - Only logs when instances are created
 * 
 * Demonstrates:
 * - Simple parameterized decorator usage
 * - Constructor parameter logging
 * - Minimal decorator overhead
 */
@basicLogger
class Customer {
  constructor(public id: number, public name: string) {
    console.log(`Customer ${id}: ${name} initialized`);
  }
  
  /**
   * Get formatted customer details
   */
  getDetails(): string {
    return `Customer ${this.id}: ${this.name}`;
  }
  
  /**
   * Update customer information (example method)
   */
  updateName(newName: string): void {
    console.log(`Updating customer ${this.id} name from ${this.name} to ${newName}`);
    this.name = newName;
  }
}

/**
 * Order class with timestamp decorator
 * @timestampLogger - Adds decoration timestamp as static property
 * 
 * Demonstrates:
 * - Static property addition via decorator
 * - No constructor wrapping (no creation logging)
 * - Custom prefix usage in decorator
 */
@timestampLogger  
class Order {
  constructor(public orderId: string, public amount: number) {
    console.log(`Order ${orderId} for $${amount} created`);
  }
  
  /**
   * Get formatted order information
   */
  getOrderInfo(): string {
    return `Order ${this.orderId}: $${this.amount}`;
  }
  
  /**
   * Apply discount to order
   */
  applyDiscount(percentage: number): number {
    const discount = this.amount * (percentage / 100);
    const newAmount = this.amount - discount;
    console.log(`Applied ${percentage}% discount: $${this.amount} -> $${newAmount}`);
    return newAmount;
  }
}

/**
 * Invoice class with full logging decorator
 * @fullLogger - Combines creation logging + timestamp + custom prefix
 * 
 * Demonstrates:
 * - Multiple decorator features working together
 * - Both constructor wrapping and static property addition
 * - Complete decorator functionality showcase
 */
@fullLogger
class Invoice {
  constructor(public invoiceId: string, public customerId: number, public total: number) {
    console.log(`Invoice ${invoiceId} for customer ${customerId}: $${total}`);
  }
  
  /**
   * Get formatted invoice details
   */
  getInvoiceDetails(): string {
    return `Invoice ${this.invoiceId} - Customer ${this.customerId}: $${this.total}`;
  }
  
  /**
   * Mark invoice as paid
   */
  markAsPaid(): void {
    console.log(`Invoice ${this.invoiceId} marked as paid ($${this.total})`);
  }
}

// =====================================================
// DEMO EXECUTION - Test parameterized decorators
// =====================================================

console.log("\n--- Testing Parameterized Decorators ---");

console.log("\n1. Testing Basic Logger (@basicLogger):");
const customer = new Customer(1, "Alice Johnson");
console.log("   Customer details:", customer.getDetails());
customer.updateName("Alice Smith-Johnson");
console.log("   Updated details:", customer.getDetails());

console.log("\n2. Testing Timestamp Logger (@timestampLogger):");
const order = new Order("ORD-001", 299.99);
console.log("   Order info:", order.getOrderInfo());
console.log("   Order decorated at:", (Order as any).decoratedAt);
const discountedAmount = order.applyDiscount(10);
console.log("   Final amount after discount:", discountedAmount);

console.log("\n3. Testing Full Logger (@fullLogger):");
const invoice = new Invoice("INV-001", 1, 299.99);
console.log("   Invoice details:", invoice.getInvoiceDetails());
console.log("   Invoice decorated at:", (Invoice as any).decoratedAt);
invoice.markAsPaid();

console.log("\n--- Decorator Feature Comparison ---");
console.log("Customer (Basic Logger):");
console.log("   - Logs creation:", "YES");
console.log("   - Has timestamp:", (Customer as any).decoratedAt !== undefined ? "YES" : "NO");
console.log("   - Prefix used:", "Decorated (default)");

console.log("\nOrder (Timestamp Logger):");
console.log("   - Logs creation:", "NO");
console.log("   - Has timestamp:", (Order as any).decoratedAt !== undefined ? "YES" : "NO");
console.log("   - Prefix used:", "TIMESTAMP");

console.log("\nInvoice (Full Logger):");
console.log("   - Logs creation:", "YES");
console.log("   - Has timestamp:", (Invoice as any).decoratedAt !== undefined ? "YES" : "NO");
console.log("   - Prefix used:", "FULL");

console.log("\n--- Creating Additional Instances ---");
console.log("\n4. Creating more customers (should show logging):");
const customer2 = new Customer(2, "Bob Smith");
const customer3 = new Customer(3, "Carol Davis");

console.log("\n5. Creating more orders (no creation logging):");
const order2 = new Order("ORD-002", 150.00);
const order3 = new Order("ORD-003", 75.50);

console.log("\n6. Creating more invoices (should show logging):");
const invoice2 = new Invoice("INV-002", 2, 150.00);
const invoice3 = new Invoice("INV-003", 3, 75.50);

// =====================================================
// PARAMETERIZED DECORATOR CONCEPTS SUMMARY
// =====================================================

console.log(`
========================================
PARAMETERIZED DECORATOR CONCEPTS SUMMARY:
========================================

1. DECORATOR FACTORY PATTERN:
   function decoratorFactory(options) {
     return function decorator(value, context) {
       // Use options to customize behavior
     }
   }

2. USAGE SYNTAX:
   @decoratorFactory({ option1: true, option2: 'value' })
   class MyClass { ... }

3. BENEFITS OF PARAMETERIZED DECORATORS:
   - Configurable behavior through options
   - Reusable decorator logic with variations  
   - Single decorator factory for multiple use cases
   - Type-safe configuration with interfaces
   - Flexible feature combinations

4. COMMON CONFIGURATION OPTIONS:
   - Logging levels and prefixes
   - Feature toggles (enable/disable functionality)
   - Validation rules and constraints
   - Metadata collection preferences
   - Performance monitoring settings

5. REAL-WORLD USE CASES:
   - API route configuration: @Route({ method: 'GET', path: '/users' })
   - Database entities: @Entity({ table: 'users', schema: 'public' })
   - Caching strategies: @Cache({ ttl: 300, key: 'user-data' })
   - Validation rules: @Validate({ required: true, min: 0 })
   - Authorization: @Authorize({ roles: ['admin', 'user'] })

6. BEST PRACTICES:
   - Use TypeScript interfaces for option types
   - Provide sensible default values
   - Document all available options
   - Keep option objects flat when possible
   - Validate options in the factory function
   - Consider performance implications

7. MODERN vs LEGACY SYNTAX:
   - Modern: Uses (value, context) decorator signature
   - Legacy: Uses (constructor) decorator signature
   - Modern provides better type safety and metadata
   - Context object gives rich information about decoration target
`);