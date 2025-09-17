# TypeScript Inheritance and Interfaces Lab Exercise

## Overview
In this lab, you'll work with TypeScript inheritance and interfaces by creating a banking system with different account types and implementing polymorphism.

## Setup
1. Create a new TypeScript file called `banking-system.ts`
2. Make sure you have TypeScript and ts-node installed to run your code

## Part 1: Basic Account Class

Create an `Account` class with the following:
- Properties: `accountNumber` (string), `balance` (number), `accountHolderName` (string)
- Constructor that initializes these properties
- Methods:
  - `deposit(amount: number): void` - adds amount to balance
  - `withdraw(amount: number): void` - subtracts amount from balance (only if sufficient funds)
  - `getBalance(): number` - returns current balance
  - `addInterest(): void` - adds 2% interest to the balance

Test your class by:
1. Creating 2-3 Account instances
2. Adding them to an array
3. Performing deposits and withdrawals
4. Calling `addInterest()` on each account
5. Displaying the final balances

## Part 2: Inheritance with Subclasses

Create two subclasses that extend `Account`:

### SavingsAccount
- Override `addInterest()` to add 3.5% interest instead of 2%
- Add a minimum balance requirement of $100 in the `withdraw()` method

### CurrentAccount
- Override `addInterest()` to add 1% interest instead of 2%
- Add an `overdraftLimit` property (number) set in the constructor
- Override `withdraw()` to allow withdrawals up to the overdraft limit

Test your inheritance by:
1. Creating instances of both `SavingsAccount` and `CurrentAccount`
2. Adding them to an array of type `Account[]`
3. Calling `addInterest()` on each (observe polymorphism)
4. Testing the different withdrawal behaviors

## Part 3: Abstract Classes (15 minutes)

Modify your code to:
1. Make the `Account` class abstract
2. Make the `addInterest()` method abstract in the `Account` class
3. Ensure both subclasses implement their own version of `addInterest()`
4. Try to instantiate the `Account` class directly (observe the TypeScript error)

Update your tests to only create `SavingsAccount` and `CurrentAccount` instances.

## Part 4: Interfaces

### Step 4a: Create Detailable Interface
Create a `Detailable` interface with:
- `getDetails(): string` method that returns a string description

### Step 4b: Implement Detailable in Account Classes
Modify your `Account` class (or subclasses) to implement the `Detailable` interface:
- `SavingsAccount.getDetails()` should return: "Savings Account - Account Number: {number}, Balance: ${balance}, Holder: {name}"
- `CurrentAccount.getDetails()` should return: "Current Account - Account Number: {number}, Balance: ${balance}, Overdraft: ${limit}, Holder: {name}"

### Step 4c: Create Non-Account Class
Create a `HomeInsurance` class that also implements `Detailable`:
- Properties: `policyNumber` (string), `premium` (number), `propertyAddress` (string)
- `getDetails()` should return: "Home Insurance - Policy: {number}, Premium: ${premium}, Address: {address}"

### Step 4d: Test Interface Polymorphism
Create an array of `Detailable[]` containing:
- Several account instances
- Several home insurance instances

Loop through the array and call `getDetails()` on each item to demonstrate interface polymorphism.

## Expected Output
Your program should demonstrate:
1. Basic inheritance and method overriding
2. Abstract classes and methods
3. Polymorphism with arrays of base class types
4. Interface implementation across different class hierarchies
5. Interface polymorphism

## Bonus Challenges (Optional)
1. Add input validation to prevent negative deposits/withdrawals
2. Add a `TransactionHistory` interface with methods to track transactions
3. Implement multiple interfaces in your account classes
4. Add static methods to the `Account` class for utility functions

## Running Your Code
```bash
npx ts-node banking-system.ts
```

