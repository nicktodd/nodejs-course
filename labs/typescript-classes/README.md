# TypeScript Classes Lab Exercise

## Overview
In this lab, you'll work with TypeScript classes by creating a basic banking account system. You'll learn how to define classes with properties, methods, and constructors in TypeScript.

**Note:** This lab is part of a series. The `Account` class you create here will be used in the follow-up lab on TypeScript inheritance and interfaces.

## Setup
1. Run `npm install` to install the required dependencies
2. Create a new TypeScript file called `banking-system.ts`
3. Make sure you have TypeScript and ts-node installed to run your code

## Exercise: Basic Account Class

Create an `Account` class with the following:
- Properties: 
  - `accountNumber` (string)
  - `balance` (number)
  - `accountHolderName` (string)
  
- Constructor that initializes these properties

- Methods:
  - `deposit(amount: number): void` - adds amount to balance
  - `withdraw(amount: number): void` - subtracts amount from balance (only if sufficient funds)
  - `getBalance(): number` - returns current balance
  - `addInterest(): void` - adds 2% interest to the balance

## Testing Your Class
Test your class by:
1. Creating 2-3 Account instances with different values
2. Adding them to an array
3. Performing deposits and withdrawals on different accounts
4. Calling `addInterest()` on each account
5. Displaying the final balances

## Example Code Structure
```typescript
// Create your Account class here

// Test your implementation
function testBankAccounts() {
  // Create 2-3 Account instances
  
  // Add them to an array
  
  // Perform deposits and withdrawals
  
  // Add interest to each account
  
  // Display final balances
}

// Run the test function
testBankAccounts();
```

## Expected Output
Your program should demonstrate:
1. Creating multiple account instances
2. Successful deposits increasing the account balance
3. Successful withdrawals decreasing the account balance
4. Failed withdrawals when there are insufficient funds
5. Interest being added to each account
6. Displaying the final balances

## Bonus Challenges (Optional)
1. Add input validation to prevent negative deposits/withdrawals
2. Add a `displayAccountInfo()` method that neatly formats and displays all account information
3. Add a transaction history array to track all deposits and withdrawals
4. Add a static method to the Account class that transfers money between two accounts

## Running Your Code
```bash
npx ts-node banking-system.ts
```
