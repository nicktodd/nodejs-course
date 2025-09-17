// Banking System - Complete Solution
// This demonstrates inheritance, abstract classes, and interfaces in TypeScript

// Part 4a: Detailable Interface
interface Detailable {
  getDetails(): string;
}

// Part 3: Abstract Account Class
abstract class Account implements Detailable {
  protected accountNumber: string;
  protected balance: number;
  protected accountHolderName: string;

  constructor(accountNumber: string, balance: number, accountHolderName: string) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.accountHolderName = accountHolderName;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("Deposit amount must be positive");
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("Insufficient funds or invalid amount");
    }
  }

  getBalance(): number {
    return this.balance;
  }

  // Abstract method - must be implemented by subclasses
  abstract addInterest(): void;
  abstract getDetails(): string;
}

// Part 2: SavingsAccount subclass
class SavingsAccount extends Account {
  private minimumBalance = 100;

  constructor(accountNumber: string, balance: number, accountHolderName: string) {
    super(accountNumber, balance, accountHolderName);
  }

  // Override withdraw to enforce minimum balance
  withdraw(amount: number): void {
    if (amount > 0 && (this.balance - amount) >= this.minimumBalance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    } else {
      console.log(`Cannot withdraw. Must maintain minimum balance of $${this.minimumBalance}`);
    }
  }

  // Override addInterest - 3.5% for savings
  addInterest(): void {
    const interest = this.balance * 0.035;
    this.balance += interest;
    console.log(`Added interest: $${interest.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`);
  }

  getDetails(): string {
    return `Savings Account - Account Number: ${this.accountNumber}, Balance: $${this.balance.toFixed(2)}, Holder: ${this.accountHolderName}`;
  }
}

// Part 2: CurrentAccount subclass
class CurrentAccount extends Account {
  private overdraftLimit: number;

  constructor(accountNumber: string, balance: number, accountHolderName: string, overdraftLimit: number) {
    super(accountNumber, balance, accountHolderName);
    this.overdraftLimit = overdraftLimit;
  }

  // Override withdraw to allow overdraft
  withdraw(amount: number): void {
    const maxWithdrawal = this.balance + this.overdraftLimit;
    if (amount > 0 && amount <= maxWithdrawal) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    } else {
      console.log(`Cannot withdraw. Exceeds overdraft limit of $${this.overdraftLimit}`);
    }
  }

  // Override addInterest - 1% for current accounts
  addInterest(): void {
    const interest = this.balance * 0.01;
    this.balance += interest;
    console.log(`Added interest: $${interest.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`);
  }

  getDetails(): string {
    return `Current Account - Account Number: ${this.accountNumber}, Balance: $${this.balance.toFixed(2)}, Overdraft: $${this.overdraftLimit}, Holder: ${this.accountHolderName}`;
  }
}

// Part 4c: Non-Account class that implements Detailable
class HomeInsurance implements Detailable {
  private policyNumber: string;
  private premium: number;
  private propertyAddress: string;

  constructor(policyNumber: string, premium: number, propertyAddress: string) {
    this.policyNumber = policyNumber;
    this.premium = premium;
    this.propertyAddress = propertyAddress;
  }

  getDetails(): string {
    return `Home Insurance - Policy: ${this.policyNumber}, Premium: $${this.premium}, Address: ${this.propertyAddress}`;
  }
}

// Testing the implementation
function runBankingSystemDemo() {
  console.log("=== Banking System Demo ===\n");

  // Part 1 & 2: Create different account types
  const accounts: Account[] = [
    new SavingsAccount("SAV001", 1000, "Alice Johnson"),
    new CurrentAccount("CUR001", 500, "Bob Smith", 200),
    new SavingsAccount("SAV002", 2500, "Charlie Brown"),
    new CurrentAccount("CUR002", -50, "Diana Prince", 300)
  ];

  // Test deposits and withdrawals
  console.log("--- Testing Deposits and Withdrawals ---");
  accounts[0].deposit(200);
  accounts[1].withdraw(100);
  accounts[2].withdraw(2500); // Should fail due to minimum balance
  accounts[3].withdraw(100);  // Should work with overdraft

  console.log("\n--- Adding Interest (Polymorphism) ---");
  accounts.forEach((account, index) => {
    console.log(`Account ${index + 1}:`);
    account.addInterest();
  });

  // Part 4: Interface polymorphism
  console.log("\n--- Interface Polymorphism with Detailable ---");
  
  const detailables: Detailable[] = [
    ...accounts, // All accounts implement Detailable
    new HomeInsurance("POL123", 1200, "123 Main St, Springfield"),
    new HomeInsurance("POL456", 800, "456 Oak Ave, Riverside")
  ];

  detailables.forEach((item, index) => {
    console.log(`${index + 1}. ${item.getDetails()}`);
  });

  console.log("\n--- Final Account Balances ---");
  accounts.forEach((account, index) => {
    console.log(`Account ${index + 1}: $${account.getBalance().toFixed(2)}`);
  });
}

// Run the demo
runBankingSystemDemo();