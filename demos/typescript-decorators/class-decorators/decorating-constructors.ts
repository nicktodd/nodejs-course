// Class Decorator - Extends Constructor
// A decorator that extends the original constructor with additional functionality

console.log("=== Decorator 3: Class Decorator that Extends Constructor ===\n");

// Decorator that extends the constructor to add new properties and methods
function addAuditFields<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    // Add audit fields
    public createdAt: Date = new Date();
    public id: string = Math.random().toString(36).substring(2, 9);
    public version: number = 1;
    
    constructor(...args: any[]) {
      super(...args);
      console.log(`Audit fields added to ${constructor.name} instance`);
      console.log(`ID: ${this.id}, Created: ${this.createdAt.toISOString()}`);
    }
    
    // Add audit methods
    getAuditInfo(): string {
      return `ID: ${this.id}, Created: ${this.createdAt.toISOString()}, Version: ${this.version}`;
    }
    
    updateVersion(): void {
      this.version++;
      console.log(`${constructor.name} version updated to ${this.version}`);
    }
    
    getAge(): number {
      return Date.now() - this.createdAt.getTime();
    }
  };
}

// Another decorator that adds validation capabilities
function addValidation<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    public isValid: boolean = true;
    public validationErrors: string[] = [];
    
    constructor(...args: any[]) {
      super(...args);
      this.validate();
    }
    
    validate(): boolean {
      this.validationErrors = [];
      this.isValid = true;
      
      // Basic validation - can be overridden in subclasses
      for (const [key, value] of Object.entries(this)) {
        if (value === null || value === undefined || value === '') {
          this.validationErrors.push(`${key} is required`);
          this.isValid = false;
        }
      }
      
      if (!this.isValid) {
        console.log(`Validation failed for ${constructor.name}:`, this.validationErrors);
      }
      
      return this.isValid;
    }
    
    getValidationSummary(): string {
      return this.isValid 
        ? `${constructor.name} is valid` 
        : `${constructor.name} has ${this.validationErrors.length} validation errors`;
    }
  };
}

// Apply decorators to classes
@addAuditFields
class Account {
  constructor(public accountNumber: string, public balance: number, public ownerName: string) {
    console.log(`Account created: ${accountNumber} for ${ownerName} with balance $${balance}`);
  }
  
  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }
  
  getBalance(): number {
    return this.balance;
  }
}

@addValidation
class Contact {
  constructor(public firstName: string, public lastName: string, public email: string) {
    console.log(`Contact created: ${firstName} ${lastName} (${email})`);
  }
  
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Multiple decorators (they compose from bottom to top)
@addValidation
@addAuditFields
class Staff {
  constructor(public employeeId: string, public name: string, public department: string, public salary: number) {
    console.log(`Staff created: ${employeeId} - ${name} in ${department}`);
  }
  
  getEmployeeInfo(): string {
    return `${this.employeeId}: ${this.name} (${this.department}) - $${this.salary}`;
  }
}

// Test the extended classes
console.log("\n--- Testing Extended Account Class ---");
const account = new Account("ACC-001", 1000, "Alice Johnson");
console.log("Account balance:", account.getBalance());
console.log("Audit info:", (account as any).getAuditInfo());

// Wait a bit and update version
setTimeout(() => {
  (account as any).updateVersion();
  console.log("Account age (ms):", (account as any).getAge());
}, 100);

console.log("\n--- Testing Validated Contact Class ---");
const validContact = new Contact("John", "Doe", "john@example.com");
console.log("Contact name:", validContact.getFullName());
console.log("Validation:", (validContact as any).getValidationSummary());

// Create invalid contact
console.log("\nCreating invalid contact:");
const invalidContact = new Contact("", "Doe", "");
console.log("Invalid contact validation:", (invalidContact as any).getValidationSummary());

console.log("\n--- Testing Staff with Multiple Decorators ---");
const staff = new Staff("EMP-001", "Jane Smith", "Engineering", 75000);
console.log("Staff info:", staff.getEmployeeInfo());
console.log("Staff audit info:", (staff as any).getAuditInfo());
console.log("Staff validation:", (staff as any).getValidationSummary());

// Test that original functionality is preserved
account.deposit(500);
console.log("Updated account balance:", account.getBalance());

console.log("\n--- Decorator Composition Demonstration ---");
console.log("Account has audit fields:", 'createdAt' in account);
console.log("Account has validation:", 'isValid' in account);
console.log("Contact has audit fields:", 'createdAt' in validContact);
console.log("Contact has validation:", 'isValid' in validContact);
console.log("Staff has both:", 'createdAt' in staff && 'isValid' in staff);