// Class Decorator - Parameterized  
// A decorator factory that creates customizable class decorators

console.log("=== Decorator 2: Parameterized Class Decorator ===\n");

// Decorator factory function that returns a decorator
function logClassWithOptions(options: { 
  logCreation?: boolean; 
  addTimestamp?: boolean;
  prefix?: string;
}) {
  // Return the actual decorator function
  return function(constructor: Function) {
    const prefix = options.prefix || 'Decorated';
    
    console.log(`${prefix} class decorator applied to: ${constructor.name}`);
    
    if (options.addTimestamp) {
      (constructor as any).decoratedAt = new Date().toISOString();
      console.log(`Timestamp added to ${constructor.name}`);
    }
    
    if (options.logCreation) {
      // Wrap the constructor to log instance creation
      const originalConstructor = constructor;
      
      function NewConstructor(...args: any[]) {
        console.log(`[${prefix}] Creating instance of ${constructor.name} with args:`, args);
        return new (originalConstructor as any)(...args);
      }
      
      // Preserve the original prototype and static methods
      NewConstructor.prototype = originalConstructor.prototype;
      Object.setPrototypeOf(NewConstructor, originalConstructor);
      
      return NewConstructor as any;
    }
    
    return constructor;
  };
}

// Different decorator configurations
const basicLogger = logClassWithOptions({ 
  logCreation: true 
});

const timestampLogger = logClassWithOptions({ 
  addTimestamp: true,
  prefix: 'TIMESTAMP'
});

const fullLogger = logClassWithOptions({ 
  logCreation: true,
  addTimestamp: true,
  prefix: 'FULL'
});

// Apply different decorators to different classes
@basicLogger
class Customer {
  constructor(public id: number, public name: string) {
    console.log(`Customer ${id}: ${name} initialized`);
  }
  
  getDetails(): string {
    return `Customer ${this.id}: ${this.name}`;
  }
}

@timestampLogger  
class Order {
  constructor(public orderId: string, public amount: number) {
    console.log(`Order ${orderId} for $${amount} created`);
  }
  
  getOrderInfo(): string {
    return `Order ${this.orderId}: $${this.amount}`;
  }
}

@fullLogger
class Invoice {
  constructor(public invoiceId: string, public customerId: number, public total: number) {
    console.log(`Invoice ${invoiceId} for customer ${customerId}: $${total}`);
  }
  
  getInvoiceDetails(): string {
    return `Invoice ${this.invoiceId} - Customer ${this.customerId}: $${this.total}`;
  }
}

// Test the decorated classes
console.log("\n--- Testing Parameterized Decorators ---");

console.log("\nCreating Customer (basicLogger - logs creation):");
const customer = new Customer(1, "Alice Johnson");
console.log("Customer details:", customer.getDetails());

console.log("\nCreating Order (timestampLogger - adds timestamp):");
const order = new Order("ORD-001", 299.99);
console.log("Order info:", order.getOrderInfo());
console.log("Order decorated at:", (Order as any).decoratedAt);

console.log("\nCreating Invoice (fullLogger - logs creation + timestamp):");
const invoice = new Invoice("INV-001", 1, 299.99);
console.log("Invoice details:", invoice.getInvoiceDetails());
console.log("Invoice decorated at:", (Invoice as any).decoratedAt);

// Demonstrate different decorator behaviors
console.log("\n--- Decorator Behavior Differences ---");
console.log("Customer has timestamp?", (Customer as any).decoratedAt !== undefined);
console.log("Order has timestamp?", (Order as any).decoratedAt !== undefined);
console.log("Invoice has timestamp?", (Invoice as any).decoratedAt !== undefined);

// Create more instances to show logging behavior
console.log("\n--- Creating Additional Instances ---");
console.log("Creating another Customer (should log):");
const customer2 = new Customer(2, "Bob Smith");

console.log("\nCreating another Order (no logging):");
const order2 = new Order("ORD-002", 150.00);

console.log("\nCreating another Invoice (should log):");
const invoice2 = new Invoice("INV-002", 2, 150.00);