// Banking System - Solution for TypeScript Classes Lab

class Account {
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

  addInterest(): void {
    const interest = this.balance * 0.02;
    this.balance += interest;
    console.log(`Added interest: $${interest.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`);
  }
}

// Testing the Account class implementation
function testBankAccounts() {
  console.log("=== Bank Accounts Demo ===\n");

  // Create Account instances
  const accounts: Account[] = [
    new Account("ACC001", 1000, "Alice Johnson"),
    new Account("ACC002", 500, "Bob Smith"),
    new Account("ACC003", 2500, "Charlie Brown")
  ];

  // Test deposits and withdrawals
  console.log("--- Testing Deposits and Withdrawals ---");
  accounts[0].deposit(200);   // Should work
  accounts[0].deposit(-50);   // Should fail (negative amount)
  
  accounts[1].withdraw(100);  // Should work
  accounts[1].withdraw(600);  // Should fail (insufficient funds)
  
  accounts[2].deposit(300);   // Should work
  accounts[2].withdraw(800);  // Should work

  // Add interest to each account
  console.log("\n--- Adding Interest ---");
  accounts.forEach((account, index) => {
    console.log(`Account ${index + 1}:`);
    account.addInterest();
  });

  // Display final balances
  console.log("\n--- Final Account Balances ---");
  accounts.forEach((account, index) => {
    console.log(`Account ${index + 1} (${account["accountHolderName"]}): $${account.getBalance().toFixed(2)}`);
  });
}

// Run the test function
testBankAccounts();
