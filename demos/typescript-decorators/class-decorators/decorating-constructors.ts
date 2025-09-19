// Constructor Decorators - ECMAScript 2022+ Syntax
// Modern decorator syntax for extending constructors with additional functionality

console.log("=== Constructor Decorators Demo ===\n");

// Modern decorator that extends the constructor to add audit fields
function addAuditFields(value: any, context: ClassDecoratorContext) {
  console.log(`Adding audit fields to class: ${context.name}`);
  
  return class extends value {
    // Add audit fields as public properties
    public createdAt: Date = new Date();
    public id: string = Math.random().toString(36).substring(2, 9);
    public version: number = 1;
    
    constructor(...args: any[]) {
      super(...args);
      console.log(`[AUDIT] Audit fields added to ${context.name} instance`);
      console.log(`[AUDIT] ID: ${this.id}, Created: ${this.createdAt.toISOString()}`);
    }
    
    // Add audit methods
    getAuditInfo(): string {
      return `ID: ${this.id}, Created: ${this.createdAt.toISOString()}, Version: ${this.version}`;
    }
    
    updateVersion(): void {
      this.version++;
      console.log(`[AUDIT] ${context.name} version updated to ${this.version}`);
    }
    
    getAge(): number {
      return Date.now() - this.createdAt.getTime();
    }
    
    touch(): void {
      this.version++;
      console.log(`[AUDIT] ${context.name} touched, version: ${this.version}`);
    }
  };
}

// Modern decorator that adds validation capabilities
function addValidation(value: any, context: ClassDecoratorContext) {
  console.log(`Adding validation to class: ${context.name}`);
  
  return class extends value {
    public isValid: boolean = true;
    public validationErrors: string[] = [];
    
    constructor(...args: any[]) {
      super(...args);
      this.validate();
    }
    
    validate(): boolean {
      this.validationErrors = [];
      this.isValid = true;
      
      // Basic validation - check for required fields
      for (const [key, propertyValue] of Object.entries(this)) {
        // Skip functions and special properties
        if (typeof propertyValue === 'function' || key.startsWith('_') || 
            ['isValid', 'validationErrors', 'createdAt', 'id', 'version'].includes(key)) {
          continue;
        }
        
        if (propertyValue === null || propertyValue === undefined || propertyValue === '') {
          this.validationErrors.push(`${key} is required`);
          this.isValid = false;
        }
      }
      
      if (!this.isValid) {
        console.log(`[VALIDATION] Validation failed for ${context.name}:`, this.validationErrors);
      } else {
        console.log(`[VALIDATION] ${context.name} passed validation`);
      }
      
      return this.isValid;
    }
    
    getValidationSummary(): string {
      return this.isValid 
        ? `${context.name} is valid` 
        : `${context.name} has ${this.validationErrors.length} validation errors: ${this.validationErrors.join(', ')}`;
    }
    
    revalidate(): boolean {
      console.log(`[VALIDATION] Revalidating ${context.name}...`);
      return this.validate();
    }
  };
}

// Modern decorator for logging constructor calls
function logConstruction(value: any, context: ClassDecoratorContext) {
  console.log(`Adding construction logging to class: ${context.name}`);
  
  return class extends value {
    constructor(...args: any[]) {
      console.log(`[CONSTRUCT] Creating instance of ${context.name} with args:`, args);
      super(...args);
      console.log(`[CONSTRUCT] Instance of ${context.name} created successfully`);
    }
  };
}

// Apply modern decorators to classes
@addAuditFields
class BankAccount {
  constructor(public accountNumber: string, public balance: number, public ownerName: string) {
    console.log(`BankAccount initialized: ${accountNumber} for ${ownerName} with balance $${balance}`);
  }
  
  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }
  
  withdraw(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
      return true;
    }
    console.log(`Insufficient funds. Current balance: $${this.balance}`);
    return false;
  }
  
  getBalance(): number {
    return this.balance;
  }
}

@addValidation
class CustomerContact {
  constructor(public firstName: string, public lastName: string, public email: string, public phone?: string) {
    console.log(`CustomerContact initialized: ${firstName} ${lastName}`);
  }
  
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  
  getContactInfo(): string {
    return `${this.getFullName()} - ${this.email}${this.phone ? ` (${this.phone})` : ''}`;
  }
}

// Multiple decorators - they compose from right to left (bottom to top in vertical syntax)
@logConstruction
@addValidation
@addAuditFields
class Employee {
  constructor(
    public employeeId: string, 
    public name: string, 
    public department: string, 
    public salary: number,
    public startDate: Date = new Date()
  ) {
    console.log(`Employee initialized: ${employeeId} - ${name} in ${department}`);
  }
  
  getEmployeeInfo(): string {
    return `${this.employeeId}: ${this.name} (${this.department}) - $${this.salary}`;
  }
  
  promote(newSalary: number, newDepartment?: string): void {
    const oldSalary = this.salary;
    const oldDepartment = this.department;
    
    this.salary = newSalary;
    if (newDepartment) this.department = newDepartment;
    
    console.log(`Employee promoted: ${oldSalary} -> ${newSalary}${newDepartment ? `, ${oldDepartment} -> ${newDepartment}` : ''}`);
  }
}

// Demo and test the enhanced classes
console.log("\n--- Testing BankAccount with Audit Fields ---");
const account = new BankAccount("ACC-12345", 1500, "Alice Johnson");
console.log("Initial balance:", account.getBalance());

// Test audit functionality
const auditAccount = account as any;
console.log("Audit info:", auditAccount.getAuditInfo());
auditAccount.updateVersion();

// Test original functionality
account.deposit(250);
account.withdraw(100);
console.log("Final balance:", account.getBalance());

setTimeout(() => {
  console.log("Account age (ms):", auditAccount.getAge());
  auditAccount.touch();
}, 50);

console.log("\n--- Testing CustomerContact with Validation ---");
const validContact = new CustomerContact("John", "Doe", "john.doe@example.com", "555-0123");
console.log("Contact info:", validContact.getContactInfo());

const validationContact = validContact as any;
console.log("Validation summary:", validationContact.getValidationSummary());

// Test invalid contact
console.log("\nTesting invalid contact:");
const invalidContact = new CustomerContact("", "Smith", "", "");
const invalidValidation = invalidContact as any;
console.log("Invalid contact summary:", invalidValidation.getValidationSummary());

console.log("\n--- Testing Employee with Multiple Decorators ---");
const employee = new Employee("EMP-001", "Jane Smith", "Engineering", 85000);
console.log("Employee info:", employee.getEmployeeInfo());

const enhancedEmployee = employee as any;
console.log("Employee audit:", enhancedEmployee.getAuditInfo());
console.log("Employee validation:", enhancedEmployee.getValidationSummary());

// Test employee functionality
employee.promote(95000, "Senior Engineering");
console.log("Updated info:", employee.getEmployeeInfo());
enhancedEmployee.revalidate();

console.log("\n--- Decorator Feature Analysis ---");
console.log("BankAccount features:");
console.log("  - Has audit fields:", 'createdAt' in account);
console.log("  - Has validation:", 'isValid' in account);
console.log("  - Has logging:", account.constructor.name.includes('class'));

console.log("\nCustomerContact features:");
console.log("  - Has audit fields:", 'createdAt' in validContact);
console.log("  - Has validation:", 'isValid' in validContact);
console.log("  - Has logging:", validContact.constructor.name.includes('class'));

console.log("\nEmployee features:");
console.log("  - Has audit fields:", 'createdAt' in employee);
console.log("  - Has validation:", 'isValid' in employee);
console.log("  - Has logging:", employee.constructor.name.includes('class'));

console.log("\nConstructor decorator concepts:");
console.log("- Modern syntax: (value, context) => ExtendedClass");
console.log("- Class extension with super() calls");
console.log("- Multiple decorator composition");
console.log("- Context.name provides class name information");
console.log("- Preserve original class functionality");